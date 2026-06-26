import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';

export type TableStatus = 'active' | 'waiting' | 'idle' | 'available';

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
    active: colors.feedback.success,
    waiting: colors.feedback.error,
    idle: colors.feedback.warning,
    available: colors.text.tertiary,
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
