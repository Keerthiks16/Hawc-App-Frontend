import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ChemistryDemo from "../../components/demos/ChemistryDemo"; // Import our new component
import { useTheme } from "../../contexts/ThemeContext";

const DemosScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const [activeSubject, setActiveSubject] = useState("Chemistry");
  const subjects = ["Physics", "Chemistry", "Mathematics"];

  const renderDemoContent = () => {
    switch (activeSubject) {
      case "Chemistry":
        return <ChemistryDemo />;
      case "Physics":
        return (
          <View style={styles.placeholderBox}>
            <Text style={styles.placeholderText}>Physics Demo Coming Soon</Text>
          </View>
        );
      case "Mathematics":
        return (
          <View style={styles.placeholderBox}>
            <Text style={styles.placeholderText}>Maths Demo Coming Soon</Text>
          </View>
        );
      default:
        return null;
    }
  };

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
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.subjectSelector}>
          {subjects.map((subject) => (
            <TouchableOpacity
              key={subject}
              style={[
                styles.subjectTab,
                activeSubject === subject && styles.activeSubjectTab,
              ]}
              onPress={() => setActiveSubject(subject)}
            >
              <Text
                style={[
                  styles.subjectText,
                  activeSubject === subject && styles.activeSubjectText,
                ]}
              >
                {subject}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {renderDemoContent()}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About {activeSubject}</Text>
          <Text style={styles.sectionText}>
            A brief description of the {activeSubject} demo models will go here,
            explaining the core concepts being visualized.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Interact with Models</Text>
          <View style={styles.interactionRow}>
            <View style={styles.interactionCard}>
              <Ionicons name="move-outline" size={24} color={colors.primary} />
              <Text style={styles.interactionText}>Drag to Rotate</Text>
            </View>
            <View style={styles.interactionCard}>
              <Ionicons name="scan-outline" size={24} color={colors.primary} />
              <Text style={styles.interactionText}>Pinch to Zoom</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    safeArea: { flex: 1 },
    container: { padding: 15 },
    subjectSelector: {
      flexDirection: "row",
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 4,
      marginBottom: 20,
    },
    subjectTab: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 6,
      alignItems: "center",
    },
    activeSubjectTab: {
      backgroundColor: colors.primary,
    },
    subjectText: {
      color: colors.textSecondary,
      fontWeight: "bold",
    },
    activeSubjectText: {
      color: colors.buttonText,
    },
    placeholderBox: {
      height: 350,
      backgroundColor: colors.card,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    placeholderText: {
      color: colors.textSecondary,
      fontSize: 16,
    },
    section: {
      marginTop: 25,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    sectionText: {
      color: colors.textSecondary,
      lineHeight: 22,
    },
    interactionRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    interactionCard: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 15,
      alignItems: "center",
      width: "48%",
    },
    interactionText: {
      marginTop: 8,
      color: colors.text,
      fontWeight: "500",
    },
  });

export default DemosScreen;
