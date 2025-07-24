import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import PlantContext from '../context/PlantContext';
import { Picker } from '@react-native-picker/picker';


 const wateringFrequencyOptions = [];

  for (let i = 1; i <= 30;  i++){
    wateringFrequencyOptions.push(i)
  }

export default function AddEditPlantScreen({ navigation, route }) {
  const { addPlant, editPlant, plants } = useContext(PlantContext);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [photo, setPhoto] = useState(null);
  const [dateCreated, setDateCreated] = useState(new Date().toISOString().split('T')[0]);
  const [wateringFrequency, setWateringFrequency] = useState(1);
  const [fertReq, setFertilizerRequirements] = useState('');
  const [soilReq, setSoilRequirements] = useState('');
  const[sunReq, setSunRequirements] = useState('');
  const[disHist, setDisHist] = useState('');
  const[disease, setDisease] = useState('');
  const[treatment, setTreatment] = useState('');

 

  const editingId = route.params?.id;


  useEffect(() => {
    if (editingId) {
      const plant = plants.find(p => p.id === editingId);
      if (plant) {
        setName(plant.name);
        setType(plant.type);
        setPhoto(plant.photo);
        setDateCreated(plant.dateCreated);
        setWateringFrequency(plant.wateringFrequency);
        setFertilizerRequirements(plant.fertReq);
        setSoilRequirements(plant.soilReq);
        setSunRequirements(plant.sunReq);
        setDisHist(plant.disHist);
        setDisease(plant.disease);
        setTreatment(plant.treatment);
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
    const plant = {
      id: editingId || Date.now(),
      name,
      type,
      photo,
      dateCreated,
      wateringFrequency,
      fertReq,
      soilReq,
      sunReq,
      disHist,
      disease,
      treatment,
    };
    if (editingId) editPlant(plant);
    else addPlant(plant);
    navigation.goBack();
  };

  return (
<ScrollView style ={styles.scrollView}>
  <View style={styles.container}>
    <Text style={styles.title}>Add or Edit Plant</Text>

    <View style={styles.formGroup}>
      <Text style={styles.label}>Name:</Text>
      <TextInput 
        placeholder="Enter plant name" 
        value={name} 
        onChangeText={setName} 
        style={styles.input} 
      />
    </View>

    <View style={styles.formGroup}>
      <Text style={styles.label}>Type:</Text>
      <TextInput 
        placeholder="Enter plant type" 
        value={type} 
        onChangeText={setType} 
        style={styles.input} 
      />
    </View>

    <View style={styles.formGroup}>
      <Text style={styles.label}>Date Created:</Text>
      <TextInput 
        placeholder="YYYY-MM-DD" 
        value={dateCreated} 
        onChangeText={setDateCreated} 
        style={styles.input} 
      />
    </View>

    <View style={styles.formGroup}>
      <Text style={styles.label}>Watering Frequency (days):</Text>
      <Picker 
        selectedValue={wateringFrequency}
        onValueChange={(itemValue) => setWateringFrequency(Number(itemValue))}
        style={styles.picker}
      >
        {wateringFrequencyOptions.map((number) => (
          <Picker.Item key={number} label={`${number}`} value={number} />
        ))}
      </Picker>
    </View>

    <View style={styles.formGroup}>
      <Text style={styles.label}>Fertilizer Requirements:</Text>
      <TextInput 
        placeholder="Enter fertilizer requirements" 
        value={fertReq} 
        onChangeText={setFertilizerRequirements} 
        style={styles.input} 
      />
    </View>

    <View style={styles.formGroup}>
      <Text style={styles.label}>Soil Requirements:</Text>
      <TextInput 
        placeholder="Enter soil requirements" 
        value={soilReq} 
        onChangeText={setSoilRequirements} 
        style={styles.input} 
      />
    </View>

    <View style={styles.formGroup}>
      <Text style={styles.label}>Sunlight Requirements:</Text>
      <TextInput 
        placeholder="Enter sunlight requirements" 
        value={sunReq} 
        onChangeText={setSunRequirements} 
        style={styles.input} 
      />
    </View>

    <View style={styles.formGroup}>
      <Text style={styles.label}>Disease History:</Text>
      <TextInput 
        placeholder="Enter disease history with date occurred if known" 
        value={disHist} 
        onChangeText={setDisHist} 
        style={styles.input} 
      />
    </View>

    <View style={styles.formGroup}>
      <Text style={styles.label}>Possible Diseases:</Text>
      <TextInput 
        placeholder="Enter possible diseases" 
        value={disease} 
        onChangeText={setDisease} 
        style={styles.input} 
      />
    </View>

    <View style={styles.formGroup}>
      <Text style={styles.label}>Disease Treatments:</Text>
      <TextInput 
        placeholder="Enter treatments for diseases" 
        value={treatment} 
        onChangeText={setTreatment} 
        style={styles.input} 
      />
    </View>

    <Button title="Add Plant Picture" color="#074407ff" onPress={pickImage} />
    {photo && <Image source={{ uri: photo }} style={styles.image} />}

    <View style={{ height: 10 }} />
    <Button title="Save Plant" color="#074407ff" onPress={save} />
  </View>

  </ScrollView>

);
}
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#d1f8d1ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#074407ff',
  },
  formGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#074407ff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  picker: {
    borderWidth: 1,
    padding: 7,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 12,
    borderRadius: 8,
  },
  scrollView: {
    backgroundColor: '#d1f8d1ff',
  }
});