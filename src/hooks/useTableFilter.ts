import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setActiveFilter } from '../store/uiSlice';
import { fetchTables } from '../store/tablesSlice';
import type { FilterType } from '../store/types';

export const useTableFilter = () => {
  const dispatch = useAppDispatch();
  const activeFilter = useAppSelector((state) => state.ui.activeFilter);

  const handleFilterChange = useCallback(
    (filter: FilterType) => {
      dispatch(setActiveFilter(filter));
      dispatch(
        fetchTables({
          page: 1,
          perPage: 20,
          filter: filter === 'all' ? undefined : filter,
          query: '',
        })
      );
    },
    [dispatch]
  );

  return {
    activeFilter,
    handleFilterChange,
  };
};
