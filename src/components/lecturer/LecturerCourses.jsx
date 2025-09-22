import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { lecturerCoursesData } from "../../data/lecturerData";
import CourseCard from "./CourseCard";

const LecturerCourses = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [activeTab, setActiveTab] = useState("upcoming");

  // 1. Updated the tabs array to include the full text label
  const tabs = [
    { key: "upcoming", icon: "calendar-outline", label: "Upcoming" },
    { key: "live", icon: "videocam-outline", label: "Live Courses" },
    { key: "recorded", icon: "play-circle-outline", label: "Recorded" },
  ];

  const filteredCourses = lecturerCoursesData.filter(
    (course) => course.status === activeTab
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, isActive && styles.activeTab]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Ionicons
                name={tab.icon}
                size={20}
                color={isActive ? colors.text : colors.textSecondary}
              />
              {/* 2. Conditionally render the Text label only if the tab is active */}
              {isActive && <Text style={styles.tabText}>{tab.label}</Text>}
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.listContainer}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <Text style={styles.emptyText}>No {activeTab} courses found.</Text>
        )}
      </View>
    </View>
  );
};

// 3. Updated the StyleSheet to match the new design
const getStyles = (colors) =>
  StyleSheet.create({
    container: { marginTop: 20 },
    tabContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 20,
    },
    tab: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.card,
      marginHorizontal: 4,
      paddingHorizontal: 16,
      height: 44,
      borderRadius: 8,
    },
    activeTab: {
      // Active tab can have the same background or a different one if you choose
      backgroundColor: colors.card,
    },
    tabText: {
      color: colors.text,
      fontWeight: "bold",
      marginLeft: 8,
      fontSize: 14,
    },
    listContainer: {},
    emptyText: {
      color: colors.textSecondary,
      textAlign: "center",
      marginTop: 40,
    },
  });

export default LecturerCourses;
