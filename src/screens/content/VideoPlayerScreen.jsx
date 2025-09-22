import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import Video from "react-native-video";

const VideoPlayerScreen = ({ route }) => {
  // Get the video URL passed from the VideoCard
  const { url } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: url }}
        style={StyleSheet.absoluteFill}
        controls={true} // Show default playback controls
        resizeMode="contain"
        onError={(e) => console.log("Video Error:", e)}
      />
      {/* Custom back button to close the player */}
      <SafeAreaView style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close-circle" size={40} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  backButtonContainer: {
    position: "absolute",
    top: 10,
    left: 10,
  },
});

export default VideoPlayerScreen;
