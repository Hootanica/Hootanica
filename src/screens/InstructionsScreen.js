import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Markdown from 'react-native-markdown-display';

const header = `# Welcome to Hootanica!`;

const instructions = `
Add a plant with its name, type, and photo.

Edit or delete existing plants.

View plant details and care logs.

View plant care schedules in a calendar.

Receive notifications for watering and fertilizing.
`;

export default function InstructionsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Decorative Leaf Ovals - Top Left */}
      <View style={[styles.oval, styles.oval1]} />
      <View style={[styles.oval, styles.oval2]} />
      <View style={[styles.oval, styles.oval3]} />

      {/* Decorative Leaf Ovals - Top Right */}
      <View style={[styles.oval, styles.oval4]} />
      <View style={[styles.oval, styles.oval5]} />
      <View style={[styles.oval, styles.oval6]} />
      <View style={[styles.oval, styles.oval7]} />

      <View style={[styles.oval, styles.oval8]} />
      <View style={[styles.oval, styles.oval9]} />
      <View style={[styles.oval, styles.oval10]} />

      {/* Header */}
      <Markdown style={markdownStyles}>{header}</Markdown>

      {/* Spacing between header and bullet points */}
      <View style={{ height: 20 }} />

      {/* Instructions */}
      <Markdown style={markdownStyles}>{instructions}</Markdown>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    flexGrow: 1,
    alignItems: 'center',
    position: 'relative',
  },

  oval: {
    position: 'absolute',
    backgroundColor: '#bee5b0', // Light green
    width: 30,
    height: 17,
    borderRadius: 10,
    opacity: 0.8,
  },

  // Leaf Ovals
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
    color: '#476f4d', // Pine green
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 80,
  },
  bullet_list: {
    fontSize: 18,
    lineHeight: 28,
    color: '#000000',
  },
  list_item: {
    color: '#000000',
  },
  bullet: {
    color: '#000000',
  },
};
