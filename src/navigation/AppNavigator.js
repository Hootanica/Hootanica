import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddEditPlantScreen from '../screens/AddEditPlantScreen';
import PlantDetailScreen from '../screens/PlantDetailScreen';
import InstructionsScreen from '../screens/InstructionsScreen';
import StartingAnimationScreen from '../screens/StartAnimation';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Hootanica"> 
        <Stack.Screen name="Hootanica" component={StartingAnimationScreen} />
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="AddEditPlant" component={AddEditPlantScreen} />
        <Stack.Screen name="PlantDetail" component={PlantDetailScreen} />
        <Stack.Screen name="Instructions" component={InstructionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
