import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// --- 1. Import the useTheme hook and remove the static Colors import ---
import ChapterList from "../../components/content/ChapterList";
import { useTheme } from "../../contexts/ThemeContext";
import { appData } from "../../data/dummyData";

const subjects = appData.subjects;
const carouselData = appData.featuredCarousel;
const { width: screenWidth } = Dimensions.get("window");

const HomeScreen = () => {
  // --- 2. Get the dynamic colors object from the theme context ---
  const { colors } = useTheme();

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const flatListRef = useRef(null);

  const activeSlideData = carouselData[activeIndex];
  const subjectChapters = appData.chaptersBySubject[selectedSubject] || [];

  const CarouselItem = ({ item }) => (
    <View style={styles.carouselItemContainer}>
      <Image source={item.image} style={styles.carouselImage} />
    </View>
  );

  return (
    // --- 3. Update all styles to use the dynamic `colors` object ---
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: colors.gradients.appGradient[1] },
      ]}
    >
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
        {/* Carousel Section */}
        <FlatList
          ref={flatListRef}
          data={carouselData}
          renderItem={CarouselItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / screenWidth
            );
            setActiveIndex(index);
          }}
          style={styles.carouselFlatList}
        />
        <View style={[styles.pagination, { backgroundColor: colors.card }]}>
          {carouselData.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    i === activeIndex ? colors.primary : colors.border,
                },
              ]}
            />
          ))}
        </View>

        {/* Details Section */}
        <View style={[styles.detailsSection, { backgroundColor: colors.card }]}>
          <Text style={[styles.detailsTitle, { color: colors.text }]}>
            {activeSlideData.title}
          </Text>
          <View style={styles.metadataContainer}>
            <View style={styles.metadataItem}>
              <Ionicons
                name="calendar-outline"
                size={14}
                color={colors.textSecondary}
              />
              <Text
                style={[styles.metadataText, { color: colors.textSecondary }]}
              >
                {activeSlideData.date}
              </Text>
            </View>
            <View style={styles.metadataItem}>
              <Ionicons
                name="time-outline"
                size={14}
                color={colors.textSecondary}
              />
              <Text
                style={[styles.metadataText, { color: colors.textSecondary }]}
              >
                {activeSlideData.time}
              </Text>
            </View>
            <View style={styles.metadataItem}>
              <Ionicons
                name="globe-outline"
                size={14}
                color={colors.textSecondary}
              />
              <Text
                style={[styles.metadataText, { color: colors.textSecondary }]}
              >
                {activeSlideData.language}
              </Text>
            </View>
          </View>
          <Text
            style={[styles.descriptionText, { color: colors.textSecondary }]}
          >
            {activeSlideData.description}
          </Text>
        </View>

        {/* Subject Selector Section */}
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Select Subject:
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: 15,
              paddingVertical: 5,
              paddingBottom: 25,
            }}
          >
            {subjects.map((subject) => (
              <TouchableOpacity
                key={subject}
                onPress={() => setSelectedSubject(subject)}
                style={[
                  styles.subjectButton,
                  { backgroundColor: colors.card, borderColor: colors.border },
                  selectedSubject === subject && {
                    backgroundColor: colors.text,
                    borderColor: colors.text,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.subjectButtonText,
                    { color: colors.text },
                    selectedSubject === subject && {
                      color: colors.card,
                    },
                  ]}
                >
                  {subject}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recorded Lectures Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {selectedSubject} Recorded Lectures
          </Text>
          {subjectChapters.length > 0 ? (
            subjectChapters.map((chapter) => (
              <ChapterList key={chapter.id} chapter={chapter} />
            ))
          ) : (
            <Text
              style={{ color: colors.textSecondary, paddingHorizontal: 20 }}
            >
              No lectures available for this subject yet.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- StyleSheet (Simplified to only contain structural styles) ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingBottom: 20,
    backgroundColor: "transparent",
  },
  carouselFlatList: { flexGrow: 0 },
  carouselItemContainer: { width: screenWidth, height: 200 },
  carouselImage: { width: "100%", height: "100%" },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
  detailsSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  detailsTitle: { fontSize: 24, fontWeight: "bold" },
  metadataContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  metadataItem: { flexDirection: "row", alignItems: "center", marginRight: 16 },
  metadataText: { marginLeft: 4, fontSize: 12 },
  descriptionText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  section: { paddingTop: 12 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  subjectButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
  },
  subjectButtonText: { fontWeight: "500" },
});

export default HomeScreen;
