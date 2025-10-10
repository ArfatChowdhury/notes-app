import { createContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const systemTheme = useColorScheme();
    const [theme, setTheme] = useState(systemTheme || 'light');

    // Load theme from AsyncStorage on mount
    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await AsyncStorage.getItem('userTheme');
            if (savedTheme) {
                setTheme(savedTheme);
            } else {
                setTheme(systemTheme || 'light');
            }
        };
        loadTheme();
    }, [systemTheme]);

    // Save theme to AsyncStorage whenever it changes
    useEffect(() => {
        AsyncStorage.setItem('userTheme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const value = { theme, setTheme, toggleTheme };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};