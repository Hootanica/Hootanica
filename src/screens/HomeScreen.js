import React, { useContext } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PlantContext from '../context/PlantContext';
import PlantCard from '../components/PlantCard';
import { commonStyles } from '../styles/commonStyles';
import NavBar from '../components/NavBar';


export default function HomeScreen({ navigation }) {
  const { plants } = useContext(PlantContext);
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar 
        hidden={false} 
        backgroundColor="white" 
        barStyle="dark-content"
        translucent={Platform.OS === 'android'}
      />
      
      <View style={[
        commonStyles.scrollSection,
        { paddingTop: Platform.OS === 'android' ? insets.top + 16 : 16 }
      ]}>
        <FlatList
          data={plants}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PlantCard
              plant={item}
              onPress={() => navigation.navigate('PlantDetail', { id: item.id })}
            />
          )}
          contentContainerStyle={[
            commonStyles.scrollContainer,
            plants.length === 0 && styles.emptyContainer,
          ]}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No plants yet. Add your first one!</Text>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={[commonStyles.buttonContainer, { paddingBottom: insets.bottom }]}>
        <TouchableOpacity
          style={commonStyles.primaryButton}
          onPress={() => navigation.navigate('AddEditPlant')}
        >
          <Text style={commonStyles.buttonText}>Add Plant</Text>
        </TouchableOpacity>
      </View>
      <NavBar navigation={navigation}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 32,
    color: '#d97a8d',
    textAlign: 'center',
  },
});
