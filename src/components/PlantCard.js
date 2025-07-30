// Color hex-code site: https://www.color-meanings.com/list-of-colors-names-hex-codes/#brown

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
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: .5,
    borderColor: '#4A2511', // pecan
    overflow: 'hidden',
    marginVertical: 10,
    elevation: 4,
    //shadowColor: '#A67B5B', // cafe au lait
    //shadowOffset: { width: 0, height: 2 },
    //shadowOpacity: 0.2,
    //shadowRadius: 6,
  },
  image: {
    width: 150,
    height: '100%',
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E1503', // dark chocolate
    marginBottom: 2,
  },
  type: {
    fontSize: 14,
    color: '#e52b50', // amaranth pink, '#bb5d64' = color as it shows up in startup animation
    marginBottom: 10,
  },
  meta: {
    fontSize: 14,
    color: '#4A3728', // neutral brown-gray, called cedar brown
    marginBottom: 6,
    lineHeight: 20,
  },
});
