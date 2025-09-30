import { StyleSheet, Text, TouchableOpacity, View } from 'react-native' // Added TouchableOpacity
import React from 'react'

const RenderNoteItems = ({item}) => {
    return (
        <TouchableOpacity style={styles.noteCard}>
            <Text style={styles.noteTitle} numberOfLines={1}>
                {item.title || 'Untitled'}
            </Text>
            <Text style={styles.noteDescription} numberOfLines={2}>
                {item.description || 'No description'}
            </Text>
            <Text style={styles.noteDate}>
                {item.date}
            </Text>
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
    noteTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
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
    }
})