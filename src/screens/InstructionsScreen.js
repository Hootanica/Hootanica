import React from 'react';
import { ScrollView, StyleSheet, View, StatusBar } from 'react-native';
import Markdown from 'react-native-markdown-display';
import NavBar from '../components/NavBar';

export default function InstructionsScreen({ navigation }) {
  const header = `# Welcome to Hootanica!`;

  const instructions = `

**🌱 Add a plant**  
Tap **"+ Add Plant"** to enter your plant’s name, type, photo, and other information.  
Give your plant a unique name or use the type — it's up to you!

---

**✏️ Edit or delete a plant**  
Tap any plant on the Home screen to edit its details or remove it.

---

**🔍 View plant details**  
Explore care logs and history for each plant from the details screen.

---

**📅 Use the care calendar**  
Visit the **Calendar** tab to see daily tasks and care schedules.

---

**🔔 Enable reminders**  
Get gentle notifications when it's time to water your plants.
`;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFF8F3" barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Markdown style={markdownStyles}>{header}</Markdown>
          <Markdown style={markdownStyles}>{instructions}</Markdown>
        </View>
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
  scrollContainer: {
    paddingTop: 40,
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    elevation: 4,
    shadowColor: '#A67B5B', // soft brown
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
});

const markdownStyles = {
  heading1: {
    color: '#74b72e',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  body: {
    fontSize: 16,
    color: '#2E1503',
    lineHeight: 28,
  },
  strong: {
    fontWeight: '600',
    color: '#4A2511',
  },
  paragraph: {
    marginBottom: 18,
  },
  list_item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  bullet: {
    fontSize: 20,
    color: '#2E1503',
    marginRight: 10,
  },
  hr: {
    borderBottomColor: '#d6c4b3',
    borderBottomWidth: 1,
    marginVertical: 16,
  },
};
