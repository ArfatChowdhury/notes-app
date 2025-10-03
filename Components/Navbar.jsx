import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { ThemeContext } from '../src/ThemeContext'
import { darkTheme, lightTheme } from '../src/Colors'

const Navbar = () => {
  const navigation = useNavigation()
  const {theme} = useContext(ThemeContext)
  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.title, {color: theme === 'dark' ? darkTheme.primaryLight : 'black' }]}>Notes</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
        <Ionicons name="settings-outline" size={24} color={theme === 'dark' ? darkTheme.primaryLight : 'black'} />
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