import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core'



export default function AddBookScreen() {
    const navigation = useNavigation();
  return (
    <View style={{flex:1, justifyContent: 'center'}}>
      <Text>AddBookScreen</Text>
      <Button
      title='Back'
      onPress={()=> navigation.replace("Home")}></Button>
    </View>
  )
}

const styles = StyleSheet.create({})