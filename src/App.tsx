import React from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PlayButtonScreen from './play-button/Container';
import HomeScreen from './Home';

export type StackParamList = {
  Home: undefined;
  PlayButton: undefined;
};

const Stack = createStackNavigator<StackParamList>();

export default () => {
  return (
    <NavigationNativeContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ title: 'Gesture Animation Playground' }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="PlayButton"
          options={{ title: 'Play Button' }}
          component={PlayButtonScreen}
        />
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
};
