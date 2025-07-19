import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddEditPlantScreen from '../screens/AddEditPlantScreen';
import PlantDetailScreen from '../screens/PlantDetailScreen';
import InstructionsScreen from '../screens/InstructionsScreen';
import CalendarView from '../screens/Calendar';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddEditPlant" component={AddEditPlantScreen} />
        <Stack.Screen name="PlantDetail" component={PlantDetailScreen} />
        <Stack.Screen name="Instructions" component={InstructionsScreen} />
        <Stack.Screen name="Calendar" component={CalendarView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
