import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// 1. Import the useTheme hook
import { useTheme } from "../contexts/ThemeContext";

// Import Screens
import ClassesScreen from "../screens/main/ClassesScreen";
import HomeScreen from "../screens/main/HomeScreen";
import PlansScreen from "../screens/main/PlansScreen"; // Corrected typo from PlansSceen
import TestScreen from "../screens/main/TestScreen";
import WeeklyScreen from "../screens/main/WeeklyScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  // 2. Get the dynamic colors object from the context
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Test") {
            iconName = focused ? "document-text" : "document-text-outline";
          } else if (route.name === "Plans") {
            iconName = focused ? "wallet" : "wallet-outline";
          } else if (route.name === "Weekly") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Classes") {
            iconName = focused ? "book" : "book-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // 3. Update all colors to use the dynamic colors object
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Classes" component={ClassesScreen} />
      <Tab.Screen name="Test" component={TestScreen} />
      <Tab.Screen name="Plans" component={PlansScreen} />
      <Tab.Screen name="Weekly" component={WeeklyScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
