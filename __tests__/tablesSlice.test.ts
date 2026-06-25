import { configureStore } from '@reduxjs/toolkit';

import * as tablesServiceModule from '../src/services/tables.service';
import {
  clearTables,
  fetchMoreTables,
  fetchTables,
  initialPagination,
} from '../src/store/tablesSlice';
import tablesReducer from '../src/store/tablesSlice';
import type { TablesApiResponse, TablesState } from '../src/store/types';

jest.mock('../src/services/tables.service');

const mockGetTables = tablesServiceModule.getTables as jest.MockedFunction<
  typeof tablesServiceModule.getTables
>;

const makePage = (
  page: number,
  total: number,
  perPage = 20,
): TablesApiResponse => ({
  data: Array.from(
    { length: Math.min(perPage, total - (page - 1) * perPage) },
    (_, i) => ({
      id: `table-p${page}-${i + 1}`,
      number: (page - 1) * perPage + i + 1,
      status: 'available' as const,
      clientName: null,
      attendantName: null,
      orders: [],
      guestCount: 0,
      openedAt: null,
      lastOrderAt: null,
      minutesSinceLastOrder: null,
    }),
  ),
  meta: {
    currentPage: page,
    totalPages: Math.ceil(total / perPage),
    totalItems: total,
    perPage,
    hasNextPage: page < Math.ceil(total / perPage),
  },
});

const makeStore = (preloadedTables?: Partial<TablesState>) =>
  configureStore({
    reducer: { tables: tablesReducer },
    preloadedState: preloadedTables
      ? {
          tables: {
            items: [],
            pagination: initialPagination,
            status: 'idle' as const,
            error: null,
            ...preloadedTables,
          },
        }
      : undefined,
  });

describe('tablesSlice — reducers síncronos', () => {
  it('estado inicial está correto', () => {
    const store = makeStore();
    const state = store.getState().tables;

    expect(state.items).toHaveLength(0);
    expect(state.status).toBe('idle');
    expect(state.error).toBeNull();
    expect(state.pagination).toEqual(initialPagination);
  });

  it('clearTables retorna ao estado inicial', () => {
    const page1 = makePage(1, 40);
    const store = makeStore({
      items: page1.data,
      pagination: page1.meta,
      status: 'succeeded',
    });

    store.dispatch(clearTables());

    const state = store.getState().tables;
    expect(state.items).toHaveLength(0);
    expect(state.status).toBe('idle');
  });
});

describe('fetchTables', () => {
  beforeEach(() => jest.clearAllMocks());

  it('preenche items e paginação na primeira carga', async () => {
    const page1 = makePage(1, 40);
    mockGetTables.mockResolvedValueOnce(page1);

    const store = makeStore();
    await store.dispatch(fetchTables({}));

    const state = store.getState().tables;
    expect(state.status).toBe('succeeded');
    expect(state.items).toHaveLength(20);
    expect(state.pagination.currentPage).toBe(1);
    expect(state.pagination.hasNextPage).toBe(true);
    expect(state.error).toBeNull();
  });

  it('substitui items ao recarregar (ex: mudança de filtro)', async () => {
    const page1 = makePage(1, 40);
    mockGetTables.mockResolvedValueOnce(page1);

    const page1Again = makePage(1, 10);
    mockGetTables.mockResolvedValueOnce(page1Again);

    const store = makeStore();
    await store.dispatch(fetchTables({}));
    await store.dispatch(fetchTables({ filter: 'active' }));

    const state = store.getState().tables;
    expect(state.items).toHaveLength(10);
    expect(state.pagination.totalItems).toBe(10);
  });

  it('define status loading durante a chamada', () => {
    const page1 = makePage(1, 20);
    mockGetTables.mockResolvedValueOnce(page1);

    const store = makeStore();
    const promise = store.dispatch(fetchTables({}));

    expect(store.getState().tables.status).toBe('loading');

    return promise;
  });

  it('define status failed e error quando o serviço lança', async () => {
    mockGetTables.mockRejectedValueOnce(new Error('network error'));

    const store = makeStore();
    await store.dispatch(fetchTables({}));

    const state = store.getState().tables;
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Erro ao carregar mesas.');
  });

  it('passa os params filter e query para o serviço com page=1', async () => {
    mockGetTables.mockResolvedValueOnce(makePage(1, 5));

    const store = makeStore();
    await store.dispatch(fetchTables({ filter: 'active', query: 'mesa 1' }));

    expect(mockGetTables).toHaveBeenCalledWith({
      filter: 'active',
      query: 'mesa 1',
      page: 1,
    });
  });
});

describe('fetchMoreTables', () => {
  beforeEach(() => jest.clearAllMocks());

  it('adiciona items sem duplicar ao carregar próxima página', async () => {
    const page1 = makePage(1, 40);
    const page2 = makePage(2, 40);

    const store = makeStore({
      items: page1.data,
      pagination: page1.meta,
      status: 'succeeded',
    });

    mockGetTables.mockResolvedValueOnce(page2);
    await store.dispatch(fetchMoreTables({}));

    const state = store.getState().tables;
    expect(state.items).toHaveLength(40);
    expect(state.pagination.currentPage).toBe(2);
  });

  it('não duplica items se a API devolver sobreposição', async () => {
    const page1 = makePage(1, 40);
    // Simula sobreposição: page2 retorna os mesmos ids de page1
    const duplicatedResponse: TablesApiResponse = {
      data: page1.data,
      meta: { ...page1.meta, currentPage: 2 },
    };

    const store = makeStore({
      items: page1.data,
      pagination: page1.meta,
      status: 'succeeded',
    });

    mockGetTables.mockResolvedValueOnce(duplicatedResponse);
    await store.dispatch(fetchMoreTables({}));

    const state = store.getState().tables;
    expect(state.items).toHaveLength(20);
  });

  it('rejeita com mensagem quando não há mais páginas', async () => {
    const lastPage = makePage(2, 40);

    const store = makeStore({
      items: [...makePage(1, 40).data, ...lastPage.data],
      pagination: { ...lastPage.meta, hasNextPage: false },
      status: 'succeeded',
    });

    await store.dispatch(fetchMoreTables({}));

    const state = store.getState().tables;
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Sem mais páginas para carregar.');
    expect(mockGetTables).not.toHaveBeenCalled();
  });

  it('chama o serviço com page = currentPage + 1', async () => {
    const page1 = makePage(1, 60);
    mockGetTables.mockResolvedValueOnce(makePage(2, 60));

    const store = makeStore({
      items: page1.data,
      pagination: page1.meta,
      status: 'succeeded',
    });

    await store.dispatch(fetchMoreTables({ filter: 'all' }));

    expect(mockGetTables).toHaveBeenCalledWith({
      filter: 'all',
      page: 2,
    });
  });

  it('define status failed e error quando o serviço lança', async () => {
    const page1 = makePage(1, 40);
    mockGetTables.mockRejectedValueOnce(new Error('timeout'));

    const store = makeStore({
      items: page1.data,
      pagination: page1.meta,
      status: 'succeeded',
    });

    await store.dispatch(fetchMoreTables({}));

    const state = store.getState().tables;
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Erro ao carregar mais mesas.');
  });

  it('última página sem hasNextPage não aciona nova chamada', async () => {
    const onlyPage = makePage(1, 5);

    const store = makeStore({
      items: onlyPage.data,
      pagination: { ...onlyPage.meta, hasNextPage: false },
      status: 'succeeded',
    });

    await store.dispatch(fetchMoreTables({}));

    expect(mockGetTables).not.toHaveBeenCalled();
  });
});
