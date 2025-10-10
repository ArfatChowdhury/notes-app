import { createContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const systemTheme = useColorScheme();
    const [theme, setTheme] = useState(systemTheme || 'light');
    const [mode, setMode] = useState('system');

    // Load theme and mode from AsyncStorage only once on mount
    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await AsyncStorage.getItem('userTheme');
            const savedMode = await AsyncStorage.getItem('themeMode');
            if (savedMode === 'user' && savedTheme) {
                setTheme(savedTheme);
                setMode('user');
            } else {
                setMode('system');
                setTheme(systemTheme || 'light');
            }
        };
        loadTheme();
    }, []); 
console.log(systemTheme, mode) 
   
    useEffect(() => {
        AsyncStorage.setItem('userTheme', theme);
        AsyncStorage.setItem('themeMode', mode);
    }, [theme, mode]);

   
    useEffect(() => {
        if (mode === 'system') {
            setTheme(systemTheme || 'light');
        }
    }, [systemTheme, mode]);

    const toggleTheme = () => {
        setMode('user');
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const setSystemDefault = () => {
        setMode('system');
        setTheme(systemTheme || 'light');
    };

    const value = { theme, setTheme, toggleTheme, mode, setSystemDefault , setMode};

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};