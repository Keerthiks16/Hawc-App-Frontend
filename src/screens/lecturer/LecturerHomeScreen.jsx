import { Ionicons } from "@expo/vector-icons"; // For icons in metric cards
import { LinearGradient } from "expo-linear-gradient";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import LecturerCourses from "../../components/lecturer/LecturerCourses";
import LecturerHeader from "../../components/lecturer/LecturerHeader"; // Import the new component
import { useTheme } from "../../contexts/ThemeContext";

// A simple component for the metric cards
const MetricCard = ({ iconName, value, label, iconColor, textColor }) => {
  const { colors } = useTheme();
  const cardStyles = getCardStyles(colors);
  return (
    <View style={cardStyles.card}>
      <Ionicons
        name={iconName}
        size={30}
        color={iconColor || colors.primary}
        style={cardStyles.icon}
      />
      <Text style={[cardStyles.value, { color: textColor || colors.text }]}>
        {value}
      </Text>
      <Text style={cardStyles.label}>{label}</Text>
    </View>
  );
};

const LecturerHomeScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const handleStartClass = () => {
    Alert.alert("Class Started!", "Your live class has begun.");
    // Implement actual class start logic here
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={colors.gradients.appGradient}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Lecturer Header */}
        <LecturerHeader
          className="Physics"
          classTopic="Moving Charges and Magnetism"
          onStartClass={handleStartClass}
        />

        {/* Metrics Grid */}
        <View style={styles.metricsGrid}>
          <MetricCard
            iconName="people"
            value="24"
            label="Expected Students"
            iconColor={colors.secondary}
          />
          <MetricCard
            iconName="time"
            value="1 min"
            label="No of Hours"
            iconColor={colors.accent}
          />
          <MetricCard
            iconName="star"
            value="84%"
            label="Average Marks"
            iconColor={colors.success}
          />
          <MetricCard
            iconName="videocam"
            value="2"
            label="Total Live"
            iconColor={colors.error}
          />
        </View>
        <LecturerCourses />
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles for the HomeScreen layout
const getStyles = (colors) =>
  StyleSheet.create({
    safeArea: { flex: 1 },
    container: {
      padding: 15,
      flexGrow: 1,
    },
    metricsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: 10,
    },
  });

// Styles for the individual MetricCard
const getCardStyles = (colors) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 15,
      width: "48%", // Roughly half width to fit two per row with spacing
      marginBottom: 15,
      alignItems: "center",
      justifyContent: "center",
      elevation: 3,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    icon: {
      marginBottom: 8,
    },
    value: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 5,
    },
    label: {
      fontSize: 12,
      color: colors.textSecondary,
      textAlign: "center",
    },
  });

export default LecturerHomeScreen;
