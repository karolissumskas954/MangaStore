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
  SafeAreaView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { useNavigation } from '@react-navigation/core';
import { db } from '../../firebase';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage"]); // Ignore log notification by message
LogBox.ignoreLogs(["VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead."]); // Ignore log notification by message
import claim_icon from './assets/img/claim_icon.png'
import logOutImg from './assets/img/logout.png'
import point_icon from './assets/img/point_icon.png'
import card_icon from './assets/img/card_icon.png'
import page_icon from './assets/img/page.png'

const HomeScreen = () => {
  const categoriesData = [
    {
      id: 0,
      categoryName: "Best Seller",
    },
    {
      id: 1,
      categoryName: "The Latest"
    },
    {
      id: 2,
      categoryName: "Coming Soon"
    },
  ];

  const [blogs, setBlogs] = useState([])

  const fetchBlogs = async () => {
    db.collection("manga")
      .get()
      .then((querySnapshot) => {
        const items = []
        querySnapshot.forEach((doc) => {
          const { title, uri, author, description, language, pages, postEmail, price, publisher, isbn } = doc.data()
          items.push({
            id: doc.id,
            title,
            uri,
            author,
            description,
            language,
            pages,
            price,
            postEmail,
            publisher,
            isbn
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


  const [categories, setCategory] = React.useState(categoriesData);
  const [selectedCategory, setSelectedCategory] = React.useState(0);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch((error) => alert(error.message));
  }

  function renderHeader(profile) {
    return (
      <View style={{ flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 24,
        alignItems: 'center'}}>
        {/* Greetings */}
        <View style={{ flex: 1 }}>
          <View>
            <Text style={{fontSize: 16,lineHeight: 22,color: '#E0DACC',fontFamily: 'KohinoorBangla-Regular'}}>Good Morning</Text>
            <Text style={{fontSize: 22,lineHeight: 25,color: '#E0DACC',fontFamily: 'KohinoorBangla-Semibold'}}>{profile}</Text>
          </View>
        </View>
        {/* Log out */}
        <TouchableOpacity
          style={{
            backgroundColor: '#F96D41',
            height: 40,
            paddingLeft: 3,
            paddingRight: 12,
            borderRadius: 20
          }}
          onPress={handleSignOut}
        >
          <View
            style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
          >
            <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 25, backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <Image
                source={logOutImg}
                resizeMode="contain"
                style={{ width: 20, height: 20, marginLeft: 5 }}
              />
            </View>
            <Text style={{ color: '#E0DACC', fontFamily: 'KohinoorBangla-Regular', marginLeft: 8 }}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  const LineDivider = () => {
    return (
      <View style={{ width: 1, paddingVertical: 18, }}>
        <View style={{ flex: 1, borderLeftColor: '#64676D', borderLeftWidth: 1 }}>
        </View>
      </View>
    )
  }

  function renderButtonSection() {
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', padding: 24 }}
      >
        <View style={{ flexDirection: 'row', height: 70, backgroundColor: '#25282F', borderRadius: 12 }}>
          {/* Add book */}
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => navigation.replace("Add")}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={claim_icon}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
              <Text style={{ merginLeft: 8, fontFamily: 'KohinoorBangla-Light', color: '#E0DACC' }}>Add book</Text>
            </View>
          </TouchableOpacity>
          {/* Line Divider */}
          <LineDivider />
          {/* Get points */}
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => navigation.replace("More")}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={point_icon}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
              <Text style={{ merginLeft: 8, fontFamily: 'KohinoorBangla-Light', color: '#E0DACC' }}>All Books</Text>
            </View>
          </TouchableOpacity>
          {/* Line Divider */}
          <LineDivider />
          {/* My card */}
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => console.log("My card")}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={card_icon}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
              <Text style={{ merginLeft: 8, fontFamily: 'KohinoorBangla-Light', color: '#E0DACC' }}>My card</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  function renderMyBookSection() {
    return (
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 22, fontFamily: 'KohinoorBangla-Semibold', color: "#E0DACC" }}>My Books</Text>
        </View>
        {/* Books */}
        <View style={{ flex: 1, marginTop: 24 }}>
          <FlatList
            data={blogs}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              if (email == item.postEmail) {
                return (
                  <TouchableOpacity
                    style={{ flex: 1, marginLeft: index == 0 ? 24 : 0, marginRight: 22 }}
                    onPress={() => navigation.navigate('Edit', item)}
                  >
                    <Image
                      source={{ uri: item.uri }}
                      resizeMode="cover"
                      style={{ width: 180, height: 250, borderRadius: 20 }} />
                  </TouchableOpacity>
                )
              }
            }}
          />
        </View>
      </View>
    )
  }

  function renderCategoryHeader() {
    return (
      <View style={{ flex: 1, paddingLeft: 24 }}>
        <ScrollView horizontal={true} style={{ width: "100%" }}>
          <FlatList
            data={categoriesData}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{ flex: 1, marginRight: 24 }}
                onPress={() => setSelectedCategory(item.id)}
              >
                {
                  selectedCategory == item.id &&
                  <Text style={{ color: '#E0DACC', fontFamily: 'KohinoorBangla-Regular' }}>{item.categoryName}</Text>
                }
                {
                  selectedCategory != item.id &&
                  <Text style={{ color: '#64676D', fontFamily: 'KohinoorBangla-Regular' }}>{item.categoryName}</Text>
                }
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </View>
    )
  }

  function renderCategoryData() {
    var start = 0
    var end = 4
    if (selectedCategory == 0) {
      start = 0
      end = 4
    } else if (selectedCategory == 1) {
      start = 4
      end = 7

    } else if (selectedCategory == 2) {
      start = 7
      end = 8
    }
    return (
      <View style={{ flex: 1, marginTop: 12, paddingLeft: 24 }}>
        <FlatList
          data={blogs.slice(start, end)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
              <View style={{ marginVertical: 8 }}>
                <TouchableOpacity
                  style={{ flex: 1, flexDirection: 'row' }}
                  onPress={() => navigation.navigate("Book", item)}
                >
                  {/* Book cover  */}
                  <Image
                    source={{ uri: item.uri }}
                    resizeMode='cover'
                    style={{ width: 100, height: 150, borderRadius: 10 }}
                  />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    {/* Book name and author  */}
                    <View>
                      <Text style={{ paddingRight: 24, color: '#E0DACC', fontFamily: 'KohinoorBangla-Semibold' }}>{item.title}</Text>
                      <Text style={{ fontFamily: 'KohinoorBangla-Regular', color: '#64676D' }}>{item.author}</Text>
                    </View>
                    {/* Book Info  */}
                    <View style={{ flexDirection: 'row', marginTop: 12 }}>
                      <Image
                        source={page_icon}
                        resizeMode="contain"
                        style={{ width: 20, height: 20, tintColor: "#64676D" }}
                      />
                      <Text style={{ color: '#64676D', fontFamily: 'KohinoorBangla-Regular', paddingHorizontal: 12 }}>
                        {item.pages}
                      </Text>
                    </View>
                    {/* Data  */}
                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                      <View style={{ justifyContent: 'center', alignItems: 'center', padding: 8, marginRight: 8, backgroundColor: "#213432", height: 40, borderRadius: 12 }}>
                        <Text style={{ fontFamily: 'KohinoorBangla-Regular', color: "#31Ad66" }}>
                          {item.price}
                        </Text>
                      </View>
                      <View style={{ justifyContent: 'center', alignItems: 'center', padding: 8, marginRight: 8, backgroundColor: "#31262F", height: 40, borderRadius: 12 }}>
                        <Text style={{ fontFamily: 'KohinoorBangla-Regular', color: "#C5505E" }}>
                          {item.language}
                        </Text>
                      </View>
                      <View style={{ justifyContent: 'center', alignItems: 'center', padding: 8, marginRight: 8, backgroundColor: "#22273B", height: 40, borderRadius: 12 }}>
                        <Text style={{ fontFamily: 'KohinoorBangla-Regular', color: "#424BAF" }}>
                          {item.publisher}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
          )}
        />
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1B26' }}>
      <View style={{ height: 200 }}>
        {renderHeader(email)}
        {renderButtonSection()}
      </View>
      {/* Body section */}
      <ScrollView style={{ margintop: 12 }}>
        {/* My Books section */}
        <View>
          {renderMyBookSection()}
        </View>
        {/* Category section */}
        <View style={{ marginTop: 24 }}>
          <View>
            {renderCategoryHeader()}
          </View>
          <View>
            {renderCategoryData()}
          </View>
          <View style={{padding: 8, marginLeft: 12}}>
            <TouchableOpacity
            onPress={() => navigation.replace("More")}
            >
            <Text style={{color:'#E0DACC', textDecorationLine: 'underline', fontSize: 16, fontFamily: 'KohinoorBangla-Semibold' }}> More Books</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
})