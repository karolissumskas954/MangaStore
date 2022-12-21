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
  StatusBar
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { useNavigation } from '@react-navigation/core';
import { db } from '../../firebase';
import { COLORS, FONTS, SIZES, icons} from '../../constants';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage"]); // Ignore log notification by message
LogBox.ignoreLogs(["VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead."]); // Ignore log notification by message
//LogBox.ignoreLogs(['fontFamily "Roboto-Regular" is not a system font and has not been loaded through Font.loadAsync.']);
//LogBox.ignoreLogs(['fontFamily "Roboto-Bold" is not a system font and has not been loaded through Font.loadAsync.'])
import { useFonts } from 'expo-font';

const HomeScreen = () => {

  const [loaded] = useFonts({
    Roboto_Regular: require('../../assets/fonts/Roboto-Regular.ttf'),
    Roboto_Bold: require('../../assets/fonts/Roboto-Bold.ttf'),
  });

  // if (!loaded){
  //   return null;
  // }



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
    var query = db.ref("manga").orderByKey();
    query.once("value")
      .then(function (snapshot) {
        const items = []
        snapshot.forEach(function (childSnapshot) {
          var key = childSnapshot.key;
          //console.log(key)
          const { title, uri, author, description, language, pages, postEmail, price, publisher, isbn } = childSnapshot.val()
          items.push({
            id: key,
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
        });
        setBlogs(items)
        //console.log(items.id)
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
      <View style={{
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: SIZES.padding,
        alignItems: 'center'
      }}>
        {/* Greetings */}
        <View style={{ flex: 1 }}>
          <View style={{ marginRight: SIZES.padding }}> 
            <Text style={{ fontFamily: 'Roboto_Regular', fontSize: 22,color: COLORS.white }}>Good Morning</Text>
            <Text style={{ fontFamily: 'Roboto_Bold', fontSize: 22, color: COLORS.white }}>{profile}</Text>
          </View>
        </View>
        {/* Log out */}
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            height: 40,
            paddingLeft: 3,
            paddingRight: SIZES.radius,
            borderRadius: 20
          }}
          onPress={handleSignOut}
        >
          <View
            style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
          >
            <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 25, backgroundColor: COLORS.tone }}>
              <Image
                source={icons.logout_icon}
                resizeMode="contain"
                style={{ width: 20, height: 20, marginLeft: 5, tintColor: COLORS.white}}
              />
            </View>
            <Text style={{ marginLeft: SIZES.base, color: COLORS.black, fontFamily: 'Roboto_Regular', fontSize: 16, }}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  const LineDivider = () => {
    return (
      <View style={{ width: 1, paddingVertical: 18, }}>
        <View style={{ flex: 1, borderLeftColor: COLORS.tone, borderLeftWidth: 1 }}>
        </View>
      </View>
    )
  }

  function renderButtonSection() {
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', padding: SIZES.padding }}
      >
        <StatusBar barStyle="light-content" />
        <View style={{ flexDirection: 'row', height: 70, backgroundColor: COLORS.primary, borderRadius: SIZES.radius }}>
          {/* Add book */}
          <TouchableOpacity
          testID='addButton'
            style={{ flex: 1 }}
            onPress={() => navigation.navigate("Add")}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={icons.add_icon}
                resizeMode="contain"
                style={{ width: 25, height: 25, tintColor: COLORS.black }}
              />
              <Text style={{fontFamily: 'Roboto_Regular', fontSize: 14, color: COLORS.black }}>  Add book</Text>
            </View>
          </TouchableOpacity>
          {/* Line Divider */}
          <LineDivider />
          {/* all books */}
          <TouchableOpacity
          testID='allBooksButton'
            style={{ flex: 1 }}
            onPress={() => navigation.replace("More")}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={icons.book_icon}
                resizeMode="contain"
                style={{ width: 25, height: 25 ,tintColor: COLORS.black}}
              />
              <Text style={{ fontFamily: 'Roboto_Regular', fontSize: 14, color: COLORS.black }}>  All Books</Text>
            </View>
          </TouchableOpacity>
          {/* Line Divider */}
          <LineDivider />
          {/* Scanner */}
          <TouchableOpacity
          testID='scanButton'
            style={{ flex: 1 }}
            onPress={() =>  navigation.navigate("Scan")}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={icons.scan_icon}
                resizeMode="contain"
                style={{ width: 30, height: 30, tintColor: COLORS.black }}
              />
              <Text style={{ fontFamily: 'Roboto_Regular', fontSize: 14, color: COLORS.black }}> Scan book</Text>
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
          <Text style={{ fontFamily: 'Roboto_Bold', fontSize: 22, color: COLORS.white }}>My Books</Text>
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
                  testID='editButton'
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
                  <Text style={{ ...FONTS.h2, color: COLORS.white }}>{item.categoryName}</Text>
                }
                {
                  selectedCategory != item.id &&
                  <Text style={{ ...FONTS.h2, color: COLORS.lightGray }}>{item.categoryName}</Text>
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
              testID='bookButton'
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
                    <Text style={{ paddingRight: SIZES.padding, ...FONTS.h2, color: COLORS.white }}>{item.title}</Text>
                    <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>{item.author}</Text>
                  </View>
                  {/* Book Info  */}
                  <View style={{ flexDirection: 'row', marginTop: 12 }}>
                    <Image
                      source={icons.page_icon}
                      resizeMode="contain"
                      style={{ width: 20, height: 20, tintColor: "#64676D" }}
                    />
                    <Text style={{ ...FONTS.body4, color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>
                      {item.pages}
                    </Text>
                  </View>
                  {/* Data  */}
                  <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkGreen, height: 40, borderRadius: SIZES.radius }}>
                      <Text style={{ ...FONTS.body3, color: COLORS.lightGreen }}>
                        {item.price}
                      </Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkRed, height: 40, borderRadius: SIZES.radius }}>
                      <Text style={{ ...FONTS.body3, color: COLORS.lightRed }}>
                        {item.language}
                      </Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkBlue, height: 40, borderRadius: SIZES.radius }}>
                      <Text style={{ ...FONTS.body3, color: COLORS.lightBlue }}>
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
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
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
          <View style={{ padding: 8, marginLeft: 12 }}>
            <TouchableOpacity
            testID='moreButton'
              onPress={() => navigation.replace("More")}
            >
              <Text style={{ ...FONTS.body3, color: COLORS.lightGray, alignSelf: 'flex-start', textDecorationLine: 'underline' }}> More Books</Text>
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