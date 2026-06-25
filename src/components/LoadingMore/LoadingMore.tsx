import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';

interface LoadingMoreProps {
  isLoading: boolean;
}

export const LoadingMore: React.FC<LoadingMoreProps> = ({ isLoading }) => {
  const { colors, spacing } = useTheme();

  if (!isLoading) {
    return null;
  }

  const styles = StyleSheet.create({
    container: {
      paddingVertical: spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background.primary,
    },
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.feedback.info} />
    </View>
  );
};
