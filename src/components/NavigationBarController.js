import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
import * as NavigationBar from 'expo-navigation-bar';
import { View, Dimensions } from 'react-native';

export default function NavigationBarController({ children }) {
  const [navBarVisible, setNavBarVisible] = useState(false);
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
    }
  }, []);

  const onGestureEvent = (event) => {
    const { translationY, absoluteY } = event.nativeEvent;
    if (absoluteY > screenHeight - 50 && translationY < -30) {
      if (!navBarVisible) {
        setNavBarVisible(true);
        if (Platform.OS === 'android') {
          NavigationBar.setVisibilityAsync('visible');
          setTimeout(() => {
            setNavBarVisible(false);
            NavigationBar.setVisibilityAsync('hidden');
          }, 3000);
        }
      }
    }
  };

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      // Gesture ended
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <View style={{ flex: 1 }}>
          {children}
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}
