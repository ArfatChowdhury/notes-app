import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const Navbar = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Notes</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
        <Ionicons name="settings-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

export default Navbar

const styles = StyleSheet.create({
    headerContainer: { 
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title:{
        fontWeight:'bold',
        fontSize:24,
       
    }, 
})