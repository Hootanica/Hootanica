import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-display';

const header = `# Welcome to Hootanica!`

const instructions = `
- Add a plant with its name, type, and photo.
- Edit or delete existing plants.
- View plant details and care logs.
- Receive notifications for watering and fertilizing.
`;

export default function InstructionsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Markdown>{header}</Markdown>
      
      <Markdown>{instructions}</Markdown>
    </ScrollView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16, backgroundColor: '#d1f8d1ff' } });
