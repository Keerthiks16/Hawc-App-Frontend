import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext"; // Ensure this path is correct

const { width } = Dimensions.get("window");

// Helper component for the segmented control tabs
const SegmentedControl = ({
  segments,
  activeSegment,
  onSelectSegment,
  colors,
}) => {
  const styles = getStyles(colors);
  return (
    <View style={styles.segmentedControlContainer}>
      {segments.map((segment) => (
        <TouchableOpacity
          key={segment}
          style={[
            styles.segmentButton,
            activeSegment === segment && styles.segmentButtonActive,
          ]}
          onPress={() => onSelectSegment(segment)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.segmentText,
              activeSegment === segment && styles.segmentTextActive,
            ]}
          >
            {segment}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Helper component for the dropdown selector
const DropdownSelector = ({
  label,
  options,
  selectedOption,
  onSelectOption,
  colors,
}) => {
  const styles = getStyles(colors);
  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.dropdownLabel}>{label}</Text>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => {
          /* Implement actual dropdown logic */
        }}
      >
        <Text style={styles.dropdownButtonText}>{selectedOption}</Text>
        <Ionicons name="chevron-down" size={16} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

// Helper component for individual assignment cards
const AssignmentCard = ({ title, dueDate, status, priority, colors }) => {
  const styles = getStyles(colors);

  const getStatusStyle = (s) => {
    let backgroundColor = colors.warning; // Default to warning
    let textColor = colors.text;

    switch (s.toLowerCase()) {
      case "pending":
        backgroundColor = colors.warning; // Yellow
        textColor = colors.text;
        break;
      case "completed":
        backgroundColor = colors.success; // Green
        textColor = colors.card; // White for contrast
        break;
      case "late":
        backgroundColor = colors.error; // Red
        textColor = colors.card; // White for contrast
        break;
    }
    return { backgroundColor, color: textColor };
  };

  const getPriorityStyle = (p) => {
    let backgroundColor = colors.info; // Default
    let textColor = colors.card;

    switch (p.toLowerCase()) {
      case "high":
        backgroundColor = colors.error; // Red
        break;
      case "medium":
        backgroundColor = colors.primary; // Blue
        break;
      case "low":
        backgroundColor = colors.accent; // Green
        break;
    }
    return { backgroundColor, color: textColor };
  };

  const statusStyles = getStatusStyle(status);
  const priorityStyles = getPriorityStyle(priority);

  return (
    <View style={styles.assignmentCard}>
      <Text style={styles.assignmentTitle}>{title}</Text>
      <Text style={styles.assignmentDueDate}>Due: {dueDate}</Text>
      <View style={styles.tagsContainer}>
        <View
          style={[
            styles.tag,
            { backgroundColor: statusStyles.backgroundColor },
          ]}
        >
          <Text style={[styles.tagText, { color: statusStyles.color }]}>
            {status}
          </Text>
        </View>
        <View
          style={[
            styles.tag,
            { backgroundColor: priorityStyles.backgroundColor },
          ]}
        >
          <Text style={[styles.tagText, { color: priorityStyles.color }]}>
            {priority}
          </Text>
        </View>
      </View>
    </View>
  );
};

// Helper component for the statistics cards
const StatCard = ({ label, count, backgroundColor, colors }) => {
  const styles = getStyles(colors);
  return (
    <View style={[styles.statCard, { backgroundColor }]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statCount}>{count}</Text>
    </View>
  );
};

const AssignmentsScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const [activeSegment, setActiveSegment] = useState("Pending"); // Default to Pending
  const [sortBy, setSortBy] = useState("Due Date");

  const assignments = [
    {
      id: "1",
      title: "React Component Development",
      dueDate: "Jun 15, 2023",
      status: "pending",
      priority: "high",
    },
    {
      id: "2",
      title: "Testing Implementation",
      dueDate: "Jun 18, 2023",
      status: "pending",
      priority: "medium",
    },
    {
      id: "3",
      title: "UI/UX Design Review",
      dueDate: "Jun 20, 2023",
      status: "pending",
      priority: "low",
    },
    {
      id: "4",
      title: "Database Schema Design",
      dueDate: "Jun 10, 2023",
      status: "completed",
      priority: "high",
    },
    {
      id: "5",
      title: "API Integration",
      dueDate: "Jun 12, 2023",
      status: "late",
      priority: "high",
    },
  ];

  const filteredAssignments = assignments.filter((assignment) => {
    if (activeSegment === "All") return true;
    return assignment.status.toLowerCase() === activeSegment.toLowerCase();
  });

  const getSortedAssignments = (assignmentsData) => {
    // Basic sorting by due date for demonstration
    return [...assignmentsData].sort((a, b) => {
      if (sortBy === "Due Date") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      // Add other sorting logic here if needed
      return 0;
    });
  };

  const sortedAndFilteredAssignments =
    getSortedAssignments(filteredAssignments);

  const lateCount = assignments.filter((a) => a.status === "late").length;
  const pendingCount = assignments.filter((a) => a.status === "pending").length;
  const completedCount = assignments.filter(
    (a) => a.status === "completed"
  ).length;

  return (
    <LinearGradient
      colors={[
        colors.gradients.appGradient[1],
        colors.gradients.appGradient[0],
        colors.gradients.appGradient[1],
      ]}
      locations={[0, 0.5, 1]}
      style={styles.fullScreenGradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerControls}>
          <SegmentedControl
            segments={["All", "Pending", "Completed", "Late"]}
            activeSegment={activeSegment}
            onSelectSegment={setActiveSegment}
            colors={colors}
          />
        </View>
        <View style={{ marginBottom: 15 }}>
          <DropdownSelector
            label="Sort by:"
            options={["Due Date", "Priority", "Title"]}
            selectedOption={sortBy}
            onSelectOption={setSortBy}
            colors={colors}
          />
        </View>

        {sortedAndFilteredAssignments.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            title={assignment.title}
            dueDate={assignment.dueDate}
            status={assignment.status}
            priority={assignment.priority}
            colors={colors}
          />
        ))}

        <Text style={styles.sectionTitle}>Assignment Statistics</Text>
        <View style={styles.statsContainer}>
          <StatCard
            label="Late"
            count={lateCount}
            backgroundColor={colors.error}
            colors={colors}
          />
          <StatCard
            label="Pending"
            count={pendingCount}
            backgroundColor={colors.warning}
            colors={colors}
          />
          <StatCard
            label="Completed"
            count={completedCount}
            backgroundColor={colors.success}
            colors={colors}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    fullScreenGradient: {
      flex: 1,
    },
    container: {
      padding: 15,
      paddingBottom: 30, // Give some space at the bottom
    },
    headerControls: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      backgroundColor: colors.card, // Header controls background
      borderRadius: 10,
      padding: 10,
    },
    segmentedControlContainer: {
      flexDirection: "row",
      backgroundColor: colors.background, // Use background for inner segment bg
      borderRadius: 8,
      overflow: "hidden",
      flex: 1, // Take available space
      marginRight: 10,
    },
    segmentButton: {
      flex: 1,
      paddingVertical: 8,
      alignItems: "center",
      borderRadius: 8, // Rounded segments
    },
    segmentButtonActive: {
      backgroundColor: colors.primary,
    },
    segmentText: {
      color: colors.textSecondary,
      fontWeight: "600",
      fontSize: 13,
    },
    segmentTextActive: {
      color: colors.card,
    },
    dropdownContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background, // Dropdown button background
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
    dropdownLabel: {
      color: colors.textSecondary,
      marginRight: 5,
      fontSize: 13,
    },
    dropdownButton: {
      flexDirection: "row",
      alignItems: "center",
    },
    dropdownButtonText: {
      color: colors.text,
      marginRight: 5,
      fontSize: 13,
      fontWeight: "600",
    },
    assignmentCard: {
      backgroundColor: colors.card,
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
    },
    assignmentTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 5,
    },
    assignmentDueDate: {
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: 10,
    },
    tagsContainer: {
      flexDirection: "row",
      position: "absolute", // Position tags absolutely
      right: 15,
      top: 15,
    },
    tag: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 5,
      marginLeft: 8,
    },
    tagText: {
      fontSize: 10,
      fontWeight: "bold",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginTop: 20,
      marginBottom: 15,
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "wrap", // Allow cards to wrap to the next line
    },
    statCard: {
      borderRadius: 10,
      padding: 15,
      width: (width - 45) / 3, // Roughly 1/3 of screen width minus padding/margin
      marginBottom: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    statLabel: {
      fontSize: 12,
      color: colors.card,
      marginBottom: 5,
    },
    statCount: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.card,
    },
  });

export default AssignmentsScreen;
