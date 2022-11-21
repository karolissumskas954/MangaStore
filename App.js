import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddBookScreen from './src/screens/AddBookScreen';
import BookScreen from './src/screens/BookScreen';
import MoreBooks from './src/screens/MoreBooks';
import EditBook from './src/screens/EditBookScreen';
import Scanner from './src/screens/Scanner'
import ScannedBookScreen from './src/screens/ScannedBookScreen';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add" component={AddBookScreen} />
        <Stack.Screen name="Book" component={BookScreen} />
        <Stack.Screen name="More" component={MoreBooks} />
        <Stack.Screen name="Edit" component={EditBook} />
        <Stack.Screen name="Scan" component={Scanner} />
        <Stack.Screen name="ScannedBook" component={ScannedBookScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
