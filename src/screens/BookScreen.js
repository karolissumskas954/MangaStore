import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Animated } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db } from '../../firebase';

import back_icon from './assets/img/back.png'
import bookmark_icon from './assets/img/bookmark_icon.png'

const BookScreen = ({ route, navigation }) => {
  const { id,
    title,
    uri,
    author,
    description,
    language,
    pages,
    price,
    postEmail,
    publisher } = route.params

  const [blogs, setBlogs] = useState([])
  const fetchBlogs = async () => {
    db.collection("manga")
      .get()
      .then((querySnapshot) => {
        const items = []
        querySnapshot.forEach((doc) => {
          const { title, uri, author, description, language, pages, postEmail, price, publisher } = doc.data()
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
            publisher
          })
        })
        setBlogs(items)
      })
  }
  useEffect(() => {
    fetchBlogs();
  }, [])



  const LineDivider = () => {
    return (
      <View style={{ width: 1, paddingVertical: 5, }}>
        <View style={{ flex: 1, borderLeftColor: '#DCDCDC', borderLeftWidth: 1 }}>
        </View>
      </View>
    )
  }
  const [scrollViewWholeHeight, setscrollViewWholeHeight ] = React.useState(1);
  const [scrollViewVisibleHeight, setscrollViewVisibleHeight ] = React.useState(0);
  const indicator = new Animated.Value(0);

  function renderBookInfoSection() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: uri }}
          resizeMode='cover'
          style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
        />
        {/* Color overlay */}
        <View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: "#1E1B26", opacity: 0.8 }}>
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 12, height: 80, alignItems: 'flex-end' }}>
          <TouchableOpacity
            style={{ marginLeft: 8, }}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={back_icon}
              resizeMode="contain"
              style={{ width: 25, height: 25, tintColor: '#E0DACC' }}
            />
          </TouchableOpacity>
        </View>
        {/* Book cover  */}
        <View style={{ flex: 5, paddingTop: 36, alignItems: 'center' }}>
          <Image
            source={{ uri: uri }}
            resizeMode='contain'
            style={{ flex: 1, width: 150, height: 'auto' }}
          />
        </View>
        {/* Book name and author*/}
        <View style={{ flex: 1.8, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: 'KohinoorBangla-Semibold', fontSize: 22, color: '#E0DACC' }}> {title}</Text>
          <Text style={{ fontFamily: 'KohinoorBangla-Regular', fontSize: 16, color: '#E0DACC' }}>{author}</Text>
        </View>
        {/* Book info  */}
        <View style={{ flexDirection: 'row', paddingVertical: 20, margin: 24, borderRadius: 12, backgroundColor: "rgba(0,0,0,0.6)" }}>
          {/* Price  */}
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontFamily: 'KohinoorBangla-Semibold', fontSize: 16, color: '#E0DACC' }}>Price</Text>
            <Text style={{ fontFamily: 'KohinoorBangla-Regular', fontSize: 14, color: '#E0DACC' }}>{price}</Text>
          </View>
          <LineDivider />
          {/* Pages  */}
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontFamily: 'KohinoorBangla-Semibold', fontSize: 16, color: '#E0DACC' }}>Pages</Text>
            <Text style={{ fontFamily: 'KohinoorBangla-Regular', fontSize: 14, color: '#E0DACC' }}>{pages}</Text>
          </View>
          <LineDivider />
          {/* Language */}
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontFamily: 'KohinoorBangla-Semibold', fontSize: 16, color: '#E0DACC' }}>Language</Text>
            <Text style={{ fontFamily: 'KohinoorBangla-Regular', fontSize: 14, color: '#E0DACC' }}>{language}</Text>
          </View>
        </View>
      </View>
    )
  }

  function renderBookDescription() {
    const indicatorSize = scrollViewWholeHeight > scrollViewVisibleHeight ?
    scrollViewVisibleHeight * scrollViewVisibleHeight / scrollViewWholeHeight :
    scrollViewVisibleHeight

    const difference = scrollViewVisibleHeight > indicatorSize ? 
    scrollViewVisibleHeight - indicatorSize : 1

    return (
      <View style={{flex: 1, flexDirection: 'row', padding: 24}}>
        {/* Custom scrollbar  */}
        <View style={{width: 4, height: '100%', backgroundColor: "#282C35"}}>

        <Animated.View
          style={{width: 4, height: indicatorSize, backgroundColor: '#7D7E84', 
          transform : [{
            translateY: Animated.multiply(indicator, scrollViewVisibleHeight/ scrollViewWholeHeight).
            interpolate({
              inputRange: [0, difference],
              outputRange: [0, difference],
              extrapolate: 'clamp'
            })
          }]
          }}
        />
        </View>
        {/* Description */}
        <ScrollView
          contentContainerStyle={{ paddingLeft: 36}}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onContentSizeChange ={(width, height) => {
            setscrollViewWholeHeight(height)
          }}
          onLayout={({nativeEvent: {layout: {x,y, width, height}}}) => {
            setscrollViewVisibleHeight(height)
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: indicator} } }],
            {useNativeDriver: false}
          )}
        >
          <Text style={{ fontFamily: 'KohinoorBangla-Semibold', fontSize: 22, color: '#E0DACC', marginBottom: 24 }}>Description</Text>
          <Text style={{ fontFamily: 'KohinoorBangla-Regular', fontSize: 20, color: "#64676D" }}>{description}</Text>
        </ScrollView>
      </View>
    )
  }

  function renderBottomButton() {
    return( 
      <View style={{flex:1, flexDirection:'row', marginTop: -20, marginBottom: 20}}>
        {/* BookMark */}
        <TouchableOpacity
        style={{width: 60, backgroundColor: "#25282F", marginLeft: 24, marginVertical: 8, borderRadius: 12,alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}
        onPress={() => console.log("Bookmark")}
        >
          <Image
          source={bookmark_icon}
          resizeMode='contain'
          style={{ width: 25, height: 25, tintColor: '#E0DACC'}}
          />
        </TouchableOpacity>
        {/* Buy book  */}
        <TouchableOpacity
        style={{flex:1, backgroundColor: "#F96D41", marginHorizontal: 8, marginVertical: 8, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}
        onPress={()=> console.log("Buy book")}
        >
          <Text style={{fontFamily: 'KohinoorBangla-Semibold', fontSize: 16, color: '#E0DACC' }}>Buy Book</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#1E1B26" }}>
      {/* Book Cover */}
      <View style={{ flex: 4 }}>
        {renderBookInfoSection()}
      </View>

      {/* Describtion */}
      <View style={{ flex: 2 }}>
        {renderBookDescription()}
      </View>

      <View style={{ height: 70 }}>
        {renderBottomButton()}
      </View>
    </View>
  )
}
export default BookScreen
const styles = StyleSheet.create({})