import React, { useCallback } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeNewOrderModal } from '../../store/uiSlice';
import { useTheme } from '../../theme/useTheme';

export type OrderType = 'table' | 'counter';

interface NewOrderModalProps {
  isVisible: boolean;
  onSelectType?: (type: OrderType) => void;
}

export const NewOrderModal: React.FC<NewOrderModalProps> = ({
  isVisible,
  onSelectType,
}) => {
  const dispatch = useAppDispatch();
  const { colors, spacing } = useTheme();

  const handleClose = useCallback(() => {
    dispatch(closeNewOrderModal());
  }, [dispatch]);

  const handleSelectType = useCallback(
    (type: OrderType) => {
      if (onSelectType) {
        onSelectType(type);
      }
      handleClose();
    },
    [onSelectType, handleClose]
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
      backgroundColor: colors.background.primary,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: spacing.lg,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl,
    },
    header: {
      alignItems: 'center',
      marginBottom: spacing.lg,
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text.primary,
      marginBottom: spacing.xs,
    },
    subtitle: {
      fontSize: 14,
      color: colors.text.secondary,
    },
    optionsContainer: {
      gap: spacing.md,
      marginBottom: spacing.lg,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.md,
      backgroundColor: colors.surface.raised,
      borderRadius: 12,
    },
    optionIcon: {
      fontSize: 32,
      marginRight: spacing.md,
    },
    optionContent: {
      flex: 1,
    },
    optionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.primary,
      marginBottom: spacing.xs,
    },
    optionDescription: {
      fontSize: 12,
      color: colors.text.secondary,
    },
    closeButton: {
      paddingVertical: spacing.md,
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: colors.border.default,
      marginTop: spacing.lg,
    },
    closeButtonText: {
      fontSize: 14,
      color: colors.text.secondary,
      fontWeight: '500',
    },
  });

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <SafeAreaView style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Novo pedido</Text>
            <Text style={styles.subtitle}>Selecione o tipo de pedido</Text>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleSelectType('table')}
              activeOpacity={0.7}
            >
              <Text style={styles.optionIcon}>🪑</Text>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Mesa/Comanda</Text>
                <Text style={styles.optionDescription}>
                  Novo pedido para uma mesa
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option}
              onPress={() => handleSelectType('counter')}
              activeOpacity={0.7}
            >
              <Text style={styles.optionIcon}>💼</Text>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Balcão</Text>
                <Text style={styles.optionDescription}>
                  Pedido para levar ou viagem
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
            activeOpacity={0.7}
          >
            <Text style={styles.closeButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </Modal>
  );
};
