import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, ScrollView, SafeAreaView } from 'react-native';
import PlantContext from '../context/PlantContext';
import NavBar from '../components/NavBar';

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

  const handleDelete = () => {
    const doDelete = () => {
      deletePlant(plant.id);
      navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home');
    };

    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to delete this plant?')) {
        doDelete();
      }
    } else {
      Alert.alert(
        'Delete Plant',
        'Are you sure you want to delete this plant?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: doDelete },
        ],
        { cancelable: true }
      );
    }
  };

  if (!plant) return null;

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>{plant.name}</Text>
          <Text style={styles.detail}>Type: <Text style={styles.detailValue}>{plant.type}</Text></Text>
          <Text style={styles.detail}>Date Created: <Text style={styles.detailValue}>{plant.dateCreated}</Text></Text>
          <Text style={styles.detail}>Water every <Text style={styles.detailValue}>{plant.wateringFrequency} days</Text></Text>
          <Text style={styles.detail}>Fertilizer Requirements: <Text style={styles.detailValue}>{plant.fertReq}</Text></Text>
          <Text style={styles.detail}>Soil Requirements: <Text style={styles.detailValue}>{plant.soilReq}</Text></Text>
          <Text style={styles.detail}>Sunlight Requirements: <Text style={styles.detailValue}>{plant.sunReq}</Text></Text>
          <Text style={styles.detail}>Disease History: <Text style={styles.detailValue}>{plant.disHist}</Text></Text>
          <Text style={styles.detail}>Possible Diseases: <Text style={styles.detailValue}>{plant.disease}</Text></Text>
          <Text style={styles.detail}>Disease Treatments: <Text style={styles.detailValue}>{plant.treatment}</Text></Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonPrimary}
              onPress={() => navigation.navigate('AddEditPlant', { id: plant.id })}
            >
              <Text style={styles.buttonText}>Edit Plant</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={handleDelete}
            >
              <Text style={styles.buttonText}>Delete Plant</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Always at the bottom */}
      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fffdfc',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100, // leave room for nav bar
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#d97a8d',
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#6b9c4b',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  detail: {
    fontSize: 16,
    color: '#34495E',
    marginBottom: 10,
  },
  detailValue: {
    fontWeight: '600',
    color: '#2C3E50',
  },
  buttonContainer: {
    marginTop: 30,
  },
  buttonPrimary: {
    backgroundColor: '#d97a8d',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonSecondary: {
    backgroundColor: '#8ebf66',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
