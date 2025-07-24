import React, { useContext } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import PlantContext from '../context/PlantContext';
import PlantCard from '../components/PlantCard';

export default function HomeScreen({ navigation }) {
  const { plants } = useContext(PlantContext);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={plants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PlantCard
            plant={item}
            onPress={() => navigation.navigate('PlantDetail', { id: item.id })}
          />
        )}
        contentContainerStyle={[
          styles.listContainer,
          plants.length === 0 && styles.emptyContainer,
        ]}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No plants yet. Add your first one!</Text>
        }
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => navigation.navigate('AddEditPlant')}
        >
          <Text style={styles.buttonText}>Add Plant</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.customButton}
          onPress={() => navigation.navigate('Instructions')}
        >
          <Text style={styles.buttonText}>User Help</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.customButton}
          onPress={() => navigation.navigate('Calendar')}
        >
          <Text style={styles.buttonText}>Calendar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
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
  customButton: {
    backgroundColor: '#99c08aff', // light green
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
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
