// Enhanced Theme System with Gradients and Easy Switching

// A professional, clean light theme palette
const lightColors = {
  // Basic Colors
  background: "#F1F5F9", // The main light gray background of the content area
  text: "#0F172A", // The dark text color for titles and labels
  textSecondary: "#64748B", // The medium gray for emails, dates, and descriptions
  primary: "#2563EB", // The strong blue for buttons, badges, and selected icons
  secondary: "#7C3AED", // A nice purple accent
  accent: "#10B981", // A fresh green accent
  card: "#FFFFFF", // Pure white for headers, drawers, and content cards
  border: "#E2E8F0", // A light gray for borders and dividers
  primaryMuted: "#EFF6FF", // A very light blue for selected item backgrounds (like in the drawer)

  // Status Colors
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",

  // Interactive States
  buttonBackground: "#2563EB",
  buttonText: "#FFFFFF",
  buttonBackgroundDisabled: "#CBD5E1",
  buttonTextDisabled: "#64748B",

  // Input Colors
  inputBackground: "#FFFFFF",
  inputBorder: "#D1D5DB",
  inputBorderFocus: "#2563EB",
  inputText: "#0F172A",
  inputPlaceholder: "#9CA3AF",

  // Gradients
  gradients: {
    appGradient: ["#FFFFFF", "#F1F5F9"], // A subtle white-to-gray gradient
    primary: ["#2563EB", "#3B82F6"],
    // ... other gradients
  },
};

// A rich, dark navy theme based on your reference images
const darkColors = {
  // Basic Colors
  background: "#081024", // Rich navy blue background
  text: "#FFFFFF", // Pure white for primary text
  textSecondary: "#94A3B8", // A light gray for muted text (slate-400)
  primary: "#3B82F6", // A vibrant, accessible blue (blue-500)
  secondary: "#8B5CF6", // A nice purple (violet-500)
  accent: "#10B981", // A fresh green (emerald-500)
  card: "#1E293B", // A dark slate color for cards (slate-800)
  border: "#334155", // A medium slate color for borders (slate-700)

  // Status Colors
  success: "#10B981", // Green
  warning: "#F59E0B", // Amber
  error: "#F87171", // Red (lighter for dark theme)
  info: "#60A5FA", // Blue (lighter for dark theme)

  // Interactive States
  buttonBackground: "#3B82F6",
  buttonText: "#FFFFFF",
  buttonBackgroundDisabled: "#374151",
  buttonTextDisabled: "#6B7280",

  // Input Colors
  inputBackground: "#1F2937",
  inputBorder: "#374151",
  inputBorderFocus: "#3B82F6",
  inputText: "#FFFFFF",
  inputPlaceholder: "#9CA3AF",

  // Gradients
  gradients: {
    // Your main app gradient (radial converted to linear)
    appGradient: ["#1a5cad", "#020829"], // rgba(26, 92, 173, 1) to rgba(2, 8, 41, 1)
    appGradientReverse: ["#020829", "#1a5cad"], // Reversed version

    // Other gradients
    primary: ["#1E40AF", "#3B82F6"],
    secondary: ["#6D28D9", "#8B5CF6"],
    accent: ["#059669", "#10B981"],
    sunset: ["#DC2626", "#F59E0B"],
    ocean: ["#0C4A6E", "#0EA5E9"],
    purple: ["#581C87", "#8B5CF6"],
    card: ["#1E293B", "#334155"],
    background: ["#081024", "#1E293B"],
    darkBlue: ["#0F172A", "#1E293B"],
    navy: ["#081024", "#0C1938"],
  },
};

// Theme configuration
const THEME_CONFIG = {
  LIGHT: "light",
  DARK: "dark",
};

// Current theme setting - Change this to switch themes globally
const CURRENT_THEME = THEME_CONFIG.DARK; // Change to THEME_CONFIG.LIGHT for light theme

// Export the active colors based on current theme
export const Colors =
  CURRENT_THEME === THEME_CONFIG.LIGHT ? lightColors : darkColors;

// Export theme utilities for easy switching
export const ThemeUtils = {
  isLightTheme: () => CURRENT_THEME === THEME_CONFIG.LIGHT,
  isDarkTheme: () => CURRENT_THEME === THEME_CONFIG.DARK,
  getCurrentTheme: () => CURRENT_THEME,
  getLightColors: () => lightColors,
  getDarkColors: () => darkColors,
};

// Export both themes for comparison or manual switching
export const Themes = {
  light: lightColors,
  dark: darkColors,
};

// Gradient helper function for React Native Linear Gradient
export const getGradient = (
  gradientName,
  fallbackColors = Colors.gradients.primary
) => {
  return Colors.gradients[gradientName] || fallbackColors;
};

// Usage examples:
/*
// Your main app gradient:
import { Colors, getGradient } from './Colors';
import LinearGradient from 'react-native-linear-gradient';

// Method 1: Using your app gradient
<LinearGradient
  colors={getGradient('appGradient')}
  style={styles.container}
>

// Method 2: Direct access
<LinearGradient
  colors={Colors.gradients.appGradient} // ["#1a5cad", "#020829"] for dark theme
  style={styles.header}
>

// Method 3: For radial-like effect, use different start/end points
<LinearGradient
  colors={Colors.gradients.appGradient}
  start={{x: 0.5, y: 0.5}} // Center start (like radial)
  end={{x: 1, y: 1}}       // Bottom-right end
  style={styles.background}
>

// Method 4: For more radial-like appearance
<LinearGradient
  colors={Colors.gradients.appGradient}
  start={{x: 0.5, y: 0.5}} // Center
  end={{x: 0, y: 0}}       // Top-left (creates outward effect)
  style={styles.container}
>

// Switch themes by changing CURRENT_THEME above
// All your screens will update automatically!
*/
