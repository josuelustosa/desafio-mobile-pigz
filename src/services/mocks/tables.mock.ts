import type {
  FilterType,
  Order,
  Table,
  TablesApiResponse,
  TableStatus,
} from '../../store/types';

interface TablesMockQuery {
  page?: number | string;
  perPage?: number | string;
  filter?: FilterType | string;
  query?: string;
}

const MAX_MOCK_TABLES = 44;
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 20;
const NOW_MS = Date.now();

const CLIENT_NAMES = [
  'Ana',
  'Bruno',
  'Carla',
  'Diego',
  'Elisa',
  'Fábio',
  'Gabriela',
  'Henrique',
  'Isabela',
  'João',
];

const ATTENDANT_NAMES = [
  'André',
  'Bianca',
  'Caio',
  'Debora',
  'Eduarda',
  'Felipe',
  'Giovanna',
  'Heitor',
];

const randInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const pick = <T>(values: T[]): T => values[randInt(0, values.length - 1)]!;

const minutesAgoToIso = (minutesAgo: number): string =>
  new Date(NOW_MS - minutesAgo * 60 * 1000).toISOString();

const normalizeFilter = (filter: unknown): FilterType => {
  switch (filter) {
    case 'active':
    case 'waiting':
    case 'occupied':
    case 'idle':
    case 'available':
    case 'all':
      return filter;
    default:
      return 'all';
  }
};

const parsePositiveInt = (value: unknown, fallback: number): number => {
  const parsed = typeof value === 'string' ? Number(value) : value;

  return typeof parsed === 'number' && Number.isInteger(parsed) && parsed > 0
    ? parsed
    : fallback;
};

const getRandomStatus = (): TableStatus => {
  const bucket = Math.random();

  if (bucket < 0.3) {
    return 'available';
  }

  if (bucket < 0.6) {
    return 'active';
  }

  if (bucket < 0.8) {
    return 'waiting';
  }

  return 'idle';
};

const createOrders = (
  tableId: string,
  lastOrderMinutesAgo: number,
): Order[] => {
  const count = randInt(1, 3);

  return Array.from({ length: count }, (_, index) => ({
    id: `${tableId}-order-${index + 1}`,
    number: index + 1,
    totalAmount: randInt(30, 260),
    status: index === count - 1 ? 'open' : 'closed',
    openedAt: minutesAgoToIso(lastOrderMinutesAgo + randInt(5, 30)),
    lastOrderAt: minutesAgoToIso(lastOrderMinutesAgo),
  }));
};

const createTable = (tableNumber: number): Table => {
  const tableId = `table-${tableNumber}`;
  const status = getRandomStatus();

  if (status === 'available') {
    return {
      id: tableId,
      number: tableNumber,
      status,
      clientName: null,
      attendantName: null,
      orders: [],
      guestCount: 0,
      openedAt: null,
      lastOrderAt: null,
      minutesSinceLastOrder: null,
    };
  }

  const minutesSinceLastOrder =
    status === 'active'
      ? randInt(2, 20)
      : status === 'waiting'
      ? randInt(10, 45)
      : randInt(60, 180);
  const openedMinutesAgo = Math.max(
    minutesSinceLastOrder + randInt(10, 90),
    20,
  );

  return {
    id: tableId,
    number: tableNumber,
    status,
    clientName: pick(CLIENT_NAMES),
    attendantName: pick(ATTENDANT_NAMES),
    orders: createOrders(tableId, minutesSinceLastOrder),
    guestCount: randInt(1, 8),
    openedAt: minutesAgoToIso(openedMinutesAgo),
    lastOrderAt: minutesAgoToIso(minutesSinceLastOrder),
    minutesSinceLastOrder,
  };
};

const tablesDataset: Table[] = Array.from(
  { length: MAX_MOCK_TABLES },
  (_, index) => createTable(index + 1),
);

const matchesFilter = (table: Table, filter: FilterType): boolean => {
  if (filter === 'all') {
    return true;
  }

  if (filter === 'active') {
    return table.status === 'active';
  }

  if (filter === 'occupied') {
    return (
      table.status === 'active' ||
      table.status === 'waiting' ||
      table.status === 'idle'
    );
  }

  if (filter === 'waiting') {
    return table.status === 'waiting';
  }

  if (filter === 'available') {
    return table.status === 'available';
  }

  return table.status === 'idle';
};

const matchesQuery = (table: Table, query: string): boolean => {
  const value = query.trim().toLowerCase();

  if (!value) {
    return true;
  }

  return (
    table.number.toString().includes(value) ||
    table.clientName?.toLowerCase().includes(value) === true ||
    table.attendantName?.toLowerCase().includes(value) === true
  );
};

export const getMockTablesResponse = (
  queryParams: TablesMockQuery = {},
): TablesApiResponse => {
  const filter = normalizeFilter(queryParams.filter);
  const query = queryParams.query ?? '';
  const perPage = parsePositiveInt(queryParams.perPage, DEFAULT_PER_PAGE);
  const page = parsePositiveInt(queryParams.page, DEFAULT_PAGE);

  const filtered = tablesDataset.filter(
    table => matchesFilter(table, filter) && matchesQuery(table, query),
  );

  const totalItems = filtered.length;
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / perPage) : 0;
  const currentPage =
    totalPages === 0
      ? DEFAULT_PAGE
      : Math.min(Math.max(page, DEFAULT_PAGE), totalPages);
  const start = (currentPage - 1) * perPage;

  return {
    data: filtered.slice(start, start + perPage),
    meta: {
      currentPage,
      totalPages,
      totalItems,
      perPage,
      hasNextPage: totalPages > 0 && currentPage < totalPages,
    },
  };
};
