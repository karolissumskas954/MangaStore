import { Button, TextInput, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import back_icon from './assets/img/back.png'
import { db } from '../../firebase';
import { auth } from '../../firebase';

export default function AddBookScreen() {
  const email = auth.currentUser?.email;
  const navigation = useNavigation();

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [author, setAuthor] = useState('')
  const [publisher, setPublisher] = useState("")
  const [language, setLanguage] = useState("")
  const [pages, setPages] = useState('')
  const [isbn, setIsbn] = useState('')
  const [description, setDescription] = useState("")
  const [uri, setUri] = useState("")

  // const [title, setTitle] = useState('Orochi The Perfect Edition, Vol. 1')
  // const [price, setPrice] = useState('€21,99')
  // const [author, setAuthor] = useState('Umezz, Kazuo')
  // const [publisher, setPublisher] = useState("VIZ")
  // const [language, setLanguage] = useState("English")
  // const [pages, setPages] = useState('320')
  // const [isbn, setIsbn] = useState('9781974725830')
  // const [description, setDescription] = useState("A mysterious young woman slips like a snake into the lives of unsuspecting people. Umezzo's classic horror manga begins with Sisters, where Orochi affects the lives of a brother and sister who couldn't be more alike… or more different. Next, in Bones, she helps a man come back to life after a terrible accident, but resurrection can be a deadly business…")
  // const [uri, setUri] = useState("https://www.fujidream.lt/wp-content/uploads/2022/06/orochi-the-perfect-edition-vol-1-600x861.jpg")

  const writeData = () => {
    db.collection("manga").add({
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
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
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
            source={back_icon}
            resizeMode="contain"
            style={{ width: 25, height: 25, tintColor: '#E0DACC' }}
          />
        </TouchableOpacity>
        <Text style={{ fontFamily: 'KohinoorBangla-Semibold', fontSize: 22, color: '#E0DACC', marginLeft: 100 }}>Add Book</Text>
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
          <Text style={{ fontFamily: 'KohinoorBangla-Semibold', fontSize: 16, color: '#E0DACC' }}>ADD Book</Text>
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