import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';

interface LoadingMoreProps {
  isLoading: boolean;
  hasMore?: boolean;
}

export const LoadingMore: React.FC<LoadingMoreProps> = ({
  isLoading,
  hasMore = true,
}) => {
  const { colors, spacing } = useTheme();

  const styles = StyleSheet.create({
    container: {
      paddingVertical: spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background.primary,
    },
    endMessage: {
      fontSize: 13,
      color: colors.text.tertiary,
    },
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.feedback.info} />
      </View>
    );
  }

  if (!hasMore) {
    return (
      <View style={styles.container}>
        <Text style={styles.endMessage}>Todas as mesas foram carregadas</Text>
      </View>
    );
  }

  return null;
};
