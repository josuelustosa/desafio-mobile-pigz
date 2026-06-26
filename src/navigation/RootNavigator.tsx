import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../theme/useTheme';

// Screens
import { HomeScreen } from '../features/home/Home.screen';
import { TableMapScreen } from '../features/tables/TableMap.screen';

export type RootStackParamList = {
  Home: undefined;
  TableMap: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
          }}
        />
        <Stack.Screen
          name="TableMap"
          component={TableMapScreen}
          options={{
            title: 'Mesas',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
