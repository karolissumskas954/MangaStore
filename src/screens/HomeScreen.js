import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
  FlatList,
  Item,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { useNavigation } from '@react-navigation/core';
import { db } from '../../firebase';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage"]); // Ignore log notification by message

const HomeScreen = () => {
  const [blogs, setBlogs] = useState([])

  const fetchBlogs = async () => {
    db.collection("manga")
      .get()
      .then((querySnapshot) => {
        const items = []
        querySnapshot.forEach((doc) => {
          const { title, uri } = doc.data()
            items.push({
              id: doc.id,
              title,
              uri
            })
        })
        setBlogs(items)
      })
  }
  useEffect(() => {
    fetchBlogs();
  }, [])






  const email = auth.currentUser?.email;
  const navigation = useNavigation()

  const writeData = () => {
    db.collection("manga").add({
      title: "Death note black edition, Vol. 4",
      price: "€19,99",
      author: "Tsugumi Ohba",
      publisher: "VIZ",
      language: "English",
      pages: 416,
      isbn: 9781421539676,
      description: "Light Yagami is an excellent student with great prospects, but he is bored. Everything changes when he finds the Death Note, a notebook dropped by the cruel Shinigami God of Death. Everyone whose name is written in the notebook dies, and now Light has vowed to use the power of the death note to rid the world of evil. But when the number of murders rises sharply, the authorities send the legendary detective L. to find the killer. With hot-headed detective L., will Light forget his noble purpose...and his life?",
      postEmail: email,
      uri: 'https://www.fujidream.lt/wp-content/uploads/2021/08/81O8gD-RkcL-600x877.jpg'

    })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

  }

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch((error) => alert(error.message));
  }


  return (
    <>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>

        <Text> Email: {email}</Text>
        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.button}
        >
          <Text style={styles.buttontext}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Button
          title='Add data'
          onPress={writeData}
        >
        </Button>

      <ScrollView horizontal={true} style={{width:"100%"}}>
        <FlatList
          data={blogs}
          renderItem={({ item }) => (
            <Image
              style={styles.image}
              source={{ uri: item.uri }}
            />
          

          )} />
          </ScrollView>
      </View>
      </ScrollView>
    </>


  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  image: {
    marginTop: 10,
    width: 200,
    height: 300,
  },

})