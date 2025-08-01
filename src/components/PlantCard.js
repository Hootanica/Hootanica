import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

export default function PlantCard({ plant, onPress }) {
  const getNextWateringDate = () => {
    if (!plant.dateCreated || !plant.wateringFrequency) {
      return 'N/A';
    }
    const dateParts = plant.dateCreated.split('-');
    const plantYear = parseInt(dateParts[0]);
    const plantMonth = parseInt(dateParts[1]) - 1;
    const plantDay = parseInt(dateParts[2]);
    const plantStartDate = new Date(plantYear, plantMonth, plantDay);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - plantStartDate.getTime();
    const daysSincePlanting = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (daysSincePlanting >= 0 && daysSincePlanting % plant.wateringFrequency === 0) {
      return 'Today';
    }
    const daysSinceLastWatering = daysSincePlanting % plant.wateringFrequency;
    const daysUntilNextWatering = plant.wateringFrequency - daysSinceLastWatering;
    
    const nextWateringDate = new Date(today);
    nextWateringDate.setDate(today.getDate() + daysUntilNextWatering);
    const month = (nextWateringDate.getMonth() + 1).toString().padStart(2, '0');
    const day = nextWateringDate.getDate().toString().padStart(2, '0');
    
    return `${month}/${day}`;
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {plant.photo && (
        <Image source={{ uri: plant.photo }} style={styles.image} />
      )}
      <View style={styles.info}>
        <Text style={styles.name}>{plant.name}</Text>
        <Text style={styles.type}>{plant.type}</Text>
        <View style={styles.divider} />

        <Text style={styles.meta}><Text style={styles.label}>Next watering:</Text> {getNextWateringDate()}</Text>
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
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
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
    color: '#DE3163', //amaranth pink '#bb5d64', // soft amaranth
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
