import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/store/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';
import { theme } from './src/styles/theme';
import { View, StatusBar, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
              <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
              <RootNavigator />
            </View>
          </NavigationContainer>
        </PaperProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
