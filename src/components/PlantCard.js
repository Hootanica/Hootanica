import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

export default function PlantCard({ plant, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {plant.photo && (
        <Image source={{ uri: plant.photo }} style={styles.image} />
      )}
      <View style={styles.info}>
        <Text style={styles.name}>{plant.name}</Text>
        <Text style={styles.type}>{plant.type}</Text>
        <Text style={styles.meta}>Created: {plant.dateCreated}</Text>
        <Text style={styles.meta}>Water every {plant.wateringFrequency} days</Text>
        <Text style={styles.meta}>Fertilizer Requirements: {plant.fertReq}</Text>
        <Text style={styles.meta}>Soil Requirements: {plant.soilReq}</Text>
        <Text style={styles.meta}>Sunlight Requirements: {plant.sunReq}</Text>
        <Text style={styles.meta}>Disease History: {plant.disHist}</Text>
        <Text style={styles.meta}>Possible Diseases: {plant.disease}</Text>
        <Text style={styles.meta}>Disease Treatments: {plant.treatment}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#eedac9ff', //'#bd9a7a',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#654321', //'#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5, //1.41,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  type: {
    fontSize: 14,
    color: '#1c6113ff',
  },
});
