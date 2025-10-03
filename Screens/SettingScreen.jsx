import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { ThemeContext } from '../src/ThemeContext'
import { darkTheme, lightTheme } from '../src/Colors'
import { DarkTheme } from '@react-navigation/native'

const SettingScreen = () => {
    const { theme, setTheme, toggleTheme } = useContext(ThemeContext)
    const colors = theme === 'dark' ? darkTheme : lightTheme

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
            <View style={styles.settingContainer}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>Theme Switch</Text>
                <View style={[styles.switchContainer, { backgroundColor: colors.card }]}>
                    <Text style={[styles.settingDescription, { color: colors.text }]}>Dark Mode</Text>
                    <Switch
                        value={theme === 'dark'}
                        onValueChange={toggleTheme}
                        trackColor={{ false: colors.border, true: colors.primary }}
                        thumbColor={theme === 'dark' ? colors.primary : colors.background}
                    />
                </View>
            </View>
            <Text style={[styles.SettingTitle1, { color: colors.text }]}>Theme Settings</Text>
            <TouchableOpacity onPress={toggleTheme}>
                <View style={[styles.themeContainer, { backgroundColor: colors.card }]}>
                    <View style={styles.themeItem}>
                        <Ionicons name="bulb" size={20} color={colors.secondary} />
                        <Text style={[styles.themeTitle, { color: colors.text }]}>Light Mode</Text>
                    </View>
                    <TouchableOpacity onPress={toggleTheme}>
                        <Ionicons
                            style={styles.radioButton}
                            name={theme === 'light' ? "radio-button-on" : "radio-button-off"}
                            size={20}
                            color={theme === 'light' ? colors.primary : colors.textSecondary}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleTheme}>

                <View style={[styles.themeContainer, { backgroundColor: colors.card }]}>
                    <View style={styles.themeItem}>
                        <Ionicons name="moon" size={20} color={colors.secondary} />
                        <Text style={[styles.themeTitle, { color: colors.text }]}>Dark Mode</Text>
                    </View>
                    <TouchableOpacity onPress={toggleTheme}>
                        <Ionicons
                            style={styles.radioButton}
                            name={theme === 'dark' ? "radio-button-on" : "radio-button-off"}
                            size={20}
                            color={theme === 'dark' ? colors.primary : colors.textSecondary}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            <View style={[styles.themeContainer, { backgroundColor: colors.card }]}>
                <View style={styles.themeItem}>
                    <MaterialCommunityIcons name="lightbulb-auto-outline" size={20} color={colors.textSecondary} />
                    <Text style={[styles.themeTitle, { color: colors.textSecondary }]}>System Default</Text>
                </View>
                <Ionicons
                    style={styles.radioButton}
                    name="radio-button-off"
                    size={20}
                    color={colors.textSecondary}
                />
            </View>
        </View>
    )
}

export default SettingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '4%',
        paddingTop: '10%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 20,
    },
    settingTitle: {
        fontSize: 18,
        fontWeight: 600,
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
        padding: 15,
        borderRadius: 12,
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    SettingTitle1: {
        fontSize: 18,
        fontWeight: 600,
        marginBottom: 20,
        marginTop: 20,
    },
    themeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 10,
        borderRadius: 10,
    },
    themeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 10,
        borderRadius: 12,
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        width: '100%',
        padding: 15,
    },
    radioButton: {
        marginRight: 10,
    },
    themeTitle: {
        fontSize: 16,
        fontWeight: 400,
    },
    settingDescription: {
        fontSize: 16,
        fontWeight: 400,
    },
})