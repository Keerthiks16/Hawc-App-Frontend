import { LinearGradient } from "expo-linear-gradient";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext"; // 1. Import useTheme

const WeeklyScreen = () => {
  const { colors } = useTheme(); // 2. Get dynamic colors from the context
  const styles = getStyles(colors); // Create styles with dynamic colors

  const dates = [
    { day: 1, isTest: false },
    { day: 2, isTest: false },
    { day: 3, isTest: false },
    { day: 4, isTest: false },
    { day: 5, isTest: false },
    { day: 6, isTest: false },
    { day: 7, isTest: true },
    { day: 8, isTest: false },
    { day: 9, isTest: false },
    { day: 10, isTest: false },
    { day: 11, isTest: false },
    { day: 12, isTest: false },
    { day: 13, isTest: false },
    { day: 14, isTest: true },
    { day: 15, isTest: false },
    { day: 16, isTest: false },
    { day: 17, isTest: false },
    { day: 18, isTest: false },
    { day: 19, isTest: false },
    { day: 20, isTest: false },
    { day: 21, isTest: true },
    { day: 22, isTest: false },
    { day: 23, isTest: false },
    { day: 24, isTest: false },
    { day: 25, isTest: false },
    { day: 26, isTest: false },
    { day: 27, isTest: false },
    { day: 28, isTest: true },
    { day: 29, isTest: false },
    { day: 30, isTest: false },
  ];

  // Helper to render subjects for the test details card
  const renderSubjectDetails = (subject, topics) => (
    <View style={styles.subjectContainer}>
      <Text style={styles.subjectTitle}>{subject}</Text>
      {topics.map((topic, index) => (
        <View key={index} style={styles.topicRow}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.topicText}>{topic}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 3. Add the LinearGradient component for the background */}
      <LinearGradient
        colors={[
          colors.gradients.appGradient[1],
          colors.gradients.appGradient[0],
          colors.gradients.appGradient[1],
        ]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* The app-wide header is now handled by the navigator, so no placeholder needed */}

        {/* Calendar Section */}
        <View style={styles.calendarContainer}>
          <View style={styles.dayNamesRow}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (dayName) => (
                <Text key={dayName} style={styles.dayName}>
                  {dayName}
                </Text>
              )
            )}
          </View>

          <View style={styles.calendarGrid}>
            {Array(6)
              .fill(null)
              .map((_, i) => (
                <View key={`empty-${i}`} style={styles.dateCell} />
              ))}
            {dates.map((item, index) => (
              <View key={index} style={styles.dateCell}>
                <TouchableOpacity
                  style={[
                    styles.dateCircle,
                    item.isTest && styles.testDateCircle,
                  ]}
                >
                  <Text
                    style={[
                      styles.dateText,
                      item.isTest && styles.testDateText,
                    ]}
                  >
                    {item.day}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
            {Array(1)
              .fill(null)
              .map((_, i) => (
                <View key={`empty-end-${i}`} style={styles.dateCell} />
              ))}
          </View>
        </View>

        {/* Upcoming Sunday Test Card */}
        <View style={styles.testCard}>
          <Text style={styles.cardTitle}>Upcoming Sunday Test</Text>
          <Text style={styles.cardSubtitle}>
            Sundays • 9:00–12:00 IST • NEET/JEE pattern
          </Text>

          {renderSubjectDetails("Physics", ["Kinematics", "Laws of Motion"])}
          {renderSubjectDetails("Chemistry", [
            "Atomic Structure",
            "Chemical Bonding",
          ])}
          {renderSubjectDetails("Biology/Math", [
            "Cell Structure / Quadratic Equations",
          ])}

          <View style={styles.cardButtonsContainer}>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>Register / Remind Me</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>View Syllabus PDF</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- 4. Converted StyleSheet to a function that uses the dynamic colors ---
const getStyles = (colors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.gradients.appGradient[1],
    },
    scrollContent: {
      paddingHorizontal: 15,
      paddingBottom: 20,
      backgroundColor: "transparent",
    },
    calendarContainer: {
      backgroundColor: colors.card,
      borderRadius: 10,
      padding: 15,
      marginTop: 20,
      marginBottom: 20,
    },
    dayNamesRow: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 10,
    },
    dayName: {
      color: colors.textSecondary,
      fontSize: 12,
      fontWeight: "bold",
      width: "14%",
      textAlign: "center",
    },
    calendarGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    dateCell: {
      width: "14%",
      aspectRatio: 1,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 5,
    },
    dateCircle: {
      width: 35,
      height: 35,
      borderRadius: 17.5,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    testDateCircle: {
      backgroundColor: colors.primary,
    },
    dateText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "500",
    },
    testDateText: {
      color: colors.card,
      fontWeight: "bold",
    },
    testCard: {
      backgroundColor: colors.card,
      borderRadius: 10,
      padding: 20,
      marginBottom: 20,
    },
    cardTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
    },
    cardSubtitle: {
      color: colors.textSecondary,
      fontSize: 13,
      marginBottom: 15,
    },
    subjectContainer: {
      marginBottom: 10,
    },
    subjectTitle: {
      color: colors.text,
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 3,
    },
    topicRow: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 10,
    },
    bullet: {
      color: colors.textSecondary,
      fontSize: 12,
      marginRight: 5,
    },
    topicText: {
      color: colors.textSecondary,
      fontSize: 13,
    },
    cardButtonsContainer: {
      marginTop: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    cardButton: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 8,
      backgroundColor: colors.background,
      flex: 1,
      marginHorizontal: 5,
      minWidth: "45%",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
    },
    cardButtonText: {
      color: colors.primary,
      fontSize: 13,
      fontWeight: "bold",
      textAlign: "center",
    },
  });

export default WeeklyScreen;
