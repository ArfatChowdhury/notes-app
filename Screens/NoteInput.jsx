import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ThemeContext } from '../src/ThemeContext'
import { darkTheme, lightTheme } from '../src/Colors'



const NoteInput = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState(null)
    const [notes, setNotes] = useState([])
    
    const navigation = useNavigation()
    const { theme } = useContext(ThemeContext)
    const colors = theme === 'dark' ? darkTheme : lightTheme

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
              
                setDate(currentDate)
                setNotes(updateNotes)
                navigation.navigate('Home')
            }
            catch (err) {
                console.log(err);

            }
        
    }


   

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.titleCon}>
                <TextInput
                    placeholder='title'
                    value={title}
                    onChangeText={setTitle}
                    placeholderTextColor={colors.textTertiary}
                    style={[styles.titleInput, { color: colors.text }]}
                />
                {title.trim() || description.trim() ? <Ionicons name="checkmark" size={30} color={colors.secondary} onPress={handleSave} /> : null}
            </View>
            {date && (
                <View style={[styles.dateContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={[styles.dateText, { color: colors.textSecondary }]}>Last saved: {date}</Text>
                </View>
            )}
            <View style={styles.bodyCon}>
                <TextInput
                    style={[styles.desInput, { color: colors.text }]}
                    placeholder='start typing'
                    placeholderTextColor={colors.textTertiary}
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
    dateContainer: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    dateText: {
        fontSize: 12,
        fontStyle: 'italic',
    },
})