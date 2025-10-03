import { StyleSheet, Text, TouchableOpacity, View } from 'react-native' // Added TouchableOpacity
import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ThemeContext } from '../src/ThemeContext'
import { darkTheme, lightTheme } from '../src/Colors'

const RenderNoteItems = ({ item, onDelete }) => {
    const navigation = useNavigation()
    const {theme} = useContext(ThemeContext)
    const colors = theme === 'dark' ? darkTheme : lightTheme
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Create Note', { item })}>

            <View style={[styles.noteCard, { backgroundColor: colors.card, shadowColor: colors.shadow, borderColor: colors.border, borderWidth: 1 }]}> 
                <View style={styles.headerRow}>
                    <Text style={[styles.noteTitle, { color: colors.text }]} numberOfLines={1}>
                        {item.title || 'Untitled'}
                    </Text>
                    {!!onDelete && (
                        <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteBtn}>
                            <Ionicons name="trash" size={20} color={colors.error} />
                        </TouchableOpacity>
                    )}
                </View>
                <Text style={[styles.noteDescription, { color: colors.textSecondary }]} numberOfLines={2}>
                    {item.description || 'No description'}
                </Text>
                <Text style={[styles.noteDate, { color: colors.textTertiary }]}>
                    {item.date}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default RenderNoteItems

const styles = StyleSheet.create({
    noteCard: {
        // backgroundColor: 'white',
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    noteDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        lineHeight: 20,
    },
    noteDate: {
        fontSize: 12,
        color: '#999',
        fontStyle: 'italic',
    },
    deleteBtn: {
        padding: 6,
        borderRadius: 8,
    }
})