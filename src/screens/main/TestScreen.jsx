import { Ionicons } from "@expo/vector-icons";
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

const TestScreen = () => {
  const { colors } = useTheme(); // 2. Get dynamic colors from the context
  const styles = getStyles(colors); // Create styles with dynamic colors

  return (
    <SafeAreaView style={styles.safeArea}>
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
        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.description}>
            Quick quizzes, full mocks (NEET/JEE), and the All-India Weekly Test
            series.
          </Text>

          {/* Test Cards */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Weekly Tests</Text>
              <Ionicons
                name="arrow-forward-circle"
                size={24}
                color={colors.primary}
              />
            </View>
            <Text style={styles.cardDescription}>
              Regular tests to track your progress weekly. Perfect for
              consistent practice.
            </Text>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>View Test</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Open Test Portal (PHP)</Text>
              <Ionicons name="open-outline" size={24} color={colors.primary} />
            </View>
            <Text style={styles.cardDescription}>
              Access our extensive PHP-based test portal with thousands of
              questions.
            </Text>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>Access Portal</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.card, styles.comingSoonCard]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Mock Tests (native)</Text>
              <View style={styles.comingSoonBadge}>
                <Text style={styles.comingSoonText}>coming soon</Text>
              </View>
            </View>
            <Text style={styles.cardDescription}>
              Native mock tests designed to simulate the actual exam
              environment.
            </Text>
            <TouchableOpacity style={styles.disabledButton} disabled={true}>
              <Text
                style={[styles.cardButtonText, { color: colors.textSecondary }]}
              >
                Notify Me
              </Text>
            </TouchableOpacity>
          </View>

          {/* Additional Features */}
          <Text style={styles.sectionTitle}>Test Categories</Text>

          <View style={styles.categoryContainer}>
            <View style={styles.categoryItem}>
              <View
                style={[styles.categoryIcon, { backgroundColor: "#ef4444" }]}
              >
                <Ionicons name="medical" size={24} color="#fff" />
              </View>
              <Text style={styles.categoryText}>NEET</Text>
            </View>
            <View style={styles.categoryItem}>
              <View
                style={[styles.categoryIcon, { backgroundColor: "#3b82f6" }]}
              >
                <Ionicons name="calculator" size={24} color="#fff" />
              </View>
              <Text style={styles.categoryText}>JEE Mains</Text>
            </View>
            <View style={styles.categoryItem}>
              <View
                style={[styles.categoryIcon, { backgroundColor: "#10b981" }]}
              >
                <Ionicons name="rocket" size={24} color="#fff" />
              </View>
              <Text style={styles.categoryText}>JEE Advanced</Text>
            </View>
          </View>

          {/* Performance Stats */}
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>Your Test Performance</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Tests Taken</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>78%</Text>
                <Text style={styles.statLabel}>Average Score</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>92%</Text>
                <Text style={styles.statLabel}>Completion</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- 3. Converted StyleSheet to a function that uses the dynamic colors ---
const getStyles = (colors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.gradients.appGradient[1],
    },
    scrollContent: {
      flexGrow: 1,
      backgroundColor: "transparent",
    },
    content: {
      padding: 16,
    },
    description: {
      fontSize: 16,
      marginBottom: 24,
      lineHeight: 24,
      color: colors.textSecondary,
      textAlign: "center",
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    comingSoonCard: {
      opacity: 0.8,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
    },
    cardDescription: {
      fontSize: 14,
      marginBottom: 16,
      lineHeight: 20,
      color: colors.textSecondary,
    },
    cardButton: {
      backgroundColor: colors.primary,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignSelf: "flex-start",
    },
    disabledButton: {
      backgroundColor: colors.border,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignSelf: "flex-start",
    },
    cardButtonText: {
      color: colors.buttonText,
      fontWeight: "600",
    },
    comingSoonBadge: {
      backgroundColor: colors.border,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    comingSoonText: {
      color: colors.textSecondary,
      fontSize: 12,
      textTransform: "uppercase",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 24,
      marginBottom: 16,
      color: colors.text,
    },
    categoryContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 24,
    },
    categoryItem: {
      alignItems: "center",
      flex: 1,
      marginHorizontal: 4,
    },
    categoryIcon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 8,
    },
    categoryText: {
      color: colors.textSecondary,
      fontSize: 12,
      textAlign: "center",
    },
    statsCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
    },
    statsTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 16,
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    statItem: {
      alignItems: "center",
    },
    statValue: {
      color: colors.primary,
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 4,
    },
    statLabel: {
      color: colors.textSecondary,
      fontSize: 12,
    },
  });

export default TestScreen;
