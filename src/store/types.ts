/**
 * @file types.ts
 * @description Tipos globais compartilhados entre os slices do Redux.
 *
 * Centraliza as entidades principais (Table, Order) e os enums de status,
 * evitando duplicação entre slices e services.
 *
 * @usage
 *   import { Table, TableStatus, FilterType } from '@/store/types';
 */

export type TableStatus = 'active' | 'waiting' | 'idle' | 'available';

export type FilterType = 'all' | 'active' | 'waiting' | 'occupied' | 'idle' | 'available';

export interface Order {
  id: string;
  number: number;
  totalAmount: number;
  status: 'open' | 'closed' | 'cancelled';
  openedAt: string;
  lastOrderAt: string | null;
}

export interface Table {
  id: string;
  number: number;
  status: TableStatus;
  clientName: string | null;
  attendantName: string | null;
  orders: Order[];
  guestCount: number;
  openedAt: string | null;
  lastOrderAt: string | null;
  minutesSinceLastOrder: number | null;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
  hasNextPage: boolean;
}

export interface TablesApiResponse {
  data: Table[];
  meta: PaginationMeta;
}

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface TablesState {
  items: Table[];
  pagination: PaginationMeta;
  status: RequestStatus;
  error: string | null;
}

export interface OrdersState {
  items: Order[];
  selectedOrderId: string | null;
  status: RequestStatus;
  error: string | null;
}

export interface UiState {
  activeFilter: FilterType;
  isNewOrderModalOpen: boolean;
  selectedTableId: string | null;
}

export interface SearchState {
  query: string;
  debouncedQuery: string;
  resultIds: string[];
}
