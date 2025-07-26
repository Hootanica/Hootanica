import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, StatusBar, Dimensions } from 'react-native';

const flowerFrames = [
  require('../../assets/Hootanica1.png'),
  require('../../assets/Hootanica2.png'),
  require('../../assets/Hootanica3.png'),
  require('../../assets/Hootanica4.png'),
  require('../../assets/Hootanica5.png'),
];

export default function StartingAnimationScreen({ navigation }) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const { width, height } = Dimensions.get('window');
  const imageSize = Math.min(width, height) * 0.8;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        if (prev < flowerFrames.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          
          // navigate to next screen after animation ends
          setTimeout(() => {
            navigation.replace('Home');
          }, 1000);
          return prev;
        }
      });
    }, 1000); // frame change every 1000ms

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Image
        source={flowerFrames[currentFrame]}
        style={[styles.image, { width: imageSize, height: imageSize }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});