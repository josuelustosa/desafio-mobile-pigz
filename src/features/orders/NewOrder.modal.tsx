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
import { Icon } from '../../components/Icon';

export type OrderType = 'table' | 'counter';

interface NewOrderModalProps {
  isVisible: boolean;
  onClose?: () => void;
  onSelectType?: (type: OrderType) => void;
}

export const NewOrderModal: React.FC<NewOrderModalProps> = ({
  isVisible,
  onClose,
  onSelectType,
}) => {
  const dispatch = useAppDispatch();
  const { colors, spacing, textStyles } = useTheme();
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleClose = useCallback(() => {
    setShowComingSoon(false);
    dispatch(closeNewOrderModal());
    onClose?.();
  }, [dispatch, onClose]);

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
      ...textStyles.headingMd,
      color: colors.text.primary,
      marginBottom: spacing.xs,
    },
    subtitle: {
      ...textStyles.bodyMd,
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
      marginRight: spacing.md,
      width: 36,
    },
    optionContent: {
      flex: 1,
    },
    optionTitle: {
      ...textStyles.labelLg,
      color: colors.text.primary,
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
      ...textStyles.labelLg,
      color: colors.text.secondary,
    },
    // Coming Soon state
    comingSoonContainer: {
      alignItems: 'center',
      paddingVertical: spacing.xl,
    },
    comingSoonIconContainer: {
      marginBottom: spacing.md,
    },
    comingSoonTitle: {
      ...textStyles.headingSm,
      color: colors.text.primary,
      marginBottom: spacing.sm,
      textAlign: 'center',
    },
    comingSoonMessage: {
      ...textStyles.bodyMd,
      color: colors.text.secondary,
      textAlign: 'center',
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
                    <View style={styles.comingSoonIconContainer}>
                      <Icon
                        name="settings"
                        size={48}
                        color={colors.text.tertiary}
                      />
                    </View>
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
                      <View style={styles.optionIcon}>
                        <Icon
                          name="table_restaurant"
                          size={24}
                          color={colors.text.primary}
                        />
                      </View>
                      <View style={styles.optionContent}>
                        <Text style={styles.optionTitle}>Mesa/Comanda</Text>
                      </View>
                      <Icon
                        name="chevron_right"
                        size={20}
                        color={colors.text.tertiary}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.option}
                      onPress={() => handleSelectType('counter')}
                      activeOpacity={0.7}
                    >
                      <View style={styles.optionIcon}>
                        <Icon
                          name="shopping_bag_speed"
                          size={24}
                          color={colors.text.primary}
                        />
                      </View>
                      <View style={styles.optionContent}>
                        <Text style={styles.optionTitle}>Balcão</Text>
                      </View>
                      <Icon
                        name="chevron_right"
                        size={20}
                        color={colors.text.tertiary}
                      />
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
