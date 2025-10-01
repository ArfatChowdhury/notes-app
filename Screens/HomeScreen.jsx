import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Navbar from '../Components/Navbar';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RenderNoteItems from '../Components/RenderNoteItems';

const HomeScreen = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [notes, setNotes] = useState([])
    const navigation = useNavigation()

    useFocusEffect(
        React.useCallback(() => {
            loadNotes()
        }, [])
    )

    const loadNotes = async () => {
        try {
            const value = await AsyncStorage.getItem('notes')
            if (value !== null) {
                const parsedNotes = JSON.parse(value)
                setNotes(parsedNotes)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleDeleteNote = async (id) => {
        try {
            const updated = notes.filter(n => String(n.id) !== String(id))
            setNotes(updated)
            await AsyncStorage.setItem('notes', JSON.stringify(updated))
        } catch (err) {
            console.log(err)
        }
    }

    const filteredNotes = notes.filter(note => 
        note.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <View style={styles.container}>
            <Navbar />
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={26} color="gray" />
                <TextInput
                    placeholder='Search Notes'
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={styles.searchInput}
                />
            </View>
            
         
            <View style={styles.notesListContainer}>
                <FlatList
                    data={searchQuery ? filteredNotes : notes}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => (
                        <RenderNoteItems item={item} onDelete={handleDeleteNote} />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContent}
                />
            </View>

            
            <TouchableOpacity
                style={styles.addContainer}
                onPress={() => navigation.navigate('Create Note')}>
                <Ionicons name="add-circle" size={72} color="orange" />
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingHorizontal: '4%',
        paddingTop: '10%'
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        padding: 8,
        margin: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
    },
    notesListContainer: {
        flex: 1, 
        
    },
    flatListContent: {
        paddingBottom: 20, 
    },
    addContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 1000, 
    }
})