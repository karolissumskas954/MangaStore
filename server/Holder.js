import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StripeApp from './StripeApp'
import {StripeProvider} from "@stripe/stripe-react-native"

const Holder = () => {
  const PUBLISHABLE_KEY = "PUBLISHABLE_KEY";

  return (
    <StripeProvider 
    publishableKey={PUBLISHABLE_KEY}
    >
      <StripeApp/>
      </StripeProvider>
    
  )
}

export default Holder

const styles = StyleSheet.create({})