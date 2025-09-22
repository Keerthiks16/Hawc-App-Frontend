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
import { useTheme } from "../../contexts/ThemeContext";

// Helper component for the pricing cards
const PriceCard = ({
  title,
  price,
  period,
  isRecommended,
  isSelected,
  onPress,
  offPercentage,
  freePeriod,
  colors,
  isDarkTheme,
}) => {
  const styles = getStyles(colors);

  // Conditionally select styles based on theme and selection status
  const cardStyle = [
    styles.card,
    isSelected &&
      (isDarkTheme ? styles.selectedCardDark : styles.selectedCardLight),
  ];
  const titleStyle = [
    styles.cardTitle,
    isSelected && !isDarkTheme && { color: colors.card },
  ];
  const priceStyle = [
    styles.price,
    isSelected && !isDarkTheme && { color: "#65c7f7" },
  ];
  const periodStyle = [
    styles.period,
    isSelected && !isDarkTheme && { color: colors.textSecondary },
  ];
  const offerStyle = [
    styles.offerText,
    isSelected && !isDarkTheme && { color: colors.textSecondary },
  ];
  const freePeriodStyle = [
    styles.freePeriodText,
    isSelected && !isDarkTheme && { color: colors.accent },
  ];
  const radioOuterStyle = [
    styles.radioOuter,
    isSelected && styles.radioOuterSelected,
    isSelected && !isDarkTheme && { borderColor: colors.card },
  ];
  const radioInnerStyle = [
    styles.radioInner,
    isSelected && !isDarkTheme && { backgroundColor: colors.card },
  ];

  return (
    <TouchableOpacity
      style={[cardStyle, { backgroundColor: "black" }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {isRecommended && (
        <View style={styles.recommendedBadge}>
          <Text style={styles.recommendedText}>Recommended</Text>
        </View>
      )}
      <View style={styles.radioContainer}>
        <View style={radioOuterStyle}>
          {isSelected && <View style={radioInnerStyle} />}
        </View>
        <Text style={[titleStyle, { color: "white" }]}>{title}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={priceStyle}>
          {price !== "0" ? "₹" : ""} {price}
        </Text>
        <Text style={periodStyle}>{period}</Text>
      </View>
      {offPercentage && (
        <Text style={offerStyle}>
          <Text
            style={[
              styles.originalPrice,
              isSelected && !isDarkTheme && { color: colors.textSecondary },
            ]}
          >
            ₹6000{" "}
          </Text>
          <Text style={styles.offPercentage}>{offPercentage} off</Text>
        </Text>
      )}
      {freePeriod && <Text style={freePeriodStyle}>{freePeriod} free</Text>}
    </TouchableOpacity>
  );
};

// Helper component for individual subject selection
const SubjectSelectionCard = ({
  subjectName,
  iconName,
  isSelected,
  onPress,
  colors,
}) => {
  const styles = getStyles(colors);
  return (
    <TouchableOpacity
      style={[styles.subjectCard, isSelected && styles.subjectCardSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.subjectIconContainer}>
        <Ionicons
          name={iconName}
          size={40}
          color={isSelected ? colors.card : colors.text}
        />
      </View>
      <Text style={[styles.subjectName, isSelected && { color: colors.card }]}>
        {subjectName}
      </Text>
      {isSelected && (
        <View style={styles.subjectCheckmark}>
          <Ionicons name="checkmark-circle" size={24} color={colors.card} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const PlansScreen = () => {
  const { colors, isDarkTheme } = useTheme();
  const styles = getStyles(colors);

  const [selectedPlanId, setSelectedPlanId] = useState("free");
  const [selectedSubjects, setSelectedSubjects] = useState({
    Chemistry: true,
    Physics: true,
    Maths: true,
  });
  const [activeToggle, setActiveToggle] = useState("adsFree");

  const plans = [
    { id: "free", title: "Free", price: "0", period: "/Month" },
    { id: "day-pass", title: "Day Pass", price: "199", period: "/Day" },
    {
      id: "standard-month",
      title: "Standard / Month",
      price: "3499",
      period: "/Month",
      isRecommended: true,
      offPercentage: "42%",
      freePeriod: "One week",
    },
    {
      id: "standard-year",
      title: "Standard / Year",
      price: "34990",
      period: "/Year",
      offPercentage: "17%",
      freePeriod: "Two months",
    },
  ];

  const subjectsData = [
    { name: "Chemistry", icon: "flask-outline" },
    { name: "Physics", icon: "magnet-outline" },
    { name: "Maths", icon: "calculator-outline" },
  ];

  const handleSelectPlan = (planId) => {
    setSelectedPlanId(planId);
  };

  const handleSelectSubject = (subjectName) => {
    setSelectedSubjects((prev) => ({
      ...prev,
      [subjectName]: !prev[subjectName],
    }));
  };

  const handleSelectAllSubjects = () => {
    const allSelected = Object.values(selectedSubjects).every(Boolean);
    const newSelection = {};
    subjectsData.forEach((subject) => {
      newSelection[subject.name] = !allSelected;
    });
    setSelectedSubjects(newSelection);
  };

  const calculateTotalPrice = () => {
    const selectedPlan = plans.find((p) => p.id === selectedPlanId);
    if (!selectedPlan || selectedPlan.price === "0") return "0";
    const numberOfSelectedSubjects =
      Object.values(selectedSubjects).filter(Boolean).length;
    if (numberOfSelectedSubjects === 0) return "0";
    const basePrice = parseInt(selectedPlan.price.replace(/[^0-9]/g, ""));
    let calculatedPrice = 0;
    if (
      ["standard-month", "standard-year", "day-pass"].includes(selectedPlan.id)
    ) {
      calculatedPrice = basePrice * numberOfSelectedSubjects;
    }
    return calculatedPrice;
  };

  const showSubjectSelection = selectedPlanId !== "free";
  const currentTotalPrice = calculateTotalPrice();
  const numberOfSelectedSubjects =
    Object.values(selectedSubjects).filter(Boolean).length;
  const allSubjectsSelected = numberOfSelectedSubjects === subjectsData.length;

  const getSubjectIcon = (subjectName) => {
    switch (subjectName) {
      case "Chemistry":
        return "flask-outline";
      case "Physics":
        return "magnet-outline";
      case "Maths":
        return "calculator-outline";
      default:
        return "help-circle-outline";
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              activeToggle === "adsFree" && styles.toggleButtonActive,
            ]}
            onPress={() => setActiveToggle("adsFree")}
          >
            <Text
              style={[
                styles.toggleButtonText,
                activeToggle === "adsFree" && styles.toggleButtonTextActive,
              ]}
            >
              Ads Free
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              activeToggle === "premium" && styles.toggleButtonActive,
            ]}
            onPress={() => setActiveToggle("premium")}
          >
            <Text
              style={[
                styles.toggleButtonText,
                activeToggle === "premium" && styles.toggleButtonTextActive,
              ]}
            >
              Premium Model
            </Text>
          </TouchableOpacity>
        </View>

        {plans.map((plan) => (
          <PriceCard
            key={plan.id}
            {...plan}
            isSelected={selectedPlanId === plan.id}
            onPress={() => handleSelectPlan(plan.id)}
            colors={colors}
            isDarkTheme={isDarkTheme}
          />
        ))}

        {showSubjectSelection && (
          <View style={styles.subjectSelectionSection}>
            <View style={styles.subjectSelectionContainer}>
              <View style={styles.subjectSelectionHeader}>
                <Text style={styles.subjectSelectionTitle}>
                  Select Your ({numberOfSelectedSubjects}/{subjectsData.length})
                  Subjects
                </Text>
                <TouchableOpacity
                  onPress={handleSelectAllSubjects}
                  style={styles.selectAllButton}
                >
                  <Text style={styles.selectAllText}>Select All</Text>
                  <Ionicons
                    name={
                      allSubjectsSelected
                        ? "checkmark-circle"
                        : "square-outline"
                    }
                    size={20}
                    color={
                      allSubjectsSelected
                        ? colors.primary
                        : colors.textSecondary
                    }
                    style={{ marginLeft: 5 }}
                  />
                </TouchableOpacity>
              </View>

              {subjectsData.map((subject) => (
                <SubjectSelectionCard
                  key={subject.name}
                  subjectName={subject.name}
                  iconName={getSubjectIcon(subject.name)}
                  isSelected={selectedSubjects[subject.name]}
                  onPress={() => handleSelectSubject(subject.name)}
                  colors={colors}
                />
              ))}

              <View style={styles.totalPriceContainer}>
                <Text style={styles.totalPriceText}>Total Price: </Text>
                <Text style={styles.totalPriceValue}>
                  ₹ {currentTotalPrice}
                </Text>
              </View>
              <Text style={styles.priceDescription}>
                Premium Two-Teacher / Year × {numberOfSelectedSubjects} subjects
                (
                {numberOfSelectedSubjects === 1
                  ? "One subject"
                  : numberOfSelectedSubjects === 2
                    ? "Two subjects"
                    : "Three subjects"}{" "}
                pricing)
              </Text>

              <TouchableOpacity style={styles.checkoutButton}>
                {/* <LinearGradient
                  colors={colors.gradients.primary}
                  style={styles.checkoutButton}
                > */}
                <Text style={styles.checkoutButtonText}>
                  Continue to Checkout (₹ {currentTotalPrice})
                </Text>
                {/* </LinearGradient> */}
              </TouchableOpacity>
            </View>
          </View>
        )}
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
    scrollContent: {
      padding: 15,
      backgroundColor: "transparent",
    },
    toggleContainer: {
      flexDirection: "row",
      backgroundColor: "transparent",
      borderRadius: 25,
      padding: 4,
      alignSelf: "center",
      marginTop: 15,
      marginBottom: 20,
      gap: 15,
    },
    toggleButton: {
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 20,
      backgroundColor: colors.card,
    },
    toggleButtonActive: {
      backgroundColor: "#65c7f7",
    },
    toggleButtonText: {
      color: colors.textSecondary,
      fontWeight: "bold",
      fontSize: 14,
    },
    toggleButtonTextActive: {
      color: colors.textDecorationLine,
      fontWeight: "bold",
      fontSize: 14,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 20,
      marginBottom: 15,
      // borderWidth: 1,
      borderColor: colors.border,
    },
    selectedCardDark: {
      borderColor: "#65c7f7",
      borderWidth: 3,
    },
    selectedCardLight: {
      borderColor: "#65c7f7",
      borderWidth: 3,
      backgroundColor: colors.text,
    },
    recommendedBadge: {
      position: "absolute",
      top: -10,
      left: 20,
      backgroundColor: "#65c7f7",
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 5,
      zIndex: 1,
    },
    recommendedText: {
      color: "#01486bfc",
      fontSize: 10,
      fontWeight: "bold",
    },
    radioContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
    },
    radioOuter: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.textSecondary,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
    },
    radioOuterSelected: {
      borderColor: colors.primary,
    },
    radioInner: {
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: colors.primary,
    },
    cardTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "bold",
    },
    priceContainer: {
      flexDirection: "row",
      alignItems: "baseline",
      marginLeft: 30,
    },
    price: {
      color: "#65c7f7",
      fontSize: 22,
      fontWeight: "bold",
    },
    period: {
      color: colors.textSecondary,
      fontSize: 14,
      marginLeft: 5,
    },
    offerText: {
      marginLeft: 30,
      marginTop: 5,
      fontSize: 12,
    },
    originalPrice: {
      textDecorationLine: "line-through",
      color: colors.textSecondary,
    },
    offPercentage: {
      color: colors.primary,
      fontWeight: "bold",
    },
    freePeriodText: {
      marginLeft: 30,
      fontSize: 12,
      fontWeight: "600",
      color: colors.accent,
    },
    subjectSelectionSection: {
      backgroundColor: colors.backgroundMuted,
      marginHorizontal: -15,
      padding: 15,
    },
    subjectSelectionContainer: {
      backgroundColor: colors.card,
      borderRadius: 10,
      padding: 20,
    },
    subjectSelectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    subjectSelectionTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "bold",
    },
    selectAllButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 35,
    },
    selectAllText: {
      color: colors.text,
      fontWeight: "bold",
      fontSize: 14,
    },
    subjectCard: {
      backgroundColor: colors.primaryMuted,
      borderRadius: 10,
      padding: 20,
      marginBottom: 15,
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      borderWidth: 1,
      borderColor: "transparent",
    },
    subjectCardSelected: {
      backgroundColor: "#65c7f7",
      borderColor: colors.primary,
    },
    subjectIconContainer: {
      marginBottom: 5,
    },
    subjectName: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "bold",
    },
    subjectCheckmark: {
      position: "absolute",
      top: 10,
      right: 10,
    },
    totalPriceContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 20,
      marginBottom: 5,
    },
    totalPriceText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "bold",
    },
    totalPriceValue: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: "bold",
    },
    priceDescription: {
      color: colors.textSecondary,
      fontSize: 12,
      textAlign: "center",
      marginBottom: 20,
      lineHeight: 18,
    },
    checkoutButton: {
      paddingVertical: 15,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#65c7f7",
    },
    checkoutButtonText: {
      color: "#01486bfc",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

export default PlansScreen;
