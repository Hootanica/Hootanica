import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
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
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffdfc', // soft off-white
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
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
    color: '#6b9c4b', // leaf green for headline
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  detail: {
    fontSize: 16,
    color: '#34495E', // soft gray-blue
    marginBottom: 10,
  },
  detailValue: {
    fontWeight: '600',
    color: '#2C3E50', // deep contrast tone
  },
  buttonContainer: {
    marginTop: 30,
  },
  buttonPrimary: {
    backgroundColor: '#d97a8d', // petal pink from commonStyles
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonSecondary: {
    backgroundColor: '#8ebf66', // sprout green for action contrast
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff', // consistent with commonStyles button text
    fontWeight: 'bold',
    fontSize: 16,
  },
});