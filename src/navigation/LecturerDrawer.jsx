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

// Import Lecturer Screens and Navigators
import ProfileScreen from "../screens/main/ProfileScreen"; // Reusing the profile screen
import LecturerBottomTabNavigator from "./LecturerBottomTabNavigator";

const Drawer = createDrawerNavigator();

// --- 1. Created a Custom Drawer Content component for the Lecturer ---
function CustomLecturerDrawerContent(props) {
  const { colors } = useTheme();
  const { logout, userInfo } = useContext(AuthContext);
  const styles = getStyles(colors);
  const currentRouteName = props.state?.routes[props.state.index]?.name;

  return (
    <LinearGradient
      colors={[
        colors.gradients.appGradient[1],
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
          <View style={styles.roleBadge}>
            <Text style={styles.roleBadgeText}>
              {userInfo?.role_name || "Lecturer"}
            </Text>
          </View>
        </View>

        {/* --- Lecturer-specific Drawer Items --- */}
        <DrawerItem
          label="Dashboard"
          icon={({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          )}
          labelStyle={styles.drawerLabel}
          focused={currentRouteName === "MainLecturer"}
          activeTintColor={colors.primary}
          inactiveTintColor={colors.textSecondary}
          activeBackgroundColor={colors.primaryMuted}
          onPress={() => props.navigation.navigate("MainLecturer")}
        />
        <DrawerItem
          label="Profile"
          icon={({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          )}
          labelStyle={styles.drawerLabel}
          focused={currentRouteName === "Profile"}
          activeTintColor={colors.primary}
          inactiveTintColor={colors.textSecondary}
          activeBackgroundColor={colors.primaryMuted}
          onPress={() => props.navigation.navigate("Profile")}
        />

        <View style={{ flex: 1, minHeight: 20 }} />

        {/* --- Logout Button --- */}
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

const LecturerDrawer = () => {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomLecturerDrawerContent {...props} />}
      screenOptions={{
        header: (props) => <Header showLogo={true} />,
        drawerStyle: {
          width: "80%",
        },
        drawerActiveBackgroundColor: colors.primaryMuted,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,
      }}
    >
      <Drawer.Screen
        name="MainLecturer"
        component={LecturerBottomTabNavigator}
        options={{ title: "LecturerHome" }}
      />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
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
      borderBottomColor: "rgba(255, 255, 255, 0.1)",
    },
    userName: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },
    userEmail: {
      fontSize: 14,
      color: colors.textSecondary,
      opacity: 0.8,
      marginTop: 2,
    },
    roleBadge: {
      backgroundColor: colors.accent, // Using accent color for the role
      borderRadius: 15,
      paddingHorizontal: 12,
      paddingVertical: 4,
      marginRight: 15,
    },
    roleBadgeText: {
      color: "white",
      fontSize: 12,
      fontWeight: "bold",
    },
    drawerLabel: {
      fontWeight: "500",
      color: colors.text,
    },
  });

export default LecturerDrawer;
