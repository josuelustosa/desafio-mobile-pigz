import { combineReducers } from '@reduxjs/toolkit';

import searchReducer from './searchSlice';
import tablesReducer from './tablesSlice';
import uiReducer from './uiSlice';

export const rootReducer = combineReducers({
  tables: tablesReducer,
  ui: uiReducer,
  search: searchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
