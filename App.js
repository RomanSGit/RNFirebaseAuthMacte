import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';

import * as firebase from 'firebase';
import { firebaseConfig } from './firebase.config';

firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Loading' screenOptions={{
        headerShown: false,
        gestureEnabled: false
      }}>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Loading' component={LoadingScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}