import { Ionicons } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/ui/Header";
import { AuthContext } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

// --- Import all screens for the drawer ---
import AssignmentsScreen from "../screens/main/AssignmentsScreen";
import DemosScreen from "../screens/main/DemosScreen";
import DoubtsScreen from "../screens/main/DoubtsScreen";
import NotesScreen from "../screens/main/NotesScreen";
import PlansScreen from "../screens/main/PlansScreen";
import PracticeScreen from "../screens/main/PracticeScreen";
import ProfileScreen from "../screens/main/ProfileScreen";
import SupportScreen from "../screens/main/SupportScreen";
import TestScreen from "../screens/main/TestScreen";
import WeeklyScreen from "../screens/main/WeeklyScreen";
import BottomTabNavigator from "./BottomTabNavigator";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { colors } = useTheme();
  const { logout, userInfo } = useContext(AuthContext);
  const styles = getStyles(colors);
  const currentRouteName = props.state?.routes[props.state.index]?.name;

  const topDrawerItems = [
    { label: "Doubts", icon: "help-circle-outline", screenName: "Doubts" },
    { label: "Practice", icon: "book-outline", screenName: "Practice" },
    { label: "Notes", icon: "document-text-outline", screenName: "Notes" },
    { label: "Tests", icon: "clipboard-outline", screenName: "Tests" },
    { label: "Assignments", icon: "list-outline", screenName: "Assignments" },
    { label: "3D Demos", icon: "cube-outline", screenName: "Demos" },
    { label: "Weekly Tests", icon: "calendar-outline", screenName: "Weekly" },
  ];

  const bottomDrawerItems = [
    { label: "Subscribe", icon: "cloud-outline", screenName: "Plans" },
    { label: "Help & Support", icon: "headset-outline", screenName: "Support" },
  ];

  return (
    <LinearGradient
      colors={[
        colors.gradients.appGradient[1], // Using the brighter color at the top for light theme
        colors.gradients.appGradient[0],
        colors.gradients.appGradient[1],
      ]}
      locations={[0, 0.5, 1]}
      style={{ flex: 1 }}
    >
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        {/* Custom User Info Header */}
        <View style={styles.userInfoSection}>
          <Ionicons name="person-circle" size={50} color={colors.primary} />
          <View style={{ marginLeft: 15, flex: 1 }}>
            <Text style={styles.userName}>{userInfo?.name || "User"}</Text>
            <Text style={styles.userEmail}>
              {userInfo?.email_id || "user@email.com"}
            </Text>
          </View>
          <View style={styles.classBadge}>
            <Text style={styles.classBadgeText}>
              class {userInfo?.class || "10"}
            </Text>
          </View>
        </View>

        {/* Top Drawer Items */}
        {topDrawerItems.map((item) => (
          <DrawerItem
            key={item.label}
            label={item.label}
            icon={({ color, size }) => (
              <Ionicons name={item.icon} size={size} color={color} />
            )}
            labelStyle={styles.drawerLabel}
            focused={currentRouteName === item.screenName}
            activeTintColor={colors.primary}
            inactiveTintColor={colors.textSecondary}
            activeBackgroundColor={colors.primaryMuted}
            onPress={() => props.navigation.navigate(item.screenName)}
          />
        ))}

        <View style={{ flex: 1, minHeight: 100 }} />

        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: "rgba(255, 255, 255, 0.1)",
            paddingBottom: 5,
          }}
        />

        {/* Bottom Drawer Items */}
        {bottomDrawerItems.map((item) => (
          <DrawerItem
            key={item.label}
            label={item.label}
            icon={({ color, size }) => (
              <Ionicons name={item.icon} size={size} color={color} />
            )}
            labelStyle={styles.drawerLabel}
            focused={currentRouteName === item.screenName}
            activeTintColor={colors.primary}
            inactiveTintColor={colors.textSecondary}
            activeBackgroundColor={colors.primaryMuted}
            onPress={() => props.navigation.navigate(item.screenName)}
          />
        ))}

        <DrawerItem
          label="Logout"
          icon={({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          )}
          labelStyle={styles.drawerLabel}
          inactiveTintColor={colors.textSecondary}
          onPress={logout}
        />
      </DrawerContentScrollView>
    </LinearGradient>
  );
}

const AppDrawer = () => {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        header: (props) => <Header showLogo={true} />,
        // --- FIX 1: REMOVED the conflicting backgroundColor from here ---
        drawerStyle: {
          width: "80%",
        },
        drawerActiveBackgroundColor: colors.primaryMuted,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,
      }}
    >
      <Drawer.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{ title: "Home" }}
      />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Doubts" component={DoubtsScreen} />
      <Drawer.Screen name="Practice" component={PracticeScreen} />
      <Drawer.Screen name="Notes" component={NotesScreen} />
      <Drawer.Screen name="Tests" component={TestScreen} />
      <Drawer.Screen name="Assignments" component={AssignmentsScreen} />
      <Drawer.Screen name="Demos" component={DemosScreen} />
      <Drawer.Screen name="Weekly" component={WeeklyScreen} />
      <Drawer.Screen name="Plans" component={PlansScreen} />
      <Drawer.Screen name="Support" component={SupportScreen} />
    </Drawer.Navigator>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    userInfoSection: {
      paddingLeft: 20,
      paddingTop: 40,
      paddingBottom: 20,
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "rgba(255, 255, 255, 0.1)", // Subtle separator
    },
    userName: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text, // Always white on the gradient
    },
    userEmail: {
      fontSize: 14,
      color: colors.textSecondary, // Always white on the gradient
      opacity: 0.8,
      marginTop: 2,
    },
    classBadge: {
      backgroundColor: colors.primary,
      borderRadius: 15,
      paddingHorizontal: 12,
      paddingVertical: 4,
      marginRight: 15,
    },
    classBadgeText: {
      color: "white",
      fontSize: 12,
      fontWeight: "bold",
    },
    drawerLabel: {
      // --- FIX 2: REMOVED marginLeft: -20 for better default alignment ---
      fontWeight: "500",
      color: colors.textSecondary,
    },
  });

export default AppDrawer;
