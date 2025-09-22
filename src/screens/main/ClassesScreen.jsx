import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CourseCard from "../../components/student/CourseCard";
import LiveClassCard from "../../components/student/LiveClassCard"; // Import the new card
import { AuthContext } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

const ClassesScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { userToken } = useContext(AuthContext);

  const [courses, setCourses] = useState([]);
  const [liveClasses, setLiveClasses] = useState([]); // State for live classes
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!userToken) return;

    setIsLoading(true);
    setError(null);
    try {
      // Use Promise.all to fetch both sets of data in parallel
      const [coursesResponse, liveClassesResponse] = await Promise.all([
        axios.get("http://lms.hawc.in/api/student/mycourses", {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
        axios.get("http://lms.hawc.in/api/student/myclasses", {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
      ]);

      if (coursesResponse.data.success) {
        setCourses(coursesResponse.data.data.student_courses);
      } else {
        throw new Error("Failed to fetch courses.");
      }

      if (liveClassesResponse.data.success) {
        setLiveClasses(liveClassesResponse.data.data.liveClasses);
      } else {
        throw new Error("Failed to fetch live classes.");
      }
    } catch (e) {
      setError(e.message || "An error occurred.");
      console.error("Fetch data error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [userToken])
  );

  const handleCoursePress = (course) => {
    Alert.alert("Course Tapped", `You tapped on ${course.course_name}`);
  };

  const handleLiveClassPress = (liveClass) => {
    Alert.alert("Live Class Tapped", `You tapped on ${liveClass.short_name}`);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <LinearGradient
          colors={colors.gradients.appGradient}
          style={StyleSheet.absoluteFill}
        />
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{ flex: 1 }}
        />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <LinearGradient
          colors={colors.gradients.appGradient}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Failed to load data.</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={colors.gradients.appGradient}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>My Library</Text>
        </View>

        {/* Live Classes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Live Classes</Text>
          {liveClasses.length > 0 ? (
            <FlatList
              data={liveClasses}
              renderItem={({ item }) => (
                <LiveClassCard
                  liveClass={item}
                  onPress={() => handleLiveClassPress(item)}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false} // Disable scroll for the inner list
            />
          ) : (
            <Text style={styles.emptyText}>No live classes scheduled.</Text>
          )}
        </View>

        {/* My Courses Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Courses</Text>
          {courses.length > 0 ? (
            <FlatList
              data={courses}
              renderItem={({ item }) => (
                <CourseCard
                  course={item}
                  onPress={() => handleCoursePress(item)}
                />
              )}
              keyExtractor={(item) => item.course_id.toString()}
              scrollEnabled={false} // Disable scroll for the inner list
            />
          ) : (
            <Text style={styles.emptyText}>
              You are not enrolled in any courses yet.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    safeArea: { flex: 1 },
    header: { paddingHorizontal: 20, paddingTop: 20 },
    title: { fontSize: 24, fontWeight: "bold", color: colors.text },
    section: { marginTop: 20, paddingHorizontal: 20 },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 15,
    },
    centerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    errorText: { color: colors.error, fontSize: 16, marginBottom: 20 },
    retryButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderRadius: 8,
    },
    retryButtonText: { color: colors.buttonText, fontWeight: "bold" },
    emptyText: {
      color: colors.textSecondary,
      fontSize: 14,
      textAlign: "center",
      paddingVertical: 20,
    },
  });

export default ClassesScreen;
