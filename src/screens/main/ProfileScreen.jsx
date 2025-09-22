// 1. Import SafeAreaView from react-native
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

const ProfileScreen = () => {
  return (
    // 2. Use SafeAreaView as the main container for the screen
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={{ color: Colors.text }}>Your Profile Content</Text>
        <Text style={{ color: Colors.text }}>
          This will not go under the notch or home bar....
        </Text>
      </View>
    </SafeAreaView>
  );
};

// You can create a reusable style for your screens
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
  },
});

export default ProfileScreen;
