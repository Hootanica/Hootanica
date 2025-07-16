import React, { createContext, useReducer } from 'react';

const PlantContext = createContext();

const initialState = {
  plants: [],
};

function plantReducer(state, action) {
  switch (action.type) {
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
