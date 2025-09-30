import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Navbar = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Notes</Text>
    </View>
  )
}

export default Navbar

const styles = StyleSheet.create({
    headerContainer: { 
        padding: 10,
    },
    title:{
        fontWeight:'bold',
        fontSize:24,
       
    }, 
})