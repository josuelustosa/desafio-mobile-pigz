import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { SearchState } from './types';

const initialState: SearchState = {
  query: '',
  debouncedQuery: '',
  resultIds: [],
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setDebouncedQuery(state, action: PayloadAction<string>) {
      state.debouncedQuery = action.payload;
    },
    setSearchResultIds(state, action: PayloadAction<string[]>) {
      state.resultIds = action.payload;
    },
    clearSearch() {
      return initialState;
    },
  },
});

export const {
  setSearchQuery,
  setDebouncedQuery,
  setSearchResultIds,
  clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
