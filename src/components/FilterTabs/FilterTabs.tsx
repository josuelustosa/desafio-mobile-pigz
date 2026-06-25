import React, { useRef } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';

export type FilterType = 'all' | 'active' | 'occupied' | 'idle';

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FILTERS: Array<{ label: string; value: FilterType }> = [
  { label: 'Visão geral', value: 'all' },
  { label: 'Em atendimento', value: 'active' },
  { label: 'Ociosas', value: 'occupied' },
  { label: 'Disponíveis', value: 'idle' },
];

export const FilterTabs: React.FC<FilterTabsProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const { colors, spacing } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background.primary,
    },
    scrollView: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
    },
    tabsContainer: {
      flexDirection: 'row',
      gap: spacing.sm,
    },
    tab: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      borderRadius: 20,
      backgroundColor: colors.surface.raised,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabActive: {
      backgroundColor: colors.text.primary,
    },
    tabText: {
      fontSize: 14,
      color: colors.text.primary,
      fontWeight: '500',
    },
    tabTextActive: {
      color: colors.background.primary,
      fontWeight: '600',
    },
  });

  const handleTabPress = (filter: FilterType) => {
    onFilterChange(filter);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.tabsContainer}>
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter.value}
              style={[
                styles.tab,
                activeFilter === filter.value && styles.tabActive,
              ]}
              onPress={() => handleTabPress(filter.value)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  activeFilter === filter.value && styles.tabTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
