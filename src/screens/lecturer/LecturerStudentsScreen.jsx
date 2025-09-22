import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

// --- Self-contained dummy data for the students list ---
const studentsData = [
  {
    id: "S12345",
    name: "John Doe",
    email: "john.doe@example.com",
    grade: 92,
    attendance: 85,
  },
  {
    id: "S12346",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    grade: 88,
    attendance: 92,
  },
  {
    id: "S12347",
    name: "Robert Johnson",
    email: "robert.j@example.com",
    grade: 95,
    attendance: 78,
  },
  {
    id: "S12348",
    name: "Emily Davis",
    email: "emily.d@example.com",
    grade: 90,
    attendance: 88,
  },
  {
    id: "S12349",
    name: "Michael Brown",
    email: "michael.b@example.com",
    grade: 81,
    attendance: 95,
  },
  {
    id: "S12350",
    name: "Jessica Wilson",
    email: "jessica.w@example.com",
    grade: 98,
    attendance: 91,
  },
];

// --- Helper Component for the top stat cards ---
const StatCard = ({ label, value, backgroundColor, colors }) => {
  const styles = getStyles(colors);
  return (
    <View style={[styles.statCard, { backgroundColor }]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
};

const LecturerStudentsScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  // State to manage sorting
  const [sortBy, setSortBy] = useState("Default Order");

  // Calculate statistics from the data
  const stats = useMemo(() => {
    const totalStudents = studentsData.length;
    const avgGrade = Math.round(
      studentsData.reduce((acc, curr) => acc + curr.grade, 0) / totalStudents
    );
    const avgAttendance = Math.round(
      studentsData.reduce((acc, curr) => acc + curr.attendance, 0) /
        totalStudents
    );
    return { totalStudents, avgGrade, avgAttendance };
  }, [studentsData]);

  // Placeholder for sorting logic
  const sortedStudents = [...studentsData]; // In a real app, this would use the `sortBy` state

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Screen Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Maths Dashboard</Text>
          <Text style={styles.subtitle}>
            View and manage all students enrolled in Maths
          </Text>
        </View>

        {/* Sort Dropdown */}
        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort Students By</Text>
          <TouchableOpacity style={styles.sortButton}>
            <Text style={styles.sortButtonText}>{sortBy}</Text>
            <Ionicons
              name="chevron-down"
              size={16}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Statistics Cards */}
        <View style={styles.statsRow}>
          <StatCard
            label="Total Students"
            value={stats.totalStudents}
            backgroundColor={"#E0E7FF"}
            colors={colors}
          />
          <StatCard
            label="Avg. Grade"
            value={`${stats.avgGrade}%`}
            backgroundColor={"#D1FAE5"}
            colors={colors}
          />
          <StatCard
            label="Avg. Attendance"
            value={`${stats.avgAttendance}%`}
            backgroundColor={"#FEF3C7"}
            colors={colors}
          />
        </View>

        {/* Student List */}
        <View style={styles.listContainer}>
          {sortedStudents.map((student) => (
            <View key={student.id} style={styles.studentCard}>
              <View style={styles.studentInfo}>
                <Text style={styles.studentId}>ID: {student.id}</Text>
                <Text style={styles.studentName}>{student.name}</Text>
                <Text style={styles.studentEmail}>{student.email}</Text>
                <View style={styles.actionLinks}>
                  <TouchableOpacity>
                    <Text style={styles.linkText}>View</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.linkText}>Message</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.studentStats}>
                <Text style={styles.statText}>{student.grade}%</Text>
                <Text style={styles.statText}>{student.attendance}%</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
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
    sortContainer: {
      marginBottom: 20,
    },
    sortLabel: {
      color: colors.textSecondary,
      fontSize: 14,
      marginBottom: 8,
    },
    sortButton: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.card,
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    sortButtonText: {
      color: colors.text,
      fontWeight: "500",
    },
    statsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    statCard: {
      width: "32%",
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
    },
    statLabel: {
      fontSize: 12,
      color: "black",
      marginBottom: 4,
    },
    statValue: {
      fontSize: 22,
      fontWeight: "bold",
      color: "black",
    },
    listContainer: {
      marginTop: 10,
    },
    studentCard: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 15,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: colors.border,
    },
    studentInfo: {
      flex: 1,
    },
    studentId: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    studentName: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginVertical: 4,
    },
    studentEmail: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 12,
    },
    actionLinks: {
      flexDirection: "row",
    },
    linkText: {
      color: colors.primary,
      fontWeight: "600",
      marginRight: 16,
    },
    studentStats: {
      alignItems: "flex-end",
    },
    statText: {
      color: colors.text,
      fontWeight: "600",
      fontSize: 16,
      marginBottom: 8,
    },
  });

export default LecturerStudentsScreen;
