import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'; // Assumes this package is installed

export default function NavBar( { navigation }) {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
        <Icon name="leaf-outline" size={22} color="#74b72e" />
        <Text style={styles.label}>Plants</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Calendar')}>
        <Icon name="calendar-outline" size={22} color="#6b4f3a" />
        <Text style={styles.label}>Calendar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Instructions')}>
        <Icon name="help-circle-outline" size={22} color="#DE3163" />
        <Text style={styles.label}>Help</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#fffdfc',
    borderTopWidth: 1,
    borderColor: '#4A2511', //'#eedac9',
    elevation: 3,
    shadowColor: '#6b4f3a',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  navItem: {
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    marginTop: 4,
    color: '#555555',
    fontWeight: '500',
  },
});