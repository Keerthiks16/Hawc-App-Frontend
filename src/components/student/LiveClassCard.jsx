import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

const LiveClassCard = ({ liveClass, onPress }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  // Function to format the date nicely
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <Ionicons name="videocam-outline" size={28} color={colors.primary} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{liveClass.short_name}</Text>
        <Text style={styles.subtitle}>{liveClass.topic_short_name}</Text>
        <Text style={styles.date}>{formatDate(liveClass.start_date)}</Text>
      </View>
      <View style={styles.joinButton}>
        <Text style={styles.joinButtonText}>Join</Text>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 15,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: colors.border,
    },
    iconContainer: {
      padding: 12,
      borderRadius: 8,
      backgroundColor: colors.primaryMuted,
      marginRight: 15,
    },
    detailsContainer: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },
    subtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 2,
    },
    date: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 6,
    },
    joinButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 15,
    },
    joinButtonText: {
      color: colors.buttonText,
      fontWeight: "bold",
      fontSize: 12,
    },
  });

export default LiveClassCard;
