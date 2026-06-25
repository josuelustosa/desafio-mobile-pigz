import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../theme/useTheme';

// Screens
import { TableMapScreen } from '../features/tables/TableMap.screen';

export type RootStackParamList = {
  TableMap: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
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
