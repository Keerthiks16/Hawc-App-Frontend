import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext"; // 1. Import useTheme

const LoginScreen = () => {
  const { colors } = useTheme(); // 2. Get dynamic colors from the context
  const styles = getStyles(colors); // Create styles with dynamic colors

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    login(email, password);
  };

  return (
    // 3. Update all styles to use the dynamic `colors` object
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>HAWC Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={colors.inputPlaceholder}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.inputPlaceholder}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.buttonText} />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupContainer}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// 4. Converted styles to a function for dynamic theming
const getStyles = (colors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: colors.text,
      textAlign: "center",
      marginBottom: 40,
    },
    input: {
      backgroundColor: colors.inputBackground,
      borderColor: colors.inputBorder,
      borderWidth: 1,
      borderRadius: 8,
      padding: 16,
      fontSize: 16,
      color: colors.inputText,
      marginBottom: 16,
    },
    loginButton: {
      backgroundColor: colors.buttonBackground,
      borderRadius: 8,
      padding: 16,
      alignItems: "center",
      marginTop: 8,
    },
    loginButtonText: {
      color: colors.buttonText,
      fontSize: 16,
      fontWeight: "bold",
    },
    signupContainer: {
      marginTop: 24,
    },
    signupText: {
      color: colors.primary,
      textAlign: "center",
      fontWeight: "600",
    },
  });

export default LoginScreen;
