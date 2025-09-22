import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { Themes } from "../constants/colors"; // Import the theme objects

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Get the device's default theme, fallback to light
  const colorScheme = Appearance.getColorScheme() || "light";
  const [theme, setTheme] = useState(colorScheme);

  // Function to load the saved theme from storage
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme);
      }
    };
    loadTheme();
  }, []);

  // Function to toggle the theme and save the preference
  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  };

  // Select the correct color object based on the current theme
  const colors = theme === "light" ? Themes.light : Themes.dark;
  const isDarkTheme = theme === "dark";

  return (
    <ThemeContext.Provider value={{ theme, isDarkTheme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for easier access to the context
export const useTheme = () => useContext(ThemeContext);
