import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Icon } from '../Icon';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  placeholder = 'Cliente, mesa, comanda, atendente',
}) => {
  const { colors, spacing, textStyles } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      backgroundColor: colors.background.primary,
    },
    iconContainer: {
      position: 'absolute',
      left: spacing.lg,
      zIndex: 1,
    },
    input: {
      flex: 1,
      paddingVertical: spacing.sm,
      paddingLeft: spacing.xl + spacing.md,
      paddingRight: spacing.md,
      backgroundColor: colors.surface.raised,
      borderRadius: 8,
      color: colors.text.primary,
      ...textStyles.bodyMd,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="search" size={20} color={colors.text.tertiary} />
      </View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.text.secondary}
        value={query}
        onChangeText={onQueryChange}
        clearButtonMode="while-editing"
      />
    </View>
  );
};
