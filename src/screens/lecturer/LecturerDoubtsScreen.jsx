import { SafeAreaView, Text, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

const LecturerDoubtsScreen = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: colors.text }}>Lecturer Doubts Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default LecturerDoubtsScreen;
