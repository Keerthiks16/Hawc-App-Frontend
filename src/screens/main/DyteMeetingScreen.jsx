import { DyteProvider, useDyteClient } from "@dytesdk/react-native-core";
import { DyteMeeting } from "@dytesdk/react-native-ui-kit";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

const DyteMeetingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();

  // Get the authToken and meetingId passed from the ClassesScreen
  const { authToken, meetingId } = route.params;

  const [client, initClient] = useDyteClient();

  useEffect(() => {
    // Initialize the Dyte client with the authToken and room details
    initClient({
      authToken: authToken,
      roomName: meetingId,
      defaults: {
        audio: true, // User audio is on by default
        video: true, // User video is on by default
      },
    });
  }, [authToken, meetingId]);

  return (
    <SafeAreaView style={styles.container}>
      {client ? (
        <DyteProvider client={client}>
          <DyteMeeting
            meeting={client}
            showSetupScreen={true} // Show the pre-flight screen for mic/camera check
            onMeetingRoomLeft={() => {
              navigation.goBack(); // Go back to the previous screen when the meeting ends
            }}
          />
        </DyteProvider>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000",
          }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Meeting screens are typically black
  },
});

export default DyteMeetingScreen;
