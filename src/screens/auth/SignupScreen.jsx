import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/colors";

const SignupScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-background p-4"
      style={{ backgroundColor: Colors.background }}
    >
      <View className="w-full max-w-sm items-center">
        <Text
          className="text-4xl font-bold text-center mb-8"
          style={{ color: Colors.text }}
        >
          Create Account
        </Text>

        <Text
          className="text-lg text-center mb-8"
          style={{ color: Colors.text }}
        >
          Signup functionality is not yet implemented.
        </Text>

        <TouchableOpacity
          className="mt-6"
          onPress={() => navigation.navigate("Login")}
        >
          <Text
            className="text-center font-semibold"
            style={{ color: Colors.primary }}
          >
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;
