import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

const DUMMY_VIDEO_THUMBNAIL = require("../../../assets/hawc-images/maths.jpg");

const LecturerHeader = ({ className, classTopic, onStartClass }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.headerContainer}>
      <ImageBackground
        source={DUMMY_VIDEO_THUMBNAIL}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]} // Gradient overlay for text readability
          style={styles.gradientOverlay}
        >
          <Text style={styles.className}>{className || "Real Numbers"}</Text>
          <Text style={styles.classTopic}>{classTopic || "Real Numbers"}</Text>
          <TouchableOpacity style={styles.startButton} onPress={onStartClass}>
            <Text style={styles.startButtonText}>Start Class Now</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    headerContainer: {
      borderRadius: 12,
      overflow: "hidden",
      marginTop: 10,
      marginBottom: 20,
      elevation: 5, // Android shadow
      shadowColor: colors.shadow, // iOS shadow
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
    },
    imageBackground: {
      width: "100%",
      height: 200, // Fixed height for the header
      justifyContent: "flex-end", // Push content to the bottom
    },
    imageStyle: {
      borderRadius: 12,
    },
    gradientOverlay: {
      padding: 15,
      borderRadius: 12, // Match parent borderRadius
    },
    className: {
      fontSize: 18,
      fontWeight: "bold",
      color: "white", // Light text over dark gradient
      //   marginBottom: 65,
    },
    classTopic: {
      fontSize: 14,
      color: "white", // Slightly faded text
      marginBottom: 75,
    },
    startButton: {
      backgroundColor: "#9333EA",
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    startButtonText: {
      color: colors.buttonText,
      fontSize: 16,
      fontWeight: "bold",
    },
  });

export default LecturerHeader;
