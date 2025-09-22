import { FlatList, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext"; // 1. Import the useTheme hook
import VideoCard from "./VideoCard";

const ChapterList = ({ chapter }) => {
  // 2. Get the dynamic colors object from the theme context
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* 3. Use the dynamic colors object for styling */}
      <Text style={[styles.chapterTitle, { color: colors.text }]}>
        {chapter.title}
      </Text>

      <FlatList
        data={chapter.videos}
        renderItem={({ item }) => <VideoCard video={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 20, paddingTop: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 20,
  },
});

export default ChapterList;
