import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddBookScreen from './src/screens/AddBookScreen';
import BookScreen from './src/screens/BookScreen';
import MoreBooks from './src/screens/MoreBooks';
import EditBook from './src/screens/EditBookScreen';
import Scanner from './src/screens/Scanner'
import ScannedBookScreen from './src/screens/ScannedBookScreen';


const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
      ...DefaultTheme.colors,
      border: "transparent"
  }
}


export default function App() {
  return (
    <NavigationContainer theme={theme}>
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
