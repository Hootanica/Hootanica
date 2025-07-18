import React, { useContext } from 'react';
import { View, FlatList, Button, StyleSheet, Text, SafeAreaView } from 'react-native';
import PlantContext from '../context/PlantContext';
import PlantCard from '../components/PlantCard';

export default function HomeScreen({ navigation }) {
  const { plants } = useContext(PlantContext);

  return (
    <SafeAreaView style={styles.container}>
      <View></View>
      <FlatList
        data={plants}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <PlantCard plant={item} onPress={() => navigation.navigate('PlantDetail', { id: item.id })} />
        )}

        contentContainerStyle={[styles.listContainer, plants.length === 0 && styles.emptyContainer,]}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No plants yet. Add your first one!</Text>
        }
      />

      <View style={styles.buttonContainer}>
      <Button title="Add Plant" color={"#074407ff"} onPress={() => navigation.navigate('AddEditPlant')} />
      <View style={{ height: 10 }} />
      <Button title="User Help" color={"#074407ff"} onPress={() => navigation.navigate('Instructions')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#d1f8d1ff', // light green
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  emptyContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 32,
    color: 'gray',
    textAlign: 'center',
  },
});
