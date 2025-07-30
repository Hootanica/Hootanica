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
import NavBar from '../components/NavBar';

export default function HomeScreen({ navigation }) {
  const { plants } = useContext(PlantContext);
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} backgroundColor="white" barStyle="dark-content" />

      {/* Top-right Add Plant Button */}
      <View style={styles.topRightButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddEditPlant')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scrollSection}>
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
            styles.scrollContainer,
            plants.length === 0 && styles.emptyContainer,
          ]}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No plants yet. Add your first one!</Text>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>

      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', //'#f1f9ec',
    flex: 1,
  },
  scrollSection: {
    flex: 1,
    paddingTop: 70, // leave space for top-right button
    paddingHorizontal: 16,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  topRightButtonContainer: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
  },
  addButton: {
    backgroundColor: '#028a0f', //'#6b9c4b',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#A67B5B', //'#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 28,
    lineHeight: 28,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 32,
    color: '#d97a8d',
    textAlign: 'center',
  },
});
