import React, { useCallback, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchTables,
  fetchMoreTables,
  selectFilteredTables,
} from '../../store/tablesSlice';
import { setSearchQuery } from '../../store/searchSlice';
import { openNewOrderModal, closeNewOrderModal } from '../../store/uiSlice';
import { useTableFilter } from '../../hooks/useTableFilter';
import { useTheme } from '../../theme/useTheme';
import {
  SearchBar,
  FilterTabs,
  EmptyState,
  LoadingMore,
  Icon,
} from '../../components';
import { TableCard } from './TableCard.component';
import { NewOrderModal } from '../orders/NewOrder.modal';
import type { Table } from '../../store/types';

export const TableMapScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { colors, spacing } = useTheme();
  const { width: windowWidth } = useWindowDimensions();
  const { activeFilter, handleFilterChange } = useTableFilter();
  const gridColumns = 3;
  const cardMargin = spacing.xs;
  const gridPaddingHorizontal = spacing.xs;
  const tableCardWidth =
    (windowWidth - gridPaddingHorizontal * 2 - cardMargin * 2 * gridColumns) /
    gridColumns;
  const tableCardHeight = tableCardWidth * 1.6;

  const tables = useAppSelector(selectFilteredTables);
  const { status, error, pagination } = useAppSelector(state => state.tables);
  const { debouncedQuery } = useAppSelector(state => state.search);
  const searchQuery = useAppSelector(state => state.search.query);

  const isModalOpen = useAppSelector(state => state.ui.isNewOrderModalOpen);

  const handleOpenNewOrder = useCallback(() => {
    dispatch(openNewOrderModal(null));
  }, [dispatch]);

  const handleCloseNewOrder = useCallback(() => {
    dispatch(closeNewOrderModal());
  }, [dispatch]);

  useEffect(() => {
    if (tables.length === 0 && status === 'idle') {
      dispatch(
        fetchTables({
          page: 1,
          perPage: 20,
          filter: activeFilter === 'all' ? undefined : activeFilter,
          query: debouncedQuery || '',
        }),
      );
    }
  }, [activeFilter, debouncedQuery, dispatch, status, tables.length]);

  const handleSearchChange = useCallback(
    (query: string) => {
      dispatch(setSearchQuery(query));
    },
    [dispatch],
  );

  const handleEndReached = useCallback(() => {
    if (pagination.hasNextPage && status !== 'loading' && tables.length > 0) {
      dispatch(
        fetchMoreTables({
          page: pagination.currentPage + 1,
          perPage: pagination.perPage,
          filter: activeFilter === 'all' ? undefined : activeFilter,
          query: debouncedQuery || '',
        }),
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
      }),
    );
  }, [dispatch, activeFilter, debouncedQuery]);

  const handleTablePress = useCallback((tableId: string) => {
    console.log('Table pressed:', tableId);
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.tertiary,
    },
    listContent: {
      paddingBottom: spacing.lg,
    },
    gridContainer: {
      paddingHorizontal: spacing.xs,
      justifyContent: 'flex-start',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background.primary,
    },
    fab: {
      position: 'absolute',
      bottom: spacing.xl,
      right: spacing.lg,
      backgroundColor: colors.brand.default,
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 6,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
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
        icon="close_small"
        title="Erro ao carregar"
        message={
          error || 'Não foi possível carregar as mesas. Tente novamente.'
        }
        actionLabel="Tentar novamente"
        onAction={handleRetry}
      />
    );
  }

  if (tables.length === 0) {
    return (
      <View style={styles.container}>
        <SearchBar query={searchQuery} onQueryChange={handleSearchChange} />
        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
        <EmptyState
          icon="mobile_alert"
          title="Nenhuma mesa encontrada"
          message="Tente ajustar os filtros ou sua busca."
        />
      </View>
    );
  }

  const renderTableCard = ({ item }: { item: Table }) => (
    <TableCard
      table={item}
      onPress={handleTablePress}
      width={tableCardWidth}
      height={tableCardHeight}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tables}
        renderItem={renderTableCard}
        keyExtractor={item => item.id}
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

      <TouchableOpacity
        style={styles.fab}
        onPress={handleOpenNewOrder}
        activeOpacity={0.85}
      >
        <Icon name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      <NewOrderModal isVisible={isModalOpen} />
    </View>
  );
};
