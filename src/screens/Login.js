import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateAccount = async () => {
    if (!username || !password) {
      setError('All fields must be filled.');
      return;
    }

    try {
      const usersJson = await AsyncStorage.getItem('@users');
      let users = usersJson ? JSON.parse(usersJson) : [];

      const user = users.find(u => u.username === username);

      if (user) {
        if (user.password === password) {
          Alert.alert('Success', 'You are being logged in');
          navigation.navigate('Home');  // or whatever your post-login screen is
        } else {
          setError('Incorrect password. Please try again.');
        }
      } else {
        setError('Username not found.');
      }
    } catch (e) {
      console.error('Login error: ', e);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Log In</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
     
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Log In" onPress={validateAccount} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#d1f8d1ff',
  },
  welcomeText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 8,
    borderRadius: 4,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});
