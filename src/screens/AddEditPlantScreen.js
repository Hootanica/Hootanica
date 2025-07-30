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
  StatusBar,
  Modal,
  FlatList,
  Animated,
  Platform
} from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import PlantContext from '../context/PlantContext';
import { Picker } from '@react-native-picker/picker';
import { commonStyles } from '../styles/commonStyles';
import NavBar from '../components/NavBar';
import { Ionicons } from '@expo/vector-icons';

const wateringFrequencyOptions = [];

for (let i = 1; i <= 30; i++){
  wateringFrequencyOptions.push(i)
}

const plantEmojis = ['🌱', '🌿', '🌵', '🌺', '🌻', '🌹', '🌷', '🌸', '🌼', '☘️', '🍀'];

export default function AddEditPlantScreen({ navigation, route }) {
  const { addPlant, editPlant, plants } = useContext(PlantContext);
  const insets = useSafeAreaInsets();
  
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [photo, setPhoto] = useState(null);
  const [dateCreated, setDateCreated] = useState(new Date().toISOString().split('T')[0]);
  const [wateringFrequency, setWateringFrequency] = useState('1');
  const [fertReq, setFertilizerRequirements] = useState('');
  const [soilReq, setSoilRequirements] = useState('');
  const [sunReq, setSunRequirements] = useState('');
  const [disHist, setDisHist] = useState('');
  const [disease, setDisease] = useState('');
  const [treatment, setTreatment] = useState('');
  const [errors, setErrors] = useState({});
  const [plantEmoji, setPlantEmoji] = useState('🌱');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const slideAnim = useState(new Animated.Value(300))[0];
  const fadeAnim = useState(new Animated.Value(0))[0];

  const editingId = route.params?.id;

  useEffect(() => {
    if (editingId) {
      const plant = plants.find(p => p.id === editingId);
      if (plant) {
        setName(plant.name);
        setType(plant.type);
        setPhoto(plant.photo);
        setDateCreated(plant.dateCreated);
        setWateringFrequency(plant.wateringFrequency.toString());
        setFertilizerRequirements(plant.fertReq);
        setSoilRequirements(plant.soilReq);
        setSunRequirements(plant.sunReq);
        setDisHist(plant.disHist);
        setDisease(plant.disease);
        setTreatment(plant.treatment);
        setPlantEmoji(plant.plantEmoji || '🌱');
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

  const deleteImage = () => {
    setPhoto(null);
  };

  const openEmojiPicker = () => {
    setShowEmojiPicker(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeEmojiPicker = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowEmojiPicker(false);
    });
  };

  const selectEmoji = (emoji) => {
    setPlantEmoji(emoji);
    closeEmojiPicker();
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!type.trim()) {
      newErrors.type = 'Type is required';
    }
    
    if (!dateCreated.trim()) {
      newErrors.dateCreated = 'Date is required';
    }
    
    const freq = parseInt(wateringFrequency);
    if (!wateringFrequency.trim() || isNaN(freq) || freq < 1) {
      newErrors.wateringFrequency = 'Watering frequency must be a number ≥ 1';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleWateringFrequencyChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setWateringFrequency(numericText);
    
    if (errors.wateringFrequency) {
      setErrors(prev => ({ ...prev, wateringFrequency: null }));
    }
  };

  const save = () => {
    if (!validateForm()) {
      return;
    }
    
    const plant = {
      id: editingId || Date.now(),
      name: name.trim(),
      type: type.trim(),
      photo,
      dateCreated: dateCreated.trim(),
      wateringFrequency: parseInt(wateringFrequency),
      fertReq,
      soilReq,
      sunReq,
      disHist,
      disease,
      treatment,
      plantEmoji: plantEmoji,
    };
    if (editingId) editPlant(plant);
    else addPlant(plant);
    navigation.goBack();
  };

  const renderEmojiItem = ({ item }) => (
    <TouchableOpacity
      style={styles.emojiItem}
      onPress={() => selectEmoji(item)}
    >
      <Text style={styles.emojiItemText}>{item}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (Platform.OS === 'android') {
        NavigationBar.setVisibilityAsync('hidden');
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar hidden={false} backgroundColor="white" barStyle="dark-content" />
      
      {/* Emoji Picker Modal */}
      <Modal
        visible={showEmojiPicker}
        transparent={true}
        animationType="none"
        onRequestClose={closeEmojiPicker}
      >
        <Animated.View 
          style={[
            styles.modalOverlay,
            { opacity: fadeAnim }
          ]}
        >
          <TouchableOpacity 
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={closeEmojiPicker}
          />
          <Animated.View 
            style={[
              styles.emojiPickerContainer,
              { transform: [{ translateY: slideAnim }] }
            ]}
          >
            <View style={styles.emojiPickerHeader}>
              <Text style={styles.emojiPickerTitle}>Choose Plant Emoji</Text>
              <TouchableOpacity 
                onPress={closeEmojiPicker}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={plantEmojis}
              renderItem={renderEmojiItem}
              numColumns={4}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.emojiGrid}
            />
          </Animated.View>
        </Animated.View>
      </Modal>
      
      {/* Scrollable form section */}
      <View style={commonStyles.scrollSection}>
        <ScrollView 
          contentContainerStyle={commonStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>
            {editingId ? 'Edit Plant' : 'Add Plant'}
          </Text>

          {/* Show emoji placeholder when no photo */}
          {!photo && (
            <TouchableOpacity 
              style={styles.emojiPlaceholder}
              onPress={openEmojiPicker}
            >
              <Text style={styles.emojiText}>{plantEmoji}</Text>
            </TouchableOpacity>
          )}

          {/* Show photo with delete button when photo exists */}
          {photo && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: photo }} style={styles.image} />
              <TouchableOpacity 
                style={styles.deleteImageButton} 
                onPress={deleteImage}
              >
                <Ionicons name="close" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.formGroup}>
            <Text style={styles.label}>Name: <Text style={styles.required}>*</Text></Text>
            <TextInput 
              placeholder="Enter plant name" 
              value={name} 
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors(prev => ({ ...prev, name: null }));
              }}
              style={[styles.input, errors.name && styles.inputError]} 
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Type: <Text style={styles.required}>*</Text></Text>
            <TextInput 
              placeholder="Enter plant type" 
              value={type} 
              onChangeText={(text) => {
                setType(text);
                if (errors.type) setErrors(prev => ({ ...prev, type: null }));
              }}
              style={[styles.input, errors.type && styles.inputError]} 
            />
            {errors.type && <Text style={styles.errorText}>{errors.type}</Text>}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Starting Date: <Text style={styles.required}>*</Text></Text>
            <TextInput 
              placeholder="YYYY-MM-DD" 
              value={dateCreated} 
              onChangeText={(text) => {
                setDateCreated(text);
                if (errors.dateCreated) setErrors(prev => ({ ...prev, dateCreated: null }));
              }}
              style={[styles.input, errors.dateCreated && styles.inputError]} 
            />
            {errors.dateCreated && <Text style={styles.errorText}>{errors.dateCreated}</Text>}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Watering Frequency (days): <Text style={styles.required}>*</Text></Text>
            <TextInput 
              placeholder="Enter number of days (1 or greater)" 
              value={wateringFrequency} 
              onChangeText={handleWateringFrequencyChange}
              keyboardType="numeric"
              style={[styles.input, errors.wateringFrequency && styles.inputError]} 
            />
            {errors.wateringFrequency && <Text style={styles.errorText}>{errors.wateringFrequency}</Text>}
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
    <NavBar navigation={navigation}/>
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
    color: '#d97a8d', //'#8ebf66', // sprout green for gentle contrast
    paddingLeft: 4,
  },
  required: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray', //'#d97a8d', // petal pink border
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
  inputError: {
    borderColor: '#e74c3c',
    borderWidth: 2,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 4,
    paddingLeft: 4,
  },
  emojiPlaceholder: {
    alignSelf: 'center',
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 160,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#6b9c4b',
    borderStyle: 'dashed',
    backgroundColor: '#f8fff4',
  },
  emojiText: {
    fontSize: 60,
    marginBottom: 8,
  },
  emojiLabel: {
    fontSize: 14,
    color: '#6b9c4b',
    fontWeight: '500',
    textAlign: 'center',
  },
  imageContainer: {
    position: 'relative',
    alignSelf: 'center',
    marginVertical: 20,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#6b9c4b', // leafy framing
  },
  deleteImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  emojiPickerContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: '100%',
    maxHeight: '70%',
  },
  emojiPickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  emojiPickerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b9c4b',
  },
  closeButton: {
    padding: 5,
  },
  emojiGrid: {
    alignItems: 'center',
  },
  emojiItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    borderRadius: 10,
    backgroundColor: '#f8fff4',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  emojiItemText: {
    fontSize: 32,
  },
});