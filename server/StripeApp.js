import { StyleSheet, Text, View, Button, Alert, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { CardField, useConfirmPayment, CardForm, CardFormProps } from '@stripe/stripe-react-native'
import { useNavigation } from '@react-navigation/core';
import { COLORS, FONTS, SIZES, icons } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '../firebase';

const API_URL = "URL" //ipconfig ip-v4

const StripeApp = props => {

  const navigation = useNavigation()
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
  const email = auth.currentUser?.email;
  const [buttonColor, setButtonColor] = useState('blue')
  const [title, setTitle] = useState('')

const getTotalPrice = async () => {
    var totalPrice = 0;
    let lines = email.split('@');
    var query = db.ref("cart/" + lines[0]).orderByKey();
    query.once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var key = childSnapshot.key;
          const { price } = childSnapshot.val()
          totalPrice = totalPrice + price
        });
        setTitle(`Pay ${totalPrice}€`)
      })
}
useEffect(() => {
  getTotalPrice();
}, [])

const deleteItem = () => {
  let lines = email.split('@');
  db.ref("cart/" + lines[0]).remove()
  .then(() => {
  })
  .catch(() => alert("No"))
}
  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  }
  const handlePayPress = async () => {
    if (!cardDetails?.complete) {
      alert("Please enter Complete card details")
      return;
    };
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      if (error) {
        console.log("Unable to process payment")
      } else {
        const { paymentIntent, error } = await confirmPayment
          (clientSecret, {
            paymentMethodType: 'Card',
            // billingDetails: 'user@stripe.com'
          });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`)
        } else if (paymentIntent) {
          alert("Payment Successful")
          setButtonColor('green')
          setTitle('Payment Successful')
          deleteItem()
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  function renderHeader() {
    return (
      <View style={{paddingVertical: 10, height: 80}}>
        <TouchableOpacity
          style={{ marginLeft: 18 }}
          onPress={() => navigation.replace("AtCounter")}
        >
          <Image
            source={icons.back_icon}
            resizeMode="contain"
            style={{ width: 25, height: 25, tintColor: COLORS.black }}
          />
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {renderHeader()}
      <View style={{ flex: 1, justifyContent: 'center', margin: 20 }}>
        <CardForm
          postalCodeEnabled={false}
          placeholders={{
            number: "4000 0025 0000 3155"
          }}
          cardStyle={{ backgroundColor: '#efefefef' }}
          style={{ height: 200, marginVertical: 20 }}
          onFormComplete={(cardDetails) => {
            setCardDetails(cardDetails);
          }}
        />
        <TouchableOpacity
        style = {{ backgroundColor: buttonColor, width: 200, height: 50, alignSelf: 'center', justifyContent: 'center', borderRadius: 12}}
        onPress={handlePayPress}
        disabled={loading}
        > 
        <Text style={{alignSelf: 'center', fontSize: 14, color: COLORS.white}}>{title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
// 4242 4242 4242 4242
// 4000 0025 0000 3155

export default StripeApp

const styles = StyleSheet.create({})