import { Button, TextInput, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { db } from '../../firebase';
import { auth } from '../../firebase';
import uuid from 'react-native-uuid';
import { COLORS, FONTS, SIZES, icons} from '../../constants';

export default function AddBookScreen() {
  const email = auth.currentUser?.email;
  const navigation = useNavigation();

  // const [title, setTitle] = useState('')
  // const [price, setPrice] = useState('')
  // const [author, setAuthor] = useState('')
  // const [publisher, setPublisher] = useState("")
  // const [language, setLanguage] = useState("")
  // const [pages, setPages] = useState('')
  // const [isbn, setIsbn] = useState('')
  // const [description, setDescription] = useState("")
  // const [uri, setUri] = useState("")

  const [title, setTitle] = useState('Hell’s Paradise Jigokuraku, Vol. 1')
  const [price, setPrice] = useState('€14,99')
  const [author, setAuthor] = useState('Kaku, Juji')
  const [publisher, setPublisher] = useState("VIZ")
  const [language, setLanguage] = useState("English")
  const [pages, setPages] = useState('208')
  const [isbn, setIsbn] = useState('9781974713202')
  const [description, setDescription] = useState("Hell’s Paradise Jigokuraku – Gabimaru the Hollow is one of the most brutal assassins to ever come out of the ninja village of Iwagakure. He is ruthlessly efficient, but is sentenced to death for treason. He has only one hope - to earn his freedom, he must travel to a long-hidden island and recover the elixir that will make the shogun immortal. Failure is not an option. On this island, heaven and hell are just a hair's breadth away.")
  const [uri, setUri] = useState("https://www.fujidream.lt/wp-content/uploads/2022/05/81keV50g-yL-768x1102.jpg")

  const writeData = () => {
    const id = uuid.v4()
    db
    .ref('manga/' + id)
    .set({
      title: title,
      price: price,
      author: author,
      publisher: publisher,
      language: language,
      pages: pages,
      isbn: isbn,
      description: description,
      postEmail: email,
      uri: uri
    })
    .then(() => {
      console.log("Document written with ID: ", id);
      alert("Book Added")
      setTitle("")
      setPrice("")
      setAuthor("")
      setPublisher("")
      setLanguage("")
      setPages("")
      setIsbn("")
      setDescription("")
      setUri("")
      navigation.replace("Home")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  function renderNavBar() {
    return (
      <View style={{ flexDirection: 'row', paddingHorizontal: 12, height: 80, alignItems: 'flex-end' }}>
        <TouchableOpacity
          style={{ marginLeft: 18 }}
          onPress={() => navigation.replace("Home")}
        >
          <Image
            source={icons.back_icon}
            resizeMode="contain"
            style={{ width: 25, height: 25, tintColor: '#E0DACC' }}
          />
        </TouchableOpacity>
        <Text style={{ ...FONTS.h3, color: COLORS.white, marginLeft: 100 }}>Add Book</Text>
      </View>
    )
  }

  function renderTopBlock() {
    return (
      <View style={{ flexDirection: 'row', padding: 24, alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ marginRight: 10 }}>
          {/* Title  */}
          <TextInput
            style={{ backgroundColor: '#E0DACC', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10, marginTop: 5, width: 200 }}
            placeholder='Enter Title here'
            placeholderTextColor={'#808080'}
            value={title}
            onChangeText={text =>setTitle(text)}
          />
          {/* Author */}
          <TextInput
            style={{ backgroundColor: '#E0DACC', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10, marginTop: 5, }}
            placeholder='Enter Author here'
            placeholderTextColor={'#808080'}
            value={author}
            onChangeText={text =>setAuthor(text)}
          />
          {/* Language  */}
          <TextInput
            style={{ backgroundColor: '#E0DACC', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10, marginTop: 5, }}
            placeholder='Enter Language here'
            placeholderTextColor={'#808080'}
            value={language}
            onChangeText={text => setLanguage(text)}
          />
          {/* Price  */}
          <TextInput
            style={{ backgroundColor: '#E0DACC', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10, marginTop: 5 }}
            placeholder='Enter Price here'
            placeholderTextColor={'#808080'}
            value={price}
            onChangeText={text => setPrice(text)}
          />
          {/* Pages  */}
          <TextInput
            style={{ backgroundColor: '#E0DACC', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10, marginTop: 5, }}
            placeholder='Enter Pages here'
            placeholderTextColor={'#808080'}
            value={pages}
            onChangeText={text => setPages(text)}
          />
        </View>
        <TouchableOpacity style={{}}>
          <Image
            source={{ uri: uri == '' ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2D4asDbDXWzTnoqacip37NbQgwMAJQ2YkrmkKayU2IRWyEgba2EpenRXPsB6TV-8fI4M&usqp=CAU' : uri }}
            resizeMode='contain'
            style={{ flex: 1, width: 150, height: 230 }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  function renderBottomBlock() {
    return (
      <View style={{ padding: 24, marginTop: -35 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
        </View>
        {/* isbn */}
        <TextInput
          style={{ backgroundColor: '#E0DACC', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10, marginTop: 5, }}
          placeholder='Enter ISBN here'
          placeholderTextColor={'#808080'}
          value={isbn}
          onChangeText={text => setIsbn(text)}
        />
        {/* Publisher  */}
        <TextInput
          style={{ backgroundColor: '#E0DACC', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10, marginTop: 5, }}
          placeholder='Enter Publisher here'
          placeholderTextColor={'#808080'}
          value={publisher}
          onChangeText={text =>setPublisher(text)}
        />
        {/* URI  */}
        <TextInput
          style={{ backgroundColor: '#E0DACC', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10, marginTop: 5, }}
          placeholder='Enter URI here'
          placeholderTextColor={'#808080'}
          value={uri}
          onChangeText={text => setUri(text)}
        />
        {/* Description */}
        <TextInput
          style={{ backgroundColor: '#E0DACC', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10, marginTop: 5 }}
          placeholder='Enter Description here'
          placeholderTextColor={'#808080'}
          value={description}
          onChangeText={text => setDescription(text)}
        />
        {/* Buttons  */}
        <TouchableOpacity
          style={{ backgroundColor: "#F96D41", padding: 14, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}
          onPress={() => writeData()}
        >
          <Text style={{ ...FONTS.h3, color: COLORS.white }}>ADD Book</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1B26', marginTop: 0 }}>
      {/* NavBar  */}
      <View style={{ flex: 1 }}>
        {renderNavBar()}
        {/* InputFiels  */}
        {renderTopBlock()}
        {renderBottomBlock()}
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({})