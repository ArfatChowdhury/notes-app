import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'



const NoteInput = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState(null)
    const [notes, setNotes] = useState([])
    const generateId = () => {
        return Date.now().toString()
    }
    const handleSave = async () => {
        if (title.trim() || description.trim()) {
            try {
                const currentDate = new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
                const newNotes = {
                    id: generateId(),
                    title: title,
                    description: description,
                    date: currentDate,
                    timestamp: Date.now()
                }
                const updateNotes = [...notes, newNotes]
                await AsyncStorage.setItem('notes', JSON.stringify(updateNotes))
                setDate(currentDate)
                setNotes(updateNotes)

            }
            catch (err) {
                console.log(err);

            }
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleSave()
        }, 1000)
        return () => clearTimeout(timeoutId)
    }, [title, description])
    


    useFocusEffect(
        React.useCallback(() => {
            return () => {
                handleSave()
            }
        }, [title, description])
    )

    return (
        <View style={styles.container}>
            <View style={styles.titleCon}>
                <TextInput
                    placeholder='title'
                    value={title}
                    onChangeText={setTitle}
                    style={styles.titleInput}
                />
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
        flex: 1
    },
    bodyCon: {
        flex: 9
    },
    desInput: {
        backgroundColor: 'red',
        flex: 1,
        fontSize: 18,
        padding: 15,
        textAlignVertical: 'top',
    },
    titleInput: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 10,
    },
})