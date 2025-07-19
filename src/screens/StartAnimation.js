import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const animationFrames = [];

export default function StartingAnimationScreen({ navigation }) {
  const [currentFrame, setCurrentFrame] = useState(0);

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
    }, 500); // frame change every 500ms

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={flowerFrames[currentFrame]}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaffea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
});