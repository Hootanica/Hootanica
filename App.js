import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { PlantProvider } from './src/context/PlantContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <PlantProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </PlantProvider>
  );
}
