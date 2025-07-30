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

      <View style={styles.header}>
        <Text style={styles.title}>Your Garden</Text>
        <Text style={styles.subtitle}>Track and nurture your plants 🌿</Text>
      </View>

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
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🪴</Text>
            <Text style={styles.emptyText}>No plants yet.</Text>
            <Text style={styles.emptySubText}>Start growing your digital garden by adding one!</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />

      <View style={[styles.buttonContainer, { paddingBottom: insets.bottom + 10 }]}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('AddEditPlant')}
        >
          <Text style={styles.buttonText}>＋ Add Plant</Text>
        </TouchableOpacity>
      </View>

      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F3',
  },
  header: {
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E1503',
  },
  subtitle: {
    fontSize: 16,
    color: '#4A3728',
    marginTop: 4,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 60,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 24,
    color: '#d97a8d',
    fontWeight: '600',
    marginBottom: 6,
  },
  emptySubText: {
    fontSize: 16,
    color: '#4A3728',
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: '#FFF8F3',
  },
  primaryButton: {
    backgroundColor: '#d97a8d',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
