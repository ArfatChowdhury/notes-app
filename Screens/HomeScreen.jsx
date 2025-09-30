import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
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

    const filteredNotes = notes.filter(note => note.title?.toLowerCase().includes(searchQuery.toLowerCase()) || note.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <View style={styles.container}>
            <Navbar></Navbar>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={26} color="gray" />
                <TextInput
                    placeholder='Search Notes'
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <View>
                <FlatList
                    data={searchQuery ? filteredNotes : notes}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => <RenderNoteItems item={item}
                    showsVerticalScrollIndicator={false}/> }
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
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        padding: 8,
        margin: 10,
        elevation: 2,
        shadowColor: '#000',
    },
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingHorizontal: '4%',
        paddingVertical: '10%'
    },
    addContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'flex-end'
    }
})