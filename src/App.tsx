/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { lightColors, darkColors } from './theme/colors';
import { spacing, radii } from './theme/spacing';
import { textStyles } from './theme/typography';

function AppContent() {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.background.primary,
        },
      ]}
      edges={['top']}
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={styles.content}>
        <Text style={[textStyles.headingLg, { color: colors.text.primary }]}>
          Hello,
        </Text>

        <Text
          style={[
            textStyles.headingMd,
            {
              color: colors.brand.default,
              marginTop: spacing.xs,
            },
          ]}
        >
          Fulano de Tal
        </Text>

        <Text
          style={[
            textStyles.bodyMd,
            {
              color: colors.text.secondary,
              marginTop: spacing.lg,
            },
          ]}
        >
          Seja bem-vindo ao aplicativo.
        </Text>

        <View style={styles.skeletonContainer}>
          {[1, 2, 3].map(item => (
            <View
              key={item}
              style={[
                styles.skeletonButton,
                {
                  backgroundColor: colors.background.tertiary,
                },
              ]}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxl,
  },

  skeletonContainer: {
    marginTop: spacing.xxxl,
    gap: spacing.md,
  },

  skeletonButton: {
    height: 56,
    borderRadius: radii.md,
  },
});
