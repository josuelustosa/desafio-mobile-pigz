import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { FilterType, UiState } from './types';

const initialState: UiState = {
  activeFilter: 'all',
  isNewOrderModalOpen: false,
  selectedTableId: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveFilter(state, action: PayloadAction<FilterType>) {
      state.activeFilter = action.payload;
    },
    openNewOrderModal(state, action: PayloadAction<string | null | undefined>) {
      state.isNewOrderModalOpen = true;
      state.selectedTableId = action.payload ?? null;
    },
    closeNewOrderModal(state) {
      state.isNewOrderModalOpen = false;
      state.selectedTableId = null;
    },
    resetUiState() {
      return initialState;
    },
  },
});

export const {
  setActiveFilter,
  openNewOrderModal,
  closeNewOrderModal,
  resetUiState,
} = uiSlice.actions;

export default uiSlice.reducer;
