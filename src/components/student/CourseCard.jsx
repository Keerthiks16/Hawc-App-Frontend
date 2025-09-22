import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

const CourseCard = ({ course, onPress }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  // Helper to get an icon based on course name
  const getCourseIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("physic")) return "magnet-outline";
    if (lowerName.includes("chem")) return "flask-outline";
    if (lowerName.includes("math")) return "calculator-outline";
    if (lowerName.includes("bio")) return "leaf-outline";
    return "book-outline"; // Default icon
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={getCourseIcon(course.course_name)}
          size={32}
          color={colors.primary}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{course.course_name}</Text>
        <Text
          style={styles.subtitle}
        >{`${course.course_parent2} • ${course.course_parent1}`}</Text>
      </View>
      <Ionicons
        name="chevron-forward-outline"
        size={24}
        color={colors.textSecondary}
      />
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
      width: 60,
      height: 60,
      borderRadius: 8,
      backgroundColor: colors.primaryMuted,
      justifyContent: "center",
      alignItems: "center",
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
      marginTop: 4,
    },
  });

export default CourseCard;
