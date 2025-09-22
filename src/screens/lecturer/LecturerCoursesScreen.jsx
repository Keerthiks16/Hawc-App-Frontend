import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { lecturerCoursesData } from "../../data/lecturerData"; // Using the data file we created

// --- Helper Component: Top Search Banner ---
const SearchBanner = ({ colors }) => {
  const styles = getStyles(colors);
  return (
    <ImageBackground
      source={require("../../../assets/hawc-images/physics.jpg")} // Assuming you have a background image
      style={styles.bannerContainer}
      imageStyle={{ borderRadius: 12 }}
    >
      <View style={styles.bannerOverlay}>
        <Text style={styles.bannerTitle}>Explore Courses</Text>
        <Text style={styles.bannerSubtitle}>
          Authentic and high quality courses, specially curated by experienced
          instructors for deep study.
        </Text>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search for courses by topic"
            placeholderTextColor={colors.textSecondary}
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

// --- Helper Component: Course List Item Card ---
const CourseListItem = ({ course, colors }) => {
  const styles = getStyles(colors);
  return (
    <View style={styles.card}>
      <ImageBackground
        source={course.thumbnail}
        style={styles.thumbnail}
        imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
      >
        <View style={styles.badgeContainer}>
          <View style={styles.subjectBadge}>
            <Text style={styles.badgeText}>{course.subject}</Text>
          </View>
          <Text style={styles.durationText}>
            {course.duration || course.time}
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.description}>{course.description}</Text>
        <View style={styles.tagsRow}>
          {course.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <View style={styles.metadataRow}>
          <Ionicons
            name="calendar-outline"
            size={14}
            color={colors.textSecondary}
          />
          <Text style={styles.metadataText}>{course.date}</Text>
          <Ionicons
            name="eye-outline"
            size={14}
            color={colors.textSecondary}
            style={{ marginLeft: 16 }}
          />
          <Text style={styles.metadataText}>
            {course.viewers || "0"} viewers
          </Text>
        </View>
      </View>
    </View>
  );
};

const LecturerCoursesScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [activeTab, setActiveTab] = useState("live"); // 'live' or 'recorded'

  const courseData = {
    live: lecturerCoursesData.filter(
      (c) => c.status === "live" || c.status === "upcoming"
    ),
    recorded: lecturerCoursesData.filter((c) => c.status === "recorded"),
  };

  const ListHeader = () => (
    <>
      <SearchBanner colors={colors} />
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab("live")}>
          <Text
            style={[
              styles.tabText,
              activeTab === "live" && styles.activeTabText,
            ]}
          >
            Live Classes
          </Text>
          {activeTab === "live" && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("recorded")}>
          <Text
            style={[
              styles.tabText,
              activeTab === "recorded" && styles.activeTabText,
            ]}
          >
            Recorded Course
          </Text>
          {activeTab === "recorded" && (
            <View style={styles.activeTabIndicator} />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.filterButton}>
        <Text style={styles.filterText}>FILTERS & SORT</Text>
        <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
      </TouchableOpacity>
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={colors.gradients.appGradient}
        style={StyleSheet.absoluteFill}
      />
      <FlatList
        ListHeaderComponent={ListHeader}
        data={courseData[activeTab]}
        renderItem={({ item }) => (
          <CourseListItem course={item} colors={colors} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    safeArea: { flex: 1 },
    listContainer: { paddingHorizontal: 15, paddingTop: 15 },
    bannerContainer: {
      height: 220,
      justifyContent: "flex-end",
      borderRadius: 12,
      overflow: "hidden",
    },
    bannerOverlay: { backgroundColor: "rgba(0,0,0,0.6)", padding: 20 },
    bannerTitle: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#FFFFFF",
      marginBottom: 8,
    },
    bannerSubtitle: { fontSize: 14, color: "#E0E0E0", marginBottom: 16 },
    searchContainer: { flexDirection: "row" },
    searchInput: {
      flex: 1,
      backgroundColor: colors.card,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      paddingHorizontal: 15,
      color: colors.text,
    },
    searchButton: {
      backgroundColor: colors.primary,
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      paddingHorizontal: 20,
      justifyContent: "center",
    },
    searchButtonText: { color: colors.buttonText, fontWeight: "bold" },

    tabContainer: {
      flexDirection: "row",
      marginTop: 20,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tabText: {
      fontSize: 16,
      color: colors.textSecondary,
      paddingVertical: 15,
      paddingHorizontal: 20,
    },
    activeTabText: { color: colors.primary, fontWeight: "bold" },
    activeTabIndicator: {
      height: 3,
      backgroundColor: colors.primary,
      position: "absolute",
      bottom: 0,
      left: 20,
      right: 20,
    },

    filterButton: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.card,
      padding: 15,
      borderRadius: 8,
      marginTop: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    filterText: { color: colors.textSecondary, fontWeight: "500" },

    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      marginBottom: 20,
      elevation: 3,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },
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
    durationText: {
      color: "white",
      backgroundColor: "rgba(0,0,0,0.6)",
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
      fontSize: 12,
      fontWeight: "500",
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
  });

export default LecturerCoursesScreen;
