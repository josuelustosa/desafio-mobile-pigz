import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import createTransform from 'redux-persist/lib/createTransform';
import type { PersistConfig } from 'redux-persist';

import { rootReducer, type RootState } from './rootReducer';
import type { SearchState, TablesState, UiState } from './types';

type StoreSubState = TablesState | UiState | SearchState;
type PersistedTablesState = Pick<TablesState, 'items' | 'pagination'>;
type PersistedUiState = Pick<UiState, 'activeFilter'>;
type PersistedSearchState = Pick<
  SearchState,
  'query' | 'debouncedQuery' | 'resultIds'
>;
type PersistedSubState =
  | PersistedTablesState
  | PersistedUiState
  | PersistedSearchState;

const storePersistTransform = createTransform<
  StoreSubState,
  PersistedSubState,
  RootState
>(
  (inboundState, key) => {
    if (key === 'tables') {
      const tablesState = inboundState as TablesState;

      return {
        items: tablesState.items,
        pagination: tablesState.pagination,
      };
    }

    if (key === 'ui') {
      const uiState = inboundState as UiState;

      return {
        activeFilter: uiState.activeFilter,
      };
    }

    const searchState = inboundState as SearchState;

    return {
      query: searchState.query,
      debouncedQuery: searchState.debouncedQuery,
      resultIds: searchState.resultIds,
    };
  },
  outboundState => outboundState as StoreSubState,
  { whitelist: ['tables', 'ui', 'search'] },
);

const persistConfig: PersistConfig<RootState> = {
  key: 'pigz:root',
  storage: AsyncStorage,
  whitelist: ['tables', 'ui', 'search'],
  transforms: [storePersistTransform],
  timeout: 0,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
