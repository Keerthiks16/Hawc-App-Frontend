import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

// --- Self-contained dummy data for the schedule ---
const scheduleData = [
  {
    id: "1",
    title: "Calculus I: Limits and Continuity",
    type: "lecture",
    day: "Monday",
    time: "8:00 AM - 9:30 AM",
    location: "M-201",
  },
  {
    id: "2",
    title: "Linear Algebra: Vector Spaces",
    type: "lecture",
    day: "Monday",
    time: "10:00 AM - 11:30 AM",
    location: "M-105",
  },
  {
    id: "3",
    title: "Calculus Problem Session",
    type: "problem session",
    day: "Monday",
    time: "2:00 PM - 3:30 PM",
    location: "M-205",
  },
  {
    id: "4",
    title: "Intro to Physics: Kinematics",
    type: "lecture",
    day: "Tuesday",
    time: "9:00 AM - 10:30 AM",
    location: "P-101",
  },
  {
    id: "5",
    title: "Physics Lab I",
    type: "lab",
    day: "Tuesday",
    time: "1:00 PM - 4:00 PM",
    location: "P-LAB2",
  },
  {
    id: "6",
    title: "Advanced Calculus",
    type: "lecture",
    day: "Wednesday",
    time: "8:00 AM - 9:30 AM",
    location: "M-201",
  },
  // Add more schedule items as needed
];

const daysOfWeek = [
  "All",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const LecturerScheduleScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  // State to manage the selected day filter
  const [selectedDay, setSelectedDay] = useState("All");

  // Filter schedule based on the selected day
  const filteredSchedule = scheduleData.filter((item) => {
    if (selectedDay === "All") return true;
    return item.day === selectedDay;
  });

  const getBadgeStyle = (type) => {
    switch (type.toLowerCase()) {
      case "lecture":
        return {
          backgroundColor: colors.primaryMuted,
          textColor: colors.primary,
        };
      case "problem session":
        return { backgroundColor: "#F3E8FF", textColor: "#9333EA" }; // Custom purple colors
      case "lab":
        return { backgroundColor: "#DCFCE7", textColor: "#16A34A" }; // Custom green colors
      default:
        return {
          backgroundColor: colors.border,
          textColor: colors.textSecondary,
        };
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Screen Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your class Schedule</Text>
          <Text style={styles.subtitle}>Professor Weekly Schedule</Text>
        </View>

        {/* Day Selector */}
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.daySelectorContainer}
          >
            {daysOfWeek.map((day) => {
              const isActive = selectedDay === day;
              return (
                <TouchableOpacity
                  key={day}
                  style={[styles.dayButton, isActive && styles.activeDayButton]}
                  onPress={() => setSelectedDay(day)}
                >
                  <Text
                    style={[
                      styles.dayButtonText,
                      isActive && styles.activeDayButtonText,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Schedule List */}
        <View style={styles.listContainer}>
          {filteredSchedule.length > 0 ? (
            filteredSchedule.map((item) => {
              const badgeStyle = getBadgeStyle(item.type);
              return (
                <View key={item.id} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <View
                      style={[
                        styles.badge,
                        { backgroundColor: badgeStyle.backgroundColor },
                      ]}
                    >
                      <Text
                        style={[
                          styles.badgeText,
                          { color: badgeStyle.textColor },
                        ]}
                      >
                        {item.type}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.metadataRow}>
                    <Ionicons
                      name="calendar-outline"
                      size={16}
                      color={colors.textSecondary}
                    />
                    <Text style={styles.metadataText}>{item.day}</Text>
                  </View>
                  <View style={styles.metadataRow}>
                    <Ionicons
                      name="time-outline"
                      size={16}
                      color={colors.textSecondary}
                    />
                    <Text style={styles.metadataText}>{item.time}</Text>
                  </View>
                  <View style={styles.metadataRow}>
                    <Ionicons
                      name="location-outline"
                      size={16}
                      color={colors.textSecondary}
                    />
                    <Text style={styles.metadataText}>{item.location}</Text>
                  </View>
                </View>
              );
            })
          ) : (
            <Text style={styles.emptyText}>
              No classes scheduled for {selectedDay}.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background, // Use the theme's main background
    },
    container: {
      padding: 20,
    },
    header: {
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      marginTop: 4,
    },
    daySelectorContainer: {
      paddingBottom: 20,
    },
    dayButton: {
      backgroundColor: colors.card,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      marginRight: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    activeDayButton: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    dayButtonText: {
      color: colors.text,
      fontWeight: "600",
    },
    activeDayButtonText: {
      color: colors.buttonText,
    },
    listContainer: {
      marginTop: 10,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 15,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 12,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      flex: 1, // Allow title to wrap
      marginRight: 10,
    },
    badge: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 15,
    },
    badgeText: {
      fontSize: 12,
      fontWeight: "600",
    },
    metadataRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 8,
    },
    metadataText: {
      color: colors.textSecondary,
      marginLeft: 8,
      fontSize: 14,
    },
    emptyText: {
      color: colors.textSecondary,
      textAlign: "center",
      marginTop: 40,
    },
  });

export default LecturerScheduleScreen;
