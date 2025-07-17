import React, { useContext } from 'react';
import { View, FlatList, Button, StyleSheet } from 'react-native';
import PlantContext from '../context/PlantContext';
import PlantCard from '../components/PlantCard';

export default function HomeScreen({ navigation }) {
  const { plants } = useContext(PlantContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={plants}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <PlantCard plant={item} onPress={() => navigation.navigate('PlantDetail', { id: item.id })} />
        )}
      />
      <Button title="Add Plant" color={"green"} onPress={() => navigation.navigate('AddEditPlant')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
