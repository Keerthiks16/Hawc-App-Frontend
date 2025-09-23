import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

// --- Dummy data for lecturer's doubts ---
const doubtsData = [
  {
    id: "1",
    studentName: "Emily Davis",
    subject: "Physics",
    title: "Confusion about Lenz's Law",
    description:
      "I'm having trouble understanding how to determine the direction of the induced current. Can you provide more examples?",
    imageUri:
      "https://classroom-images.cdn.askfilo.com/classroom/1676964079082_vzbrmlsc_3722774.jpg", // Placeholder image URL
    timestamp: "2 hours ago",
    status: "unresolved",
  },
  {
    id: "2",
    studentName: "John Doe",
    subject: "Chemistry",
    title: "Isomerism in Alkanes",
    description:
      "How many structural isomers are possible for C5H12? I keep getting the wrong number.",
    imageUri: null,
    timestamp: "Yesterday",
    status: "unresolved",
  },
  {
    id: "3",
    studentName: "Jane Smith",
    subject: "Maths",
    title: "Integration by Parts",
    description:
      "The formula is a bit confusing. Is there an easier way to remember which function to choose as 'u'?",
    imageUri: null,
    timestamp: "3 days ago",
    status: "resolved",
  },
];

// --- Helper component for a single doubt card ---
const DoubtCard = ({ doubt, colors }) => {
  const styles = getStyles(colors);
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.studentInfo}>
          <Ionicons
            name="person-circle-outline"
            size={20}
            color={colors.textSecondary}
          />
          <Text style={styles.studentName}>{doubt.studentName}</Text>
        </View>
        <Text style={styles.subjectText}>{doubt.subject}</Text>
      </View>
      <Text style={styles.doubtTitle}>{doubt.title}</Text>
      <Text style={styles.doubtDescription} numberOfLines={2}>
        {doubt.description}
      </Text>
      {doubt.imageUri && (
        <Image source={{ uri: doubt.imageUri }} style={styles.doubtImage} />
      )}
      <View style={styles.cardFooter}>
        <Text style={styles.timestamp}>{doubt.timestamp}</Text>
        <TouchableOpacity style={styles.replyButton}>
          <Text style={styles.replyButtonText}>View & Reply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LecturerDoubtScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  // State to manage which tab is active
  const [activeTab, setActiveTab] = useState("Unresolved");
  const tabs = ["Unresolved", "Resolved"];

  // Filter doubts based on the active tab
  const filteredDoubts = doubtsData.filter(
    (d) => d.status.toLowerCase() === activeTab.toLowerCase()
  );

  const ListHeader = () => (
    <>
      <Text style={styles.title}>Doubts Received</Text>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, isActive && styles.activeTabButton]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={colors.gradients.appGradient}
        style={StyleSheet.absoluteFill}
      />
      <FlatList
        data={filteredDoubts}
        renderItem={({ item }) => <DoubtCard doubt={item} colors={colors} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No {activeTab.toLowerCase()} doubts.
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    safeArea: { flex: 1 },
    listContainer: { padding: 20 },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 20,
    },
    tabContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    tabButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      marginRight: 10,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    activeTabButton: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    tabText: {
      color: colors.text,
      fontWeight: "600",
    },
    activeTabText: {
      color: colors.buttonText,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 15,
      marginBottom: 15,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    studentInfo: {
      flexDirection: "row",
      alignItems: "center",
    },
    studentName: {
      color: colors.text,
      marginLeft: 8,
      fontWeight: "500",
    },
    subjectText: {
      color: colors.textSecondary,
      fontSize: 12,
      fontWeight: "600",
    },
    doubtTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 8,
    },
    doubtDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    doubtImage: {
      width: "100%",
      height: 150,
      borderRadius: 8,
      marginTop: 15,
    },
    cardFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 15,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 10,
    },
    timestamp: {
      color: colors.textSecondary,
      fontSize: 12,
    },
    replyButton: {
      backgroundColor: colors.primary,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 6,
    },
    replyButtonText: {
      color: colors.buttonText,
      fontWeight: "bold",
      fontSize: 12,
    },
    emptyContainer: {
      marginTop: 50,
      alignItems: "center",
    },
    emptyText: {
      color: colors.textSecondary,
      fontSize: 16,
    },
  });

export default LecturerDoubtScreen;
