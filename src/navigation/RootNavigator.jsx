import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

// Import ALL main navigators
import VideoPlayerScreen from "../screens/content/VideoPlayerScreen";
import NoteEditorScreen from "../screens/main/NoteEditorScreen";
import AppDrawer from "./AppDrawer"; // Student Drawer
import AuthNavigator from "./AuthNavigator";
import LecturerDrawer from "./LecturerDrawer"; // Lecturer Drawer
import LiveKitMeetingScreen from "../screens/main/LiveKitMeetingScreen";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  // Get the new isLecturer flag from the context
  const { isLoading, userToken, isLecturer } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken !== null ? (
        // User is logged in, now check their role
        <>
          {isLecturer ? (
            // If they are a lecturer, show the Lecturer app
            <Stack.Screen name="LecturerApp" component={LecturerDrawer} />
          ) : (
            // Otherwise, show the Student app
            <Stack.Screen name="StudentApp" component={AppDrawer} />
          )}

          {/* These screens are shared and can be opened from either role */}
          <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
          <Stack.Screen name="NoteEditor" component={NoteEditorScreen} />
          <Stack.Screen
            name="LiveKitMeeting"
            component={LiveKitMeetingScreen}
          />
        </>
      ) : (
        // User is not logged in, show the auth flow
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
