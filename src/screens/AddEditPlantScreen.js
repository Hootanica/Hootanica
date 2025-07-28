import React, { useState, useContext, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  Image, 
  Text, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import PlantContext from '../context/PlantContext';
import { Picker } from '@react-native-picker/picker';
import { commonStyles } from '../styles/commonStyles';

const wateringFrequencyOptions = [];

for (let i = 1; i <= 30; i++){
  wateringFrequencyOptions.push(i)
}

export default function AddEditPlantScreen({ navigation, route }) {
  const { addPlant, editPlant, plants } = useContext(PlantContext);
  const insets = useSafeAreaInsets();
  
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [photo, setPhoto] = useState(null);
  const [dateCreated, setDateCreated] = useState(new Date().toISOString().split('T')[0]);
  const [wateringFrequency, setWateringFrequency] = useState(1);
  const [fertReq, setFertilizerRequirements] = useState('');
  const [soilReq, setSoilRequirements] = useState('');
  const [sunReq, setSunRequirements] = useState('');
  const [disHist, setDisHist] = useState('');
  const [disease, setDisease] = useState('');
  const [treatment, setTreatment] = useState('');

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
    <SafeAreaView style={commonStyles.container}>
      <StatusBar hidden={false} backgroundColor="white" barStyle="dark-content" />
      
      {/* Scrollable form section */}
      <View style={commonStyles.scrollSection}>
        <ScrollView 
          contentContainerStyle={commonStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>
            {editingId ? 'Edit Plant' : 'Add Plant'}
          </Text>

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
            <View style={styles.pickerContainer}>
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

          {photo && <Image source={{ uri: photo }} style={styles.image} />}
        </ScrollView>
      </View>

      <View style={[commonStyles.buttonContainer, { paddingBottom: insets.bottom }]}>
        <TouchableOpacity
          style={commonStyles.secondaryButton}
          onPress={pickImage}
        >
          <Text style={commonStyles.secondaryButtonText}>Add Plant Picture</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={commonStyles.primaryButton}
          onPress={save}
        >
          <Text style={commonStyles.buttonText}>Save Plant</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    color: '#6b9c4b', // leaf green for continuity
    letterSpacing: 0.5,
  },
  formGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 6,
    color: '#8ebf66', // sprout green for gentle contrast
    paddingLeft: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d97a8d', // petal pink border
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    fontSize: 15,
    color: '#2D3436', // neutral readable base
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#d97a8d', // match pink accents
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginTop: 4,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#2D3436',
  },
  image: {
    width: 160,
    height: 160,
    marginVertical: 20,
    borderRadius: 16,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#6b9c4b', // leafy framing
  },
});