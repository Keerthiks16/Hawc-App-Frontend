import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useTheme } from "../../contexts/ThemeContext";
import { AuthContext } from "../../contexts/AuthContext";

const LiveKitTestScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);

  const [roomName, setRoomName] = useState("test-room"); // Default room name
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinRoom = async () => {
    if (!roomName.trim()) {
      Alert.alert("Input Error", "Please enter a room name.");
      return;
    }

    setIsJoining(true);

    try {
      // IMPORTANT: Replace with your computer's actual IP Address
      const SERVER_URL = `http://192.168.1.5:5000/getToken`;

      // Ask your local server for a token
      const response = await axios.post(SERVER_URL, {
        roomName: roomName.trim(),
        identity: userInfo?.name || "TestStudent", // Use logged-in user's name or a default
      });

      console.log("Token response:", response.data);
      const { token } = response.data;

      if (token) {
        // Navigate to the meeting screen with the new token
        navigation.navigate("LiveKitMeeting", {
          authToken: token,
          meetingId: roomName.trim(),
        });
      } else {
        throw new Error("Received an invalid token from the server.");
      }
    } catch (e) {
      console.error("Failed to get LiveKit token:", e);
      Alert.alert(
        "Connection Error",
        "Could not connect to the live class. Is your local token server running?"
      );
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={colors.gradients.appGradient}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Live Class Test</Text>
        <Text style={styles.subtitle}>
          Enter a room name. Anyone who enters the same name will join the same
          call.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Room Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., physics-class-101"
            placeholderTextColor={colors.inputPlaceholder}
            value={roomName}
            onChangeText={setRoomName}
          />
          <TouchableOpacity
            style={[styles.joinButton, isJoining && styles.disabledButton]}
            onPress={handleJoinRoom}
            disabled={isJoining}
          >
            {isJoining ? (
              <ActivityIndicator color={colors.buttonText} />
            ) : (
              <Text style={styles.joinButtonText}>Join Room</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    safeArea: { flex: 1 },
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.text,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: "center",
      marginTop: 8,
      marginBottom: 30,
    },
    card: { backgroundColor: colors.card, borderRadius: 12, padding: 20 },
    label: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.textSecondary,
      marginBottom: 10,
    },
    input: {
      backgroundColor: colors.inputBackground,
      borderColor: colors.inputBorder,
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: colors.inputText,
      marginBottom: 20,
    },
    joinButton: {
      backgroundColor: colors.primary,
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
    },
    joinButtonText: {
      color: colors.buttonText,
      fontSize: 16,
      fontWeight: "bold",
    },
    disabledButton: {
      opacity: 0.7,
    },
  });

export default LiveKitTestScreen;
