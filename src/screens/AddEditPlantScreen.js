import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import PlantContext from '../context/PlantContext';

export default function AddEditPlantScreen({ navigation, route }) {
  const { addPlant, editPlant, plants } = useContext(PlantContext);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [photo, setPhoto] = useState(null);

  const editingId = route.params?.id;

  useEffect(() => {
    if (editingId) {
      const plant = plants.find(p => p.id === editingId);
      if (plant) {
        setName(plant.name);
        setType(plant.type);
        setPhoto(plant.photo);
      }
    }
  }, [editingId]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const save = () => {
    const plant = { id: editingId || Date.now(), name, type, photo };
    if (editingId) editPlant(plant);
    else addPlant(plant);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Type" value={type} onChangeText={setType} style={styles.input} />
      <Button title="Add Plant Picture" color={"#074407ff"} onPress={pickImage} />
      {photo && <Image source={{ uri: photo }} style={styles.image} />}
      <View style={{ height: 10 }} />
      <Button title="Save Plant" color={"#074407ff"} onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#d1f8d1ff' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8 },
  image: { width: 100, height: 100, marginVertical: 8 },
});
