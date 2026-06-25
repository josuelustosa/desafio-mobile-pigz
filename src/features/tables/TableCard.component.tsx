import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { Table } from '../../store/types';

interface TableCardProps {
  table: Table;
  onPress: (tableId: string) => void;
}

export const TableCard: React.FC<TableCardProps> = ({ table, onPress }) => {
  const { colors, spacing } = useTheme();

  const statusColors = colors.tableStatus;
  const cardBackground =
    statusColors[table.status as keyof typeof statusColors]?.background ||
    colors.surface.default;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: spacing.sm,
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: cardBackground,
    },
    card: {
      flex: 1,
      padding: spacing.md,
      justifyContent: 'space-between',
    },
    header: {
      marginBottom: spacing.md,
    },
    tableNumber: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.text.primary,
      marginBottom: spacing.xs,
    },
    customerName: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text.primary,
    },
    body: {
      gap: spacing.sm,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    infoIcon: {
      fontSize: 14,
      marginRight: spacing.xs,
    },
    infoText: {
      fontSize: 12,
      color: colors.text.primary,
      fontWeight: '500',
    },
  });

  const totalValue = table.orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(table.id)}
      activeOpacity={0.8}
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.tableNumber}>Mesa {table.number}</Text>
          <Text style={styles.customerName}>
            {table.clientName || 'Sem cliente'}
          </Text>
        </View>

        <View style={styles.body}>
          {table.orders.length > 0 && (
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>📋</Text>
              <Text style={styles.infoText}>{table.orders.length} pedidos</Text>
            </View>
          )}

          {table.minutesSinceLastOrder !== null &&
            table.minutesSinceLastOrder > 0 && (
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>⏱️</Text>
                <Text style={styles.infoText}>
                  {table.minutesSinceLastOrder}min
                </Text>
              </View>
            )}

          {totalValue > 0 && (
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>💵</Text>
              <Text style={styles.infoText}>R${totalValue.toFixed(2)}</Text>
            </View>
          )}

          {table.attendantName && (
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>👤</Text>
              <Text style={styles.infoText}>{table.attendantName}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
