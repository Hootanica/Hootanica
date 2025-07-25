import React, { useContext } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PlantContext from '../context/PlantContext';
import PlantCard from '../components/PlantCard';

export default function HomeScreen({ navigation }) {
  const { plants } = useContext(PlantContext);
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} backgroundColor="white" barStyle="dark-content" />
      <View style={styles.listSection}>
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
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={[styles.buttonContainer, { paddingBottom: insets.bottom }]}>
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
    backgroundColor: 'white',
  },
  listSection: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  buttonContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
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
