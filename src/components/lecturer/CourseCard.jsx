import { Ionicons } from "@expo/vector-icons";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

const CourseCard = ({ course }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const isUpcoming = course.status === "upcoming";
  const isLive = course.status === "live";
  const isRecorded = course.status === "recorded";

  return (
    <View style={styles.card}>
      <ImageBackground
        source={course.thumbnail}
        style={styles.thumbnail}
        imageStyle={{ borderRadius: 12 }}
      >
        <View style={styles.badgeContainer}>
          <View style={styles.subjectBadge}>
            <Text style={styles.badgeText}>{course.subject}</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: isRecorded ? colors.accent : colors.error },
            ]}
          >
            <Text style={styles.badgeText}>
              {isRecorded ? "Uploaded" : course.status.toUpperCase()}
            </Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.contentContainer}>
        <View style={styles.tagsRow}>
          {course.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.description}>{course.description}</Text>

        <View style={styles.metadataRow}>
          <Ionicons
            name="calendar-outline"
            size={14}
            color={colors.textSecondary}
          />
          <Text style={styles.metadataText}>{course.date}</Text>
          <Ionicons
            name={isRecorded ? "time-outline" : "alarm-outline"}
            size={14}
            color={colors.textSecondary}
            style={{ marginLeft: 16 }}
          />
          <Text style={styles.metadataText}>
            {isRecorded ? course.duration : course.time}
          </Text>
        </View>
        <View style={styles.metadataRow}>
          <Ionicons
            name="globe-outline"
            size={14}
            color={colors.textSecondary}
          />
          <Text style={styles.metadataText}>English</Text>
          {isRecorded && (
            <>
              <Ionicons
                name="eye-outline"
                size={14}
                color={colors.textSecondary}
                style={{ marginLeft: 16 }}
              />
              <Text style={styles.metadataText}>{course.viewers} viewers</Text>
            </>
          )}
        </View>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons
            name={isRecorded ? "play" : "pencil-outline"}
            size={16}
            color={colors.buttonText}
          />
          <Text style={styles.actionButtonText}>
            {isUpcoming && "Need to Make Changes"}
            {isLive && "Go to Live Studio"}
            {isRecorded && "Watch Now"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    card: { backgroundColor: colors.card, borderRadius: 12, marginBottom: 20 },
    thumbnail: { height: 180, justifyContent: "space-between" },
    badgeContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
    },
    subjectBadge: {
      backgroundColor: colors.primary,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 15,
    },
    statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 15,
    },
    badgeText: { color: "white", fontSize: 10, fontWeight: "bold" },
    contentContainer: { padding: 15 },
    tagsRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 10 },
    tag: {
      backgroundColor: colors.background,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 15,
      marginRight: 8,
      marginBottom: 8,
    },
    tagText: { color: colors.textSecondary, fontSize: 10, fontWeight: "500" },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
      marginBottom: 15,
    },
    metadataRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    metadataText: { color: colors.textSecondary, fontSize: 12, marginLeft: 6 },
    actionButton: {
      flexDirection: "row",
      backgroundColor: colors.primary,
      paddingVertical: 12,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
    actionButtonText: {
      color: colors.buttonText,
      fontSize: 14,
      fontWeight: "bold",
      marginLeft: 8,
    },
  });

export default CourseCard;
