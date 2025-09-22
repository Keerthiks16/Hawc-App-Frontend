import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

// Import ALL main navigators
import VideoPlayerScreen from '../screens/content/VideoPlayerScreen';
import CheckoutScreen from '../screens/main/CheckoutScreen';
import NoteEditorScreen from '../screens/main/NoteEditorScreen';
import AppDrawer from './AppDrawer'; // Student Drawer
import AuthNavigator from './AuthNavigator';
import LecturerDrawer from './LecturerDrawer'; // Lecturer Drawer
// 1. Import the new DyteMeetingScreen from the correct path
import DyteMeetingScreen from '../screens/main/DyteMeetingScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { isLoading, userToken, isLecturer } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken !== null ? (
        <>
          {isLecturer ? (
            <Stack.Screen name="LecturerApp" component={LecturerDrawer} />
          ) : (
            <Stack.Screen name="StudentApp" component={AppDrawer} />
          )}
          
          <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
          <Stack.Screen name="NoteEditor" component={NoteEditorScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          {/* 2. Add the DyteMeetingScreen to the stack */}
          <Stack.Screen name="DyteMeeting" component={DyteMeetingScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;