import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "../contexts/ThemeContext";

// Import Lecturer Screens
import LecturerCoursesScreen from "../screens/lecturer/LecturerCoursesScreen";
import LecturerDoubtsScreen from "../screens/lecturer/LecturerDoubtsScreen";
import LecturerHomeScreen from "../screens/lecturer/LecturerHomeScreen";
import LecturerProfileScreen from "../screens/lecturer/LecturerProfileScreen";
import LecturerScheduleScreen from "../screens/lecturer/LecturerScheduleScreen";
import LecturerStudentsScreen from "../screens/lecturer/LecturerStudentsScreen";
// Add other lecturer screens like an "Uploads" screen here

const Tab = createBottomTabNavigator();

const LecturerBottomTabNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Doubts") {
            iconName = focused ? "help-circle" : "help-circle-outline";
          } else if (route.name === "Courses") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Schedule") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Students") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
      })}
    >
      <Tab.Screen name="Home" component={LecturerHomeScreen} />
      <Tab.Screen name="Doubts" component={LecturerDoubtsScreen} />
      <Tab.Screen name="Courses" component={LecturerCoursesScreen} />
      <Tab.Screen name="Schedule" component={LecturerScheduleScreen} />
      <Tab.Screen name="Students" component={LecturerStudentsScreen} />
      <Tab.Screen name="Profile" component={LecturerProfileScreen} />

      {/* Add other lecturer tabs here */}
    </Tab.Navigator>
  );
};

export default LecturerBottomTabNavigator;
