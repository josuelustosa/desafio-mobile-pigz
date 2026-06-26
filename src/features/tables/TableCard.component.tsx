import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Icon } from '../../components/Icon';
import type { Table } from '../../store/types';

interface TableCardProps {
  table: Table;
  onPress: (tableId: string) => void;
  width: number;
  height: number;
}

export const TableCard: React.FC<TableCardProps> = ({
  table,
  onPress,
  width,
  height,
}) => {
  const { colors, spacing, textStyles } = useTheme();

  const statusColors = colors.tableStatus;
  const cardBackground =
    statusColors[table.status as keyof typeof statusColors]?.background ||
    colors.surface.default;

  const styles = StyleSheet.create({
    container: {
      width,
      height,
      flexGrow: 0,
      flexShrink: 0,
      margin: spacing.xs,
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: cardBackground,
    },
    card: {
      flex: 1,
      padding: spacing.sm,
      // justifyContent: 'space-between',
    },
    header: {
      marginBottom: spacing.md,
    },
    tableNumber: {
      ...textStyles.tableNumber,
      color: colors.text.primary,
      marginBottom: spacing.xs,
      fontSize: 24,
    },
    customerName: {
      ...textStyles.labelMd,
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
    infoText: {
      ...textStyles.labelSm,
      color: colors.text.primary,
    },
  });

  const totalValue = table.orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0,
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(table.id)}
      activeOpacity={0.8}
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.tableNumber}>{table.number}</Text>
          <Text style={styles.customerName}>
            {table.clientName || 'Sem cliente'}
          </Text>
        </View>

        <View style={styles.body}>
          {table.orders.length > 0 && (
            <View style={styles.infoRow}>
              <Icon name="cards" size={14} color={colors.text.primary} />
              <Text style={styles.infoText}>{table.orders.length} pedidos</Text>
            </View>
          )}

          {table.minutesSinceLastOrder !== null &&
            table.minutesSinceLastOrder > 0 && (
              <View style={styles.infoRow}>
                <Icon name="schedule" size={14} color={colors.text.primary} />
                <Text style={styles.infoText}>
                  {table.minutesSinceLastOrder}min
                </Text>
              </View>
            )}

          {totalValue > 0 && (
            <View style={styles.infoRow}>
              <Icon name="paid" size={14} color={colors.text.primary} />
              <Text style={styles.infoText}>R${totalValue.toFixed(2)}</Text>
            </View>
          )}

          {table.attendantName && (
            <View style={styles.infoRow}>
              <Icon
                name="room_service"
                size={14}
                color={colors.text.primary}
              />
              <Text style={styles.infoText}>{table.attendantName}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
