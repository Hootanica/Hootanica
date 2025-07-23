import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { PlantProvider } from './src/context/PlantContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <PlantProvider>
      <SafeAreaProvider>
        <AppNavigator />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </PlantProvider>
  );
}
