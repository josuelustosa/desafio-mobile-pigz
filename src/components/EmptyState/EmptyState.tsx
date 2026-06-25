import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';

interface EmptyStateProps {
  icon?: string;
  title: string;
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '📭',
  title,
  message,
}) => {
  const { colors, spacing } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.xl,
      backgroundColor: colors.background.primary,
    },
    icon: {
      fontSize: 64,
      marginBottom: spacing.lg,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text.primary,
      marginBottom: spacing.sm,
      textAlign: 'center',
    },
    message: {
      fontSize: 14,
      color: colors.text.secondary,
      textAlign: 'center',
      lineHeight: 20,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};
