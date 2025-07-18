import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateAccount({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const createAccount = async () => {
    if (!username || !password || !confirmPassword) {
      setError('All fields have not been filled.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const usersJson = await AsyncStorage.getItem('@users');
      let users = usersJson ? JSON.parse(usersJson) : [];

      const userExists = users.some(u => u.username === username);
      if (userExists) {
        setError('Username already exists');
        return;
      }

      const newUser = { username, password };
      users.push(newUser);

      await AsyncStorage.setItem('@users', JSON.stringify(users));
      Alert.alert('Success', 'Your account has been created!');
      navigation.navigate('Login');
    } catch (e) {
      console.error('There was an error creating this account: ', e);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Sign Up Below</Text>

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
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Create Account" onPress={createAccount} />
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
