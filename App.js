import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import NoteInput from './Screens/NoteInput';
import { NavigationContainer } from '@react-navigation/native';
import SettingScreen from './Screens/SettingScreen';
import { ThemeProvider } from './src/ThemeContext';


const Stack = createStackNavigator()

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Create Note" component={NoteInput} />
          <Stack.Screen name="Setting" component={SettingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({

});
