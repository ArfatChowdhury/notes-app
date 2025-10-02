import { StyleSheet, Switch, Text, View } from 'react-native'
import React from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

const SettingScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <View style={styles.settingContainer}>
                <Text style={styles.settingTitle}>Theme Switch</Text>
                <View style={styles.switchContainer}>
                    <Text style={styles.settingDescription}>Dark Mode</Text>
                    <Switch />
                </View>
            </View>
            <Text style={styles.SettingTitle1}>Theme Settings</Text>
            <View style={styles.themeContainer}>
                <View style={styles.themeItem}>
                    <Ionicons name="bulb" size={20} color="black" />
                    <Text style={styles.themeTitle}>Light Mode</Text>
                </View>
                <Ionicons style={styles.radioButton} name="radio-button-off" size={20} color="black" />
            </View>
            <View style={styles.themeContainer}>
                <View style={styles.themeItem}>
                    <Ionicons name="moon" size={20} color="black" />
                    <Text style={styles.themeTitle}>Dark Mode</Text>
                </View>
                <Ionicons style={styles.radioButton} name="radio-button-off" size={20} color="black" />
            </View>
            <View style={styles.themeContainer}>
                <View style={styles.themeItem}>
                    <MaterialCommunityIcons name="lightbulb-auto-outline" size={20} color="black" />
                    <Text style={styles.themeTitle}>System Default</Text>
                </View>
                <Ionicons style={styles.radioButton} name="radio-button-off" size={20} color="black" />
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
        justifyContent: 'space-between',


    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,

    },
    SettingTitle1: {
        fontSize: 18,
        fontWeight: 600,
        color: '#333',
        marginBottom: 20,
        marginTop: 20,
    },
    themeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,

    },
    themeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        width: '100%',
        padding: 10,
    },
    radioButton: {
        marginRight: 10,
    },
    themeTitle: {
        fontSize: 16,
        fontWeight: 400,
        color: '#333',
    },

})