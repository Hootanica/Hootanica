import React from 'react';
import { View, Button, StyleSheet, Text, SafeAreaView } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Hootanica!</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Returning User: Login"
          color="#074407ff"
          onPress={() => navigation.navigate('Login')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="New User: Create Account"
          color="#47b847ff"
          onPress={() => navigation.navigate('CreateAccount')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#d1f8d1ff', // light green
  },
  welcomeText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
