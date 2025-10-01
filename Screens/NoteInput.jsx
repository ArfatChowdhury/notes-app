import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'



const NoteInput = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState(null)
    const [notes, setNotes] = useState([])
    
    const navigation = useNavigation()

    const generateId = () => {
        return Date.now().toString()
    }
    const handleSave = async () => {
        if (!title.trim() && !description.trim()) {
            return
        }     
          try {
                const currentDate = new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
                const existingNotesJSON = await AsyncStorage.getItem('notes')
                const existingNotes = existingNotesJSON ? JSON.parse(existingNotesJSON) : []

                const newNotes = {
                    id: generateId(),
                    title: title,
                    description: description,
                    date: currentDate,
                    timestamp: Date.now()
                }

                const updateNotes = [...existingNotes, newNotes]
                await AsyncStorage.setItem('notes', JSON.stringify(updateNotes))
                hasSavedRef.current = true
                setDate(currentDate)
                setNotes(updateNotes)
                navigation.navigate('Home')
            }
            catch (err) {
                console.log(err);

            }
        
    }


   

    return (
        <View style={styles.container}>
            <View style={styles.titleCon}>
                <TextInput
                    placeholder='title'
                    value={title}
                    onChangeText={setTitle}
                    style={styles.titleInput}
                />
                {title.trim() || description.trim() ? <Ionicons name="checkmark" size={30} color="orange" onPress={handleSave} /> : null}
            </View>
            {date && (
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>Last saved: {date}</Text>
                </View>
            )}
            <View style={styles.bodyCon}>
                <TextInput
                    style={styles.desInput}
                    placeholder='start typing'
                    multiline={true}
                    value={description}
                    onChangeText={setDescription} />
            </View>
        </View>
    )
}

export default NoteInput

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingVertical: '10%',
        paddingHorizontal: '4%'
    },
    titleCon: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    actionsRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    actionBtn: {
        padding: 8,
        borderRadius: 8,
    },
    bodyCon: {
        flex: 9
    },
    desInput: {
        
        flex: 1,
        fontSize: 18,
        padding: 15,
        textAlignVertical: 'top',
    },
    titleInput: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 10,
        flex: 1,
    },
})