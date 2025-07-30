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
        <View style={styles.divider} />

        <Text style={styles.meta}><Text style={styles.label}>Created:</Text> {plant.dateCreated}</Text>
        <Text style={styles.meta}><Text style={styles.label}>Water:</Text> Every {plant.wateringFrequency} days</Text>
        <Text style={styles.meta}><Text style={styles.label}>Fertilizer:</Text> {plant.fertReq}</Text>
        <Text style={styles.meta}><Text style={styles.label}>Soil:</Text> {plant.soilReq}</Text>
        <Text style={styles.meta}><Text style={styles.label}>Sunlight:</Text> {plant.sunReq}</Text>
        <Text style={styles.meta}><Text style={styles.label}>Disease History:</Text> {plant.disHist}</Text>
        <Text style={styles.meta}><Text style={styles.label}>Possible Diseases:</Text> {plant.disease}</Text>
        <Text style={styles.meta}><Text style={styles.label}>Treatments:</Text> {plant.treatment}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF8F3', //'#EBF5F0', // soft warm white
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#4A2511', // pecan
    overflow: 'hidden',
    marginVertical: 10,
    marginHorizontal: 16,
    elevation: 5,
    shadowColor: '#A67B5B', // cafe au lait
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  image: {
    width: 130,
    height: '100%',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  info: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E1503', // dark chocolate
    marginBottom: 2,
  },
  type: {
    fontSize: 14,
    color: '#E52B50', //amaranth pink '#bb5d64', // soft amaranth
    marginBottom: 8,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: '#D3B49C', // soft cafe au lait
    marginVertical: 8,
  },
  meta: {
    fontSize: 14,
    color: '#4A3728', // cedar brown
    marginBottom: 5,
    lineHeight: 20,
  },
  label: {
    fontWeight: '600',
    color: '#2E1503',
  },
});
