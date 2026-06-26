import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '../../components/Text/Text';
import { Icon, IconName } from '../../components/Icon/Icon';
import { useTheme } from '../../theme/useTheme';

interface ActionCardProps {
  icon: IconName;
  label: string;
  onPress: () => void;
  testID?: string;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  icon,
  label,
  onPress,
  testID,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.surface.default }]}
      onPress={onPress}
      activeOpacity={0.7}
      testID={testID}
    >
      <View style={styles.iconContainer}>
        <Icon name={icon} size={40} color={colors.text.primary} />
      </View>
      <Text variant="body" style={styles.label}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    marginBottom: 16,
  },
  label: {
    textAlign: 'center',
  },
});
