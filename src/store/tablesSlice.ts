import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type {
  PaginationMeta,
  RequestStatus,
  TablesApiResponse,
  TablesState,
} from './types';

export const initialPagination: PaginationMeta = {
  currentPage: 0,
  totalPages: 0,
  totalItems: 0,
  perPage: 20,
  hasNextPage: true,
};

const initialState: TablesState = {
  items: [],
  pagination: initialPagination,
  status: 'idle',
  error: null,
};

export const tablesSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    setTables(state, action: PayloadAction<TablesApiResponse>) {
      state.items = action.payload.data;
      state.pagination = action.payload.meta;
      state.status = 'succeeded';
      state.error = null;
    },
    appendTables(state, action: PayloadAction<TablesApiResponse>) {
      const existingIds = new Set(state.items.map(table => table.id));
      const newTables = action.payload.data.filter(
        table => !existingIds.has(table.id),
      );

      state.items.push(...newTables);
      state.pagination = action.payload.meta;
      state.status = 'succeeded';
      state.error = null;
    },
    resetPagination(state) {
      state.pagination = initialPagination;
    },
    setTablesStatus(state, action: PayloadAction<RequestStatus>) {
      state.status = action.payload;
    },
    setTablesError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.status = action.payload ? 'failed' : state.status;
    },
    clearTables() {
      return initialState;
    },
  },
});

export const {
  setTables,
  appendTables,
  resetPagination,
  setTablesStatus,
  setTablesError,
  clearTables,
} = tablesSlice.actions;

export default tablesSlice.reducer;
