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
    alignItems: 'flex-start',
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#d97a8d', //'#fffdfc', // soft off-white
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black', //'#d97a8d', //'#eedac9', // blush earth tone
    elevation: 2,
    shadowColor: '#6b9c4b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'black', //'#d97a8d', // petal pink
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: 'white', //'#2C3E50', // main heading color
    marginBottom: 4,
  },
  type: {
    fontSize: 15,
    color: 'black', //'#6b9c4b', // leaf green for subtle contrast
    fontWeight: '500',
    marginBottom: 10,
  },
  meta: {
    fontSize: 14,
    color: 'white', //'#555555', // soft neutral
    marginBottom: 6,
    lineHeight: 20,
  },
});