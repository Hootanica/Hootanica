import React, { useEffect, useState, useRef } from 'react';
import { View, Image, StyleSheet, StatusBar, Dimensions, Animated } from 'react-native';

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
  const animatedValues = useRef(
    flowerFrames.map((_, index) => new Animated.Value(index === 0 ? 1 : 0))
  ).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        const nextFrame = prev + 1;
        
        if (nextFrame < flowerFrames.length) {
          Animated.timing(animatedValues[nextFrame], {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }).start();
          
          return nextFrame;
        } else {
          clearInterval(interval);
          
          setTimeout(() => {
            navigation.replace('Home');
          }, 500);
          return prev;
        }
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.imageContainer}>
        {flowerFrames.map((frame, index) => (
          <Animated.Image
            key={index}
            source={frame}
            style={[
              styles.image,
              {
                width: imageSize,
                height: imageSize,
                opacity: animatedValues[index],
                position: 'absolute',
              }
            ]}
            resizeMode="contain"
          />
        ))}
      </View>
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
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});