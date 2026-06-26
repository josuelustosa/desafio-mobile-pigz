import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { Text } from '../../components/Text/Text';
import { ActionCard } from './ActionCard.component';
import { NewOrderModal } from '../orders/NewOrder.modal';
import { useTheme } from '../../theme/useTheme';

// Logo import
const logo = require('../../assets/logo-pigz-comanda.png');

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const [isNewOrderModalVisible, setNewOrderModalVisible] = useState(false);

  const handleNewOrder = () => {
    setNewOrderModalVisible(true);
  };

  const handleMapPress = () => {
    navigation.navigate('TableMap');
  };

  const handleSettingsPress = () => {
    // Placeholder: Em desenvolvimento
    console.log('Configurações em desenvolvimento');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface.default }]}>
        <Image 
          source={logo} 
          style={styles.logo} 
          resizeMode="contain"
        />
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* User Info */}
        <View style={styles.userInfo}>
          <Text variant="h2" style={styles.userName}>
            Ghabrichelson
          </Text>
          <Text variant="caption" color={colors.text.secondary}>
            Zigpi Restaurante
          </Text>
        </View>

        {/* Action Cards Grid */}
        <View style={styles.grid}>
          <View style={styles.row}>
            <View style={styles.cardWrapper}>
              <ActionCard
                icon="add"
                label="Novo Pedido"
                onPress={handleNewOrder}
                testID="action-card-new-order"
              />
            </View>
            <View style={styles.cardWrapper}>
              <ActionCard
                icon="cards"
                label="Mapa de atendimento"
                onPress={handleMapPress}
                testID="action-card-table-map"
              />
            </View>
          </View>
          
          <View style={styles.row}>
            <View style={styles.cardWrapper}>
              <ActionCard
                icon="settings"
                label="Configurações"
                onPress={handleSettingsPress}
                testID="action-card-settings"
              />
            </View>
            <View style={styles.cardWrapper} />
          </View>
        </View>
      </ScrollView>

      {/* New Order Modal */}
      <NewOrderModal
        isVisible={isNewOrderModalVisible}
        onClose={() => setNewOrderModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  logo: {
    height: 32,
    width: 200,
  },
  content: {
    padding: 16,
  },
  userInfo: {
    marginBottom: 32,
    marginTop: 8,
  },
  userName: {
    marginBottom: 4,
  },
  grid: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  cardWrapper: {
    flex: 1,
  },
});
