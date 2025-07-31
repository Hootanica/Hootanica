import React from 'react';
import { ScrollView, StyleSheet, View, StatusBar } from 'react-native';
import Markdown from 'react-native-markdown-display';
import NavBar from '../components/NavBar';

export default function InstructionsScreen({ navigation }) {
  const header = `# Welcome to Hootanica!`;

  const instructions = `
**🌱 Add a plant** with its name, type, and photo.  
Click the "+ Add Plant" button and fill out the fields with the required information.  
Give your plant a unique name, or keep it the same as its type!

**✏️ Edit or delete existing plants.**  
Tap on a plant on the Home Page, then choose "Edit Plant" or "Delete Plant".

**🔍 View plant details and care logs.**

**📅 View plant care schedules in a calendar.**  
Tap the "Calendar" button, then tap any day to see that day's care tasks.

**🔔 Receive notifications for watering and fertilizing.**
`;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFF8F3" barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Markdown style={markdownStyles}>{header}</Markdown>
        <Markdown style={markdownStyles}>{instructions}</Markdown>
      </ScrollView>

      <NavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F3',
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
});

const markdownStyles = {
  heading1: {
    color: '#028a0f', // rich green
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  body: {
    fontSize: 18,
    color: '#2E1503',
    lineHeight: 30,
  },
  strong: {
    color: '#4A2511',
  },
  paragraph: {
    marginBottom: 16,
  },
  list_item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bullet: {
    fontSize: 20,
    color: '#2E1503',
    marginRight: 10,
  },
};
