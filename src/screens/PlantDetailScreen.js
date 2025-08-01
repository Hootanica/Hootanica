import React, { useContext, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  Platform, 
  ScrollView, 
  SafeAreaView, 
  StatusBar,
  Image 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import PlantContext from '../context/PlantContext';
import NavBar from '../components/NavBar';

export default function PlantDetailScreen({ route, navigation }) {
  const { plants, deletePlant } = useContext(PlantContext);
  const insets = useSafeAreaInsets();
  const plant = plants.find(p => p.id === route.params.id);

  useEffect(() => {
    if (!plant) {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate('Home');
      }
    }
  }, [plant]);

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

  const handleDelete = () => {
    const doDelete = () => {
      deletePlant(plant.id);
      navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home');
    };

    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to delete this plant?')) {
        doDelete();
      }
    } else {
      Alert.alert(
        'Delete Plant',
        'Are you sure you want to delete this plant?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: doDelete },
        ],
        { cancelable: true }
      );
    }
  };

  if (!plant) return null;

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar 
        hidden={false} 
        backgroundColor="white" 
        barStyle="dark-content"
        translucent={Platform.OS === 'android'}
      />
      
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingTop: Platform.OS === 'android' ? insets.top + 20 : 20 }
        ]}
      >
        <View style={styles.card}>
          {/* Plant image or emoji display */}
          {plant.photo ? (
            <Image source={{ uri: plant.photo }} style={styles.plantImage} />
          ) : plant.plantEmoji ? (
            <View style={styles.emojiContainer}>
              <Text style={styles.plantEmoji}>{plant.plantEmoji}</Text>
            </View>
          ) : null}

          <Text style={styles.title}>{plant.name}</Text>
          <Text style={styles.detail}>Type: <Text style={styles.detailValue}>{plant.type}</Text></Text>
          <Text style={styles.detail}>Starting Date: <Text style={styles.detailValue}>{plant.dateCreated}</Text></Text>
          <Text style={styles.detail}>Water every <Text style={styles.detailValue}>{plant.wateringFrequency} days</Text></Text>
          
          {plant.fertReq && (
            <Text style={styles.detail}>Fertilizer Requirements: <Text style={styles.detailValue}>{plant.fertReq}</Text></Text>
          )}
          {plant.soilReq && (
            <Text style={styles.detail}>Soil Requirements: <Text style={styles.detailValue}>{plant.soilReq}</Text></Text>
          )}
          {plant.sunReq && (
            <Text style={styles.detail}>Sunlight Requirements: <Text style={styles.detailValue}>{plant.sunReq}</Text></Text>
          )}
          {plant.disHist && (
            <Text style={styles.detail}>Disease History: <Text style={styles.detailValue}>{plant.disHist}</Text></Text>
          )}
          {plant.disease && (
            <Text style={styles.detail}>Possible Diseases: <Text style={styles.detailValue}>{plant.disease}</Text></Text>
          )}
          {plant.treatment && (
            <Text style={styles.detail}>Disease Treatments: <Text style={styles.detailValue}>{plant.treatment}</Text></Text>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonPrimary}
              onPress={() => navigation.navigate('AddEditPlant', { id: plant.id })}
            >
              <Text style={styles.buttonPrimaryText}>Edit Plant</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={handleDelete}
            >
              <Text style={styles.buttonSecondaryText}>Delete Plant</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Always at the bottom */}
      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF8F3', //'#fffdfc',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100, // leave room for nav bar
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#4A2511', //'#d97a8d',
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  plantImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
    alignSelf: 'center',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#4A2511', //'#6b9c4b',
  },
  emojiContainer: {
    alignSelf: 'center',
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#74b72e',
    borderStyle: 'dashed',
    backgroundColor: '#fff8f3', //'#f8fff4',
  },
  plantEmoji: {
    fontSize: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#74b72e', //'#6b9c4b',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  detail: {
    fontSize: 16,
    color: '#2E1503', //'#34495E',
    marginBottom: 10,
  },
  detailValue: {
    fontWeight: '600',
    color: '#4A3728', //'#2C3E50',
  },
  buttonContainer: {
    marginTop: 30,
  },
  buttonPrimary: {
    backgroundColor: '#ffffff', //'#d97a8d',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#4A2511',
  },
  buttonSecondary: {
    backgroundColor: '#ffffff', //'#8ebf66',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4A2511',
  },
  buttonPrimaryText: {
    color: '#74b72e', //'#028a0f',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonSecondaryText: {
    color: '#de3163', //'#e52b50',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
