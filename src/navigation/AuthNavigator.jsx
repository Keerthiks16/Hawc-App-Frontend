import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/ui/Header"; // Import the custom Header

import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ navigation, route, options }) => (
          <Header showLogo={true} /> // Always show logo on auth screens
        ),
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
