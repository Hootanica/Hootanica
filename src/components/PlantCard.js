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
      <View style={styles.topRow}>
        {plant.photo ? (
          <Image source={{ uri: plant.photo }} style={styles.image} />
        ) : plant.plantEmoji ? (
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>{plant.plantEmoji}</Text>
          </View>
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderEmoji}>🌱</Text>
          </View>
        )}
        
        <View style={styles.info}>
          <Text style={styles.name}>{plant.name}</Text>
          <Text style={styles.type}>Type: {plant.type}</Text>
        </View>
      </View>
      
      <View style={styles.wateringInfo}>
        <Text style={styles.meta}>Water every {plant.wateringFrequency} days</Text>
        <Text style={styles.meta}>Next watering: {getNextWateringDate()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#d97a8d', //'#fffdfc', // soft off-white
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d97a8d', //'#eedac9', // blush earth tone
    elevation: 2,
    shadowColor: '#6b9c4b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  image: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'white',
  },
  emojiContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: '#f8fff4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  placeholderContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: '#f8fff4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 24,
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
    color: 'white', //'#6b9c4b', // leaf green for subtle contrast
    fontWeight: '500',
  },
  meta: {
    fontSize: 14,
    color: 'white',
    marginBottom: 4,
    lineHeight: 18,
  },
});