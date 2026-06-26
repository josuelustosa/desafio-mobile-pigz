import React, { useCallback, useState } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import { useAppDispatch } from '../../store/hooks';
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
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleClose = useCallback(() => {
    setShowComingSoon(false);
    dispatch(closeNewOrderModal());
  }, [dispatch]);

  const handleSelectType = useCallback(
    (type: OrderType) => {
      if (onSelectType) {
        onSelectType(type);
      } else {
        setShowComingSoon(true);
      }
    },
    [onSelectType],
  );

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    sheet: {
      backgroundColor: colors.background.primary,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl,
    },
    handle: {
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.border.default,
      alignSelf: 'center',
      marginBottom: spacing.lg,
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
      gap: spacing.sm,
      marginBottom: spacing.md,
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
      fontSize: 24,
      marginRight: spacing.md,
      width: 36,
      textAlign: 'center',
    },
    optionContent: {
      flex: 1,
    },
    optionTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text.primary,
    },
    optionChevron: {
      fontSize: 16,
      color: colors.text.tertiary,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border.default,
      marginVertical: spacing.md,
    },
    cancelButton: {
      paddingVertical: spacing.md,
      alignItems: 'center',
    },
    cancelText: {
      fontSize: 15,
      color: colors.text.secondary,
      fontWeight: '500',
    },
    // Coming Soon state
    comingSoonContainer: {
      alignItems: 'center',
      paddingVertical: spacing.xl,
    },
    comingSoonIcon: {
      fontSize: 48,
      marginBottom: spacing.md,
    },
    comingSoonTitle: {
      fontSize: 17,
      fontWeight: '700',
      color: colors.text.primary,
      marginBottom: spacing.sm,
      textAlign: 'center',
    },
    comingSoonMessage: {
      fontSize: 14,
      color: colors.text.secondary,
      textAlign: 'center',
      lineHeight: 20,
      maxWidth: 260,
    },
  });

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleClose}
      >
        <SafeAreaView>
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <View style={styles.sheet}>
              <View style={styles.handle} />

              {showComingSoon ? (
                <>
                  <View style={styles.comingSoonContainer}>
                    <Text style={styles.comingSoonIcon}>🚧</Text>
                    <Text style={styles.comingSoonTitle}>
                      Em desenvolvimento
                    </Text>
                    <Text style={styles.comingSoonMessage}>
                      Esta funcionalidade será disponibilizada em breve. Fique
                      de olho nas próximas atualizações!
                    </Text>
                  </View>

                  <View style={styles.divider} />

                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={handleClose}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.cancelText}>Fechar</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <View style={styles.header}>
                    <Text style={styles.title}>Novo pedido</Text>
                    <Text style={styles.subtitle}>
                      Selecione o tipo de pedido
                    </Text>
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
                      </View>
                      <Text style={styles.optionChevron}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.option}
                      onPress={() => handleSelectType('counter')}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.optionIcon}>🛍️</Text>
                      <View style={styles.optionContent}>
                        <Text style={styles.optionTitle}>Balcão</Text>
                      </View>
                      <Text style={styles.optionChevron}>›</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.divider} />

                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={handleClose}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.cancelText}>Cancelar</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </TouchableOpacity>
    </Modal>
  );
};
