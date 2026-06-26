import { combineReducers } from '@reduxjs/toolkit';

import ordersReducer from './ordersSlice';
import searchReducer from './searchSlice';
import tablesReducer from './tablesSlice';
import uiReducer from './uiSlice';

export const rootReducer = combineReducers({
  tables: tablesReducer,
  orders: ordersReducer,
  ui: uiReducer,
  search: searchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
