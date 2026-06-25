import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';

export type TableStatus = 'idle' | 'occupied' | 'active' | 'waiting';

interface StatusBadgeProps {
  status: TableStatus;
  size?: 'small' | 'medium' | 'large';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'medium',
}) => {
  const { colors } = useTheme();

  const statusColorMap: Record<TableStatus, string> = {
    idle: colors.feedback.success,
    occupied: colors.feedback.error,
    active: colors.feedback.warning,
    waiting: colors.feedback.info,
  };

  const sizeMap = {
    small: 8,
    medium: 12,
    large: 16,
  };

  const styles = StyleSheet.create({
    badge: {
      width: sizeMap[size],
      height: sizeMap[size],
      borderRadius: sizeMap[size] / 2,
      backgroundColor: statusColorMap[status],
    },
  });

  return <View style={styles.badge} />;
};
