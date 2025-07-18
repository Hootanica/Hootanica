import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlantContext = createContext();

const initialState = {
  plants: [],
};

function plantReducer(state, action) {
  switch (action.type) {
    case 'SET_PLANTS':
      return { ...state, plants: action.payload };
    case 'ADD_PLANT':
      return { ...state, plants: [...state.plants, action.payload] };
    case 'EDIT_PLANT':
      return {
        ...state,
        plants: state.plants.map(plant =>
          plant.id === action.payload.id ? action.payload : plant
        ),
      };
    case 'DELETE_PLANT':
      return {
        ...state,
        plants: state.plants.filter(plant => plant.id !== action.payload),
      };
    default:
      return state;
  }
}

export function PlantProvider({ children }) {
  const [state, dispatch] = useReducer(plantReducer, initialState);
  
  useEffect(() => {
    const loadPlants = async () => {
      try {
        const stored = await AsyncStorage.getItem('plants');
        if (stored) dispatch({ type: 'SET_PLANTS', payload: JSON.parse(stored) });
      } catch (e) {
        console.error('Failed to load plants from storage', e);
      }
    };
    loadPlants();
  }, []);

  useEffect(() => {
    const savePlants = async () => {
      try {
        await AsyncStorage.setItem('plants', JSON.stringify(state.plants));
      } catch (e) {
        console.error('Failed to save plants to storage', e);
      }
    };
    savePlants();
  }, [state.plants]);

  const addPlant = plant => dispatch({ type: 'ADD_PLANT', payload: plant });
  const editPlant = plant => dispatch({ type: 'EDIT_PLANT', payload: plant });
  const deletePlant = id => dispatch({ type: 'DELETE_PLANT', payload: id });

  return (
    <PlantContext.Provider value={{ plants: state.plants, addPlant, editPlant, deletePlant }}>
      {children}
    </PlantContext.Provider>
  );
}

export default PlantContext;
