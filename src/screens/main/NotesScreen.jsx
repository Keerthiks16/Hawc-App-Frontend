import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

const NotesScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const navigation = useNavigation();
  const [notes, setNotes] = useState([]);

  const loadNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem("user_notes");
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error("Failed to load notes:", error);
    }
  };

  // useFocusEffect will run every time the screen comes into view
  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  const handleDelete = (noteId) => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const updatedNotes = notes.filter((note) => note.id !== noteId);
          await AsyncStorage.setItem(
            "user_notes",
            JSON.stringify(updatedNotes)
          );
          setNotes(updatedNotes);
        },
      },
    ]);
  };

  const NoteItem = ({ item }) => (
    <TouchableOpacity
      style={styles.noteItem}
      onPress={() => navigation.navigate("NoteEditor", { note: item })}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.noteTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.noteContent} numberOfLines={1}>
          {item.content}
        </Text>
        <Text style={styles.noteTimestamp}>
          {new Date(item.timestamp).toLocaleDateString()}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleDelete(item.id)}
        style={{ padding: 8 }}
      >
        <Ionicons name="trash-outline" size={20} color={colors.textSecondary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={colors.gradients.appGradient}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notes</Text>
        <TouchableOpacity
          style={styles.newNoteButton}
          onPress={() => navigation.navigate("NoteEditor")}
        >
          <Ionicons name="add" size={18} color={colors.buttonText} />
          <Text style={styles.newNoteButtonText}>New Note</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {notes.length === 0 ? (
          <View style={styles.placeholderContainer}>
            <Ionicons
              name="document-text-outline"
              size={60}
              color={colors.textSecondary}
            />
            <Text style={styles.placeholderTitle}>Select a note</Text>
            <Text style={styles.placeholderSubtitle}>
              Choose an existing note or create a new one to start writing
            </Text>
          </View>
        ) : (
          <FlatList
            data={notes}
            renderItem={NoteItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    safeArea: { flex: 1 },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15,
    },
    headerTitle: { fontSize: 24, fontWeight: "bold", color: colors.text },
    newNoteButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
    },
    newNoteButtonText: {
      color: colors.buttonText,
      fontWeight: "bold",
      marginLeft: 4,
    },
    container: { flex: 1, padding: 15, paddingTop: 0 },
    listContainer: { paddingTop: 10 },
    placeholderContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      opacity: 0.7,
    },
    placeholderTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginTop: 16,
    },
    placeholderSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 8,
      textAlign: "center",
    },
    noteItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
    },
    noteTitle: { fontSize: 16, fontWeight: "bold", color: colors.text },
    noteContent: {
      fontSize: 14,
      color: colors.textSecondary,
      marginVertical: 4,
    },
    noteTimestamp: { fontSize: 12, color: colors.textSecondary, opacity: 0.8 },
  });

export default NotesScreen;
