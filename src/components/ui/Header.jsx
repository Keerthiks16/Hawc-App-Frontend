import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AuthContext } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

const Header = ({ title = "", showLogo = true }) => {
  const navigation = useNavigation();
  const { userToken } = useContext(AuthContext);
  const { colors, isDarkTheme, toggleTheme } = useTheme();

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.gradients.appGradient[1],
      }}
    >
      <LinearGradient
        colors={[
          colors.gradients.appGradient[1],
          colors.gradients.appGradient[0],
          colors.gradients.appGradient[1],
        ]}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <View style={styles.headerContainer}>
          {/* Left Side: Logo or Title */}
          <View style={styles.leftContainer}>
            {showLogo ? (
              <Image
                source={require("../../../assets/hawc-images/Asset.png")}
                style={styles.logo}
              />
            ) : (
              <Text style={[styles.titleText, { color: colors.text }]}>
                {title}
              </Text>
            )}
          </View>

          {/* Right Side: Theme Toggle and Auth Buttons */}
          <View style={styles.rightContainer}>
            <TouchableOpacity onPress={toggleTheme} style={styles.toggleButton}>
              <Ionicons
                name={isDarkTheme ? "sunny-outline" : "moon-outline"}
                size={24}
                color={colors.text}
              />
            </TouchableOpacity>

            {!userToken && (
              <View style={styles.authButtonsContainer}>
                <TouchableOpacity
                  style={[
                    styles.loginButton,
                    { backgroundColor: colors.primary },
                  ]}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.signupButton,
                    { borderColor: "rgba(255,255,255,0.3)" },
                  ]}
                  onPress={() => navigation.navigate("Signup")}
                >
                  <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingTop: 30,
  },
  leftContainer: {
    flex: 1, // Allows the logo/title to take up available space on the left
    flexDirection: "row",
    alignItems: "center",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  toggleButton: {
    padding: 6,
  },
  authButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  loginButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  signupButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default Header;
