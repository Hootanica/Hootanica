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
    backgroundColor: '#90EE90', // Light green
    width: 20,
    height: 10,
    borderRadius: 10,
    opacity: 0.8,
  },

  // Top-left ovals
  oval1: { top: 10, left: 10, transform: [{ rotate: '15deg' }] },
  oval2: { top: 30, left: 25, transform: [{ rotate: '-10deg' }] },
  oval3: { top: 50, left: 5, transform: [{ rotate: '25deg' }] },

  // Top-right ovals
  oval4: { top: 10, right: 10, transform: [{ rotate: '-20deg' }] },
  oval5: { top: 30, right: 25, transform: [{ rotate: '10deg' }] },
  oval6: { top: 50, right: 5, transform: [{ rotate: '-30deg' }] },
});

const markdownStyles = {
  heading1: {
    color: '#01796F', // Pine green
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 60,
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
