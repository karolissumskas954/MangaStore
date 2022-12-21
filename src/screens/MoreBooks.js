import { StyleSheet, Text, View, SafeAreaView,TouchableOpacity, Image, ScrollView, FlatList} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/core';
import { db } from '../../firebase';
import { COLORS, FONTS, SIZES, icons} from '../../constants';

export default function MoreBooks() {

    const [blogs, setBlogs] = useState([])
    const navigation = useNavigation()

    const fetchBlogs = async () => {
      db.ref('manga/').once('value', function (snapshot) {
        const items = []
        snapshot.forEach((doc) => {
          const { title, uri, author, description, language, pages, postEmail, price, publisher, isbn } = doc.val()
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
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1B26', marginTop: -35}}>
         <View style={{ flexDirection: 'row', paddingHorizontal: 12, height: 80, alignItems: 'flex-end' }}>
          <TouchableOpacity
            style={{ marginLeft: 18}}
            onPress={()=> navigation.replace("Home")}
          >
            <Image
              source={icons.back_icon}
              resizeMode="contain"
              style={{ width: 25, height: 25, tintColor: '#E0DACC' }}
            />
          </TouchableOpacity>
            <Text style={{ fontFamily: 'KohinoorBangla-Semibold', fontSize: 22, color: '#E0DACC', marginLeft: 100 }}>More Books</Text>
        </View>
    <ScrollView style={{ margintop: 12 }}>
    <View style={{ flex: 1, marginTop: 12, paddingLeft: 24 }}>
        <FlatList
          data={blogs}
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
                        source={icons.page_icon}
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
    </ScrollView>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({})