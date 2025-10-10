import { 
    StyleSheet, 
    Text, 
    TextInput, 
    View, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView 
  } from 'react-native'
  import React, { useEffect, useState, useContext } from 'react'
  import AsyncStorage from '@react-native-async-storage/async-storage'
  import { useNavigation, useRoute } from '@react-navigation/native'
  import Ionicons from '@expo/vector-icons/Ionicons'
  import { ThemeContext } from '../src/ThemeContext'
  import { darkTheme, lightTheme } from '../src/Colors'
  
  const NoteInput = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState(null)
    const [notes, setNotes] = useState([])
    const [editingNoteId, setEditingNoteId] = useState(null)
    
    const navigation = useNavigation()
    const route = useRoute()
    const item = route?.params?.item
    const { theme } = useContext(ThemeContext)
    const colors = theme === 'dark' ? darkTheme : lightTheme
  
    const generateId = () => Date.now().toString()
  
    useEffect(() => {
      const noteToEdit = item
      if (noteToEdit) {
        setTitle(noteToEdit.title || '')
        setDescription(noteToEdit.description || '')
        setDate(noteToEdit.date || null)
        setEditingNoteId(noteToEdit.id)
      }
    }, [item])
  
    const handleSave = async () => {
      if (!title.trim() && !description.trim()) return
  
      try {
        const currentDate = new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
  
        const existingNotesJSON = await AsyncStorage.getItem('notes')
        const existingNotes = existingNotesJSON ? JSON.parse(existingNotesJSON) : []
  
        let updatedNotes
        if (editingNoteId) {
          updatedNotes = existingNotes.map(n =>
            String(n.id) === String(editingNoteId)
              ? { ...n, title, description, date: currentDate, timestamp: Date.now() }
              : n
          )
        } else {
          const newNote = {
            id: generateId(),
            title,
            description,
            date: currentDate,
            timestamp: Date.now()
          }
          updatedNotes = [...existingNotes, newNote]
        }
  
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes))
        setDate(currentDate)
        setNotes(updatedNotes)
        navigation.navigate('Home')
      } catch (err) {
        console.log(err)
      }
    }
  
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Top Header */}
        <View style={styles.titleCon}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.actionBtn}>
            <Ionicons name="arrow-back" size={28} color={colors.textSecondary} />
          </TouchableOpacity>
          {(title.trim() || description.trim()) ? (
            <TouchableOpacity onPress={handleSave} style={styles.actionBtn}>
              <Ionicons name="checkmark" size={30} color={colors.secondary} />
            </TouchableOpacity>
          ) : null}
        </View>
  
        {/* Title Input */}
        <TextInput
          placeholder='Title'
          value={title}
          onChangeText={setTitle}
          placeholderTextColor={colors.textTertiary}
          style={[
            styles.titleInput,
            { 
              color: colors.text,
              borderBottomColor: colors.border,
              backgroundColor: colors.surface
            }
          ]}
        />
  
        {/* Last Saved Date */}
        {date && (
          <View style={[styles.dateContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.dateText, { color: colors.textSecondary }]}>Last saved: {date}</Text>
          </View>
        )}
  
        {/* Description Input with KeyboardAvoidingView */}
        <KeyboardAvoidingView
          style={styles.bodyCon}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <TextInput
              style={[
                styles.desInput,
                { 
                  color: colors.text,
                  backgroundColor: colors.surface
                }
              ]}
              placeholder='Start typing...'
              placeholderTextColor={colors.textTertiary}
              multiline={true}
              value={description}
              onChangeText={setDescription}
            />
          </ScrollView>
        </KeyboardAvoidingView>
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
      height: 56,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    actionBtn: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
    },
    bodyCon: {
      flex: 1,
    },
    desInput: {
      flex: 1,
      fontSize: 18,
      padding: 15,
      textAlignVertical: 'top',
      borderRadius: 8,
      minHeight: 200,
    },
    titleInput: {
      fontSize: 24,
      fontWeight: 'bold',
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderBottomWidth: 1,
      borderRadius: 8,
      marginBottom: 8,
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
  