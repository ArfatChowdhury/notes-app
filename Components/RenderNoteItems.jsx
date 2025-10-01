import { StyleSheet, Text, TouchableOpacity, View } from 'react-native' // Added TouchableOpacity
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const RenderNoteItems = ({ item, onDelete }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Create Note', { item })}>

            <View style={styles.noteCard}>
                <View style={styles.headerRow}>
                    <Text style={styles.noteTitle} numberOfLines={1}>
                        {item.title || 'Untitled'}
                    </Text>
                    {!!onDelete && (
                        <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteBtn}>
                            <Ionicons name="trash" size={20} color="#d9534f" />
                        </TouchableOpacity>
                    )}
                </View>
                <Text style={styles.noteDescription} numberOfLines={2}>
                    {item.description || 'No description'}
                </Text>
                <Text style={styles.noteDate}>
                    {item.date}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default RenderNoteItems

const styles = StyleSheet.create({
    noteCard: {
        backgroundColor: 'white',
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