import React, { useCallback, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchTables,
  fetchMoreTables,
  selectFilteredTables,
} from '../../store/tablesSlice';
import { setSearchQuery } from '../../store/searchSlice';
import { useTableFilter } from '../../hooks/useTableFilter';
import { useTheme } from '../../theme/useTheme';
import {
  SearchBar,
  FilterTabs,
  EmptyState,
  LoadingMore,
} from '../../components';
import { TableCard } from './TableCard.component';
import type { Table } from '../../store/types';

export const TableMapScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { colors, spacing } = useTheme();
  const { activeFilter, handleFilterChange } = useTableFilter();

  const tables = useAppSelector(selectFilteredTables);
  const { status, error, pagination } = useAppSelector((state) => state.tables);
  const { debouncedQuery } = useAppSelector((state) => state.search);
  const searchQuery = useAppSelector((state) => state.search.query);

  useEffect(() => {
    if (tables.length === 0 && status === 'idle') {
      dispatch(
        fetchTables({
          page: 1,
          perPage: 20,
          filter: activeFilter === 'all' ? undefined : activeFilter,
          query: debouncedQuery || '',
        })
      );
    }
  }, []);

  const handleSearchChange = useCallback(
    (query: string) => {
      dispatch(setSearchQuery(query));
    },
    [dispatch]
  );

  const handleEndReached = useCallback(() => {
    if (
      pagination.hasNextPage &&
      status !== 'loading' &&
      tables.length > 0
    ) {
      dispatch(
        fetchMoreTables({
          page: pagination.currentPage + 1,
          perPage: pagination.perPage,
          filter: activeFilter === 'all' ? undefined : activeFilter,
          query: debouncedQuery || '',
        })
      );
    }
  }, [
    dispatch,
    pagination.hasNextPage,
    pagination.currentPage,
    pagination.perPage,
    status,
    tables.length,
    activeFilter,
    debouncedQuery,
  ]);

  const handleRetry = useCallback(() => {
    dispatch(
      fetchTables({
        page: 1,
        perPage: 20,
        filter: activeFilter === 'all' ? undefined : activeFilter,
        query: debouncedQuery || '',
      })
    );
  }, [dispatch, activeFilter, debouncedQuery]);

  const handleTablePress = useCallback((tableId: string) => {
    console.log('Table pressed:', tableId);
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    listContent: {
      paddingBottom: spacing.lg,
    },
    gridContainer: {
      paddingHorizontal: spacing.sm,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background.primary,
    },
  });

  if (status === 'loading' && tables.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.feedback.info} />
      </View>
    );
  }

  if (error && tables.length === 0) {
    return (
      <EmptyState
        icon="❌"
        title="Erro ao carregar"
        message={error || 'Não foi possível carregar as mesas. Tente novamente.'}
        actionLabel="Tentar novamente"
        onAction={handleRetry}
      />
    );
  }

  if (tables.length === 0) {
    return (
      <View style={styles.container}>
        <SearchBar query={searchQuery} onQueryChange={handleSearchChange} />
        <FilterTabs activeFilter={activeFilter} onFilterChange={handleFilterChange} />
        <EmptyState
          icon="🗺️"
          title="Nenhuma mesa encontrada"
          message="Tente ajustar os filtros ou sua busca."
        />
      </View>
    );
  }

  const renderTableCard = ({ item }: { item: Table }) => (
    <TableCard table={item} onPress={handleTablePress} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tables}
        renderItem={renderTableCard}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.gridContainer}
        contentContainerStyle={styles.listContent}
        scrollEventThrottle={16}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <View>
            <SearchBar query={searchQuery} onQueryChange={handleSearchChange} />
            <FilterTabs
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
            />
          </View>
        }
        ListFooterComponent={
          <LoadingMore
            isLoading={status === 'loading'}
            hasMore={pagination.hasNextPage}
          />
        }
      />
    </View>
  );
};
