import { StyleSheet, Switch, Text, View } from 'react-native'
import React from 'react'

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.settingContainer}>
        <Text style={styles.settingTitle}>Theme Switch</Text>
        <View style={styles.switchContainer}>
        <Text style={styles.settingDescription}>Dark Mode</Text>
        <Switch/>
        </View>
      </View>
    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingHorizontal: '4%',
        paddingTop: '10%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 20,
    },
    settingTitle: {
        fontSize: 18,
        fontWeight: 600,
        color: '#333',
        marginBottom: 20,
        marginTop: 20,
    },
    settingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 20,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 20,
    }
})