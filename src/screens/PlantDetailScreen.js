import React, { useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import PlantContext from '../context/PlantContext';

export default function PlantDetailScreen({ route, navigation }) {
  const { plants, deletePlant } = useContext(PlantContext);
  const plant = plants.find(p => p.id === route.params.id);

  useEffect(() => {
    if (!plant) {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate('Home');
      }
    }
  }, [plant]);

  return (
    <View style={styles.container}>
      <Text>Name: {plant?.name}</Text>
      <Text>Type: {plant?.type}</Text>
      <Text>Date Created: {plant?.dateCreated}</Text>
      <Text>Water every {plant?.wateringFrequency} days</Text>
      <Button title="Edit Plant" color={"#074407ff"} onPress={() => navigation.navigate('AddEditPlant', { id: plant.id })} />
      <View style={{ height: 10 }} />
      <Button
        title="Delete Plant"
        color="#074407ff"
        onPress={() => {
          deletePlant(plant.id);
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.navigate('Home');
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#d1f8d1ff' },
});
