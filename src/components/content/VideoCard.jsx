import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext"; // 1. Import useTheme

const VideoCard = ({ video }) => {
  const { colors } = useTheme(); // 2. Get dynamic colors from the context
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("VideoPlayer", { url: video.url });
  };

  // 3. Pass the dynamic colors object to our styles function
  const styles = getStyles(colors);

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {/* Thumbnail */}
      <ImageBackground
        source={video.thumbnail}
        style={styles.thumbnail}
        imageStyle={{ borderRadius: 8 }}
      >
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{video.duration}</Text>
        </View>
      </ImageBackground>

      {/* Video Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {video.title}
          </Text>
          <TouchableOpacity>
            {/* 4. Use dynamic colors for icons */}
            <Ionicons
              name="ellipsis-vertical"
              size={16}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.metadataRow}>
          <Ionicons
            name="person-circle-outline"
            size={14}
            color={colors.textSecondary}
          />
          <Text style={styles.metadataText}>{video.author}</Text>
        </View>
        <Text style={styles.metadataText}>
          {`${video.timestamp} • ${video.views} Views`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// 5. Convert StyleSheet into a function that accepts the colors object
const getStyles = (colors) =>
  StyleSheet.create({
    container: {
      width: 180,
      marginRight: 16,
    },
    thumbnail: {
      width: "100%",
      height: 100,
      justifyContent: "flex-end",
      alignItems: "flex-end",
      backgroundColor: colors.border, // Add a placeholder background color
    },
    durationBadge: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      margin: 8,
    },
    durationText: {
      color: "white",
      fontSize: 10,
      fontWeight: "bold",
    },
    detailsContainer: {
      marginTop: 8,
    },
    titleRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    title: {
      color: colors.text, // Use dynamic color
      fontWeight: "bold",
      fontSize: 14,
      flex: 1,
    },
    metadataRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 4,
    },
    metadataText: {
      color: colors.textSecondary, // Use dynamic color
      fontSize: 12,
      marginLeft: 4,
    },
  });

export default VideoCard;
