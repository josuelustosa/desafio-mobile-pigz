import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import { tablesService, type GetTablesParams } from '../services';
import type {
  PaginationMeta,
  RequestStatus,
  TablesApiResponse,
  TablesState,
} from './types';

type TablesThunkConfig = {
  rejectValue: string;
  state: { tables: TablesState };
};

export const fetchTables = createAsyncThunk<
  TablesApiResponse,
  GetTablesParams,
  TablesThunkConfig
>('tables/fetchTables', async (params, { rejectWithValue }) => {
  try {
    return await tablesService.getTables({ ...params, page: 1 });
  } catch {
    return rejectWithValue('Erro ao carregar mesas.');
  }
});

export const fetchMoreTables = createAsyncThunk<
  TablesApiResponse,
  GetTablesParams,
  TablesThunkConfig
>('tables/fetchMoreTables', async (params, { getState, rejectWithValue }) => {
  const { tables } = getState();

  if (!tables.pagination.hasNextPage) {
    return rejectWithValue('Sem mais páginas para carregar.');
  }

  try {
    return await tablesService.getTables({
      ...params,
      page: tables.pagination.currentPage + 1,
    });
  } catch {
    return rejectWithValue('Erro ao carregar mais mesas.');
  }
});

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
  extraReducers: builder => {
    builder
      .addCase(fetchTables.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTables.fulfilled, (state, action) => {
        state.items = action.payload.data;
        state.pagination = action.payload.meta;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchTables.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Erro desconhecido.';
      })
      .addCase(fetchMoreTables.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchMoreTables.fulfilled, (state, action) => {
        const existingIds = new Set(state.items.map(t => t.id));
        const newTables = action.payload.data.filter(
          t => !existingIds.has(t.id),
        );
        state.items.push(...newTables);
        state.pagination = action.payload.meta;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchMoreTables.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Erro desconhecido.';
      });
  },
});

export const { resetPagination, setTablesStatus, setTablesError, clearTables } =
  tablesSlice.actions;

// Seletores
export const selectAllTables = (state: { tables: TablesState }) =>
  state.tables.items;

export const selectFilteredTables = (state: {
  tables: TablesState;
  ui?: { activeFilter?: string };
}) => state.tables.items;

export default tablesSlice.reducer;
