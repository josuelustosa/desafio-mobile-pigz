import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';

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
  const { colors, spacing } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      backgroundColor: colors.background.primary,
    },
    iconContainer: {
      marginRight: spacing.sm,
    },
    input: {
      flex: 1,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      backgroundColor: colors.surface.raised,
      borderRadius: 8,
      color: colors.text.primary,
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TextInput
          placeholder="🔍"
          editable={false}
          style={{ fontSize: 20 }}
        />
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
