import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import NavBar from '../components/NavBar';
import { commonStyles } from '../styles/commonStyles';

export default function InstructionsScreen({ navigation }) {
  const header = `# Welcome to Hootanica!`;

  const instructions = `
- **Add a plant** with its name, type, and photo.  
  Click the "Add Plant" button and fill out the fields with the required information.

- **Edit or delete existing plants.**  
  Click on the desired plant in the Home Page and then choose "Edit Plant" or "Delete Plant".

- **View plant details and care logs.**

- **View plant care schedules in a calendar.**  
  Tap the "Calendar" button, then click any day to view that day's care schedule.

- **Receive notifications for watering and fertilizing.**
`;

  return (
    <View style={commonStyles.container}>
      {/* Decorative Leaf Ovals */}
      <View style={styles.decorations}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
          <View key={i} style={[styles.oval, styles[`oval${i}`]]} />
        ))}
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={[commonStyles.scrollContainer, styles.scrollContent]}>
        <Markdown style={markdownStyles}>{header}</Markdown>
        <View style={{ height: 20 }} />
        <Markdown style={markdownStyles}>{instructions}</Markdown>
      </ScrollView>

      {/* NavBar fixed at bottom */}
      <NavBar navigation={navigation} />
    </View>
  );
}
const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 100, // leave space for ovals
    paddingBottom: 100, // room for NavBar
  },
  decorations: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  oval: {
    position: 'absolute',
    backgroundColor: '#bee5b0',
    width: 30,
    height: 17,
    borderRadius: 10,
    opacity: 0.8,
  },
  oval1: { top: 10, left: 45, transform: [{ rotate: '53deg' }] },
  oval2: { top: 35, left: 10, transform: [{ rotate: '-70deg' }] },
  oval3: { top: 50, left: 90, transform: [{ rotate: '75deg' }] },
  oval4: { top: 10, right: 10, transform: [{ rotate: '53deg' }] },
  oval5: { top: 30, right: 195, transform: [{ rotate: '-70deg' }] },
  oval6: { top: 50, right: 150, transform: [{ rotate: '75deg' }] },
  oval7: { top: 30, right: 75, transform: [{ rotate: '53deg' }] },
  oval8: { top: 25, right: 240, transform: [{ rotate: '53deg' }] },
  oval9: { top: 10, right: 115, transform: [{ rotate: '-70deg' }] },
  oval10: { top: 45, right: 30, transform: [{ rotate: '-53deg' }] },
});
const markdownStyles = {
  heading1: {
    color: '#d97a8d', // petal pink
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  body: {
    fontSize: 18,
    color: '#000000',
    lineHeight: 28,
  },
  bullet_list: {
    marginLeft: 16,
  },
  list_item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet: {
    color: '#000000',
  },
};
