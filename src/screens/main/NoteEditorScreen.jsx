import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// 1. IMPORT SafeAreaView from 'react-native-safe-area-context'
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";

const NoteEditorScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const navigation = useNavigation();
  const route = useRoute();

  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (route.params?.note) {
      const existingNote = route.params.note;
      setNote(existingNote);
      setTitle(existingNote.title);
      setContent(existingNote.content);
    }
  }, [route.params?.note]);

  const handleSaveNote = async () => {
    if (!content.trim()) {
      Alert.alert("Empty Note", "Please write something before saving.");
      return;
    }

    try {
      const savedNotes = await AsyncStorage.getItem("user_notes");
      let notes = savedNotes ? JSON.parse(savedNotes) : [];
      const noteTitle = title.trim() || "Untitled Document";

      if (note) {
        notes = notes.map((n) =>
          n.id === note.id
            ? {
                ...n,
                title: noteTitle,
                content: content.trim(),
                timestamp: new Date().toISOString(),
              }
            : n
        );
      } else {
        const newNote = {
          id: Date.now().toString(),
          title: noteTitle,
          content: content.trim(),
          timestamp: new Date().toISOString(),
        };
        notes.unshift(newNote);
      }

      await AsyncStorage.setItem("user_notes", JSON.stringify(notes));
      navigation.goBack();
    } catch (error) {
      console.error("Failed to save note:", error);
      Alert.alert("Error", "Could not save the note.");
    }
  };

  return (
    // 2. This SafeAreaView will now work correctly
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.titleInput}
        placeholder="Title..."
        placeholderTextColor={colors.textSecondary}
        value={title}
        onChangeText={setTitle}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TextInput
          style={styles.contentInput}
          placeholder="Start writing..."
          placeholderTextColor={colors.textSecondary}
          value={content}
          onChangeText={setContent}
          multiline
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    saveButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    saveButtonText: { color: colors.buttonText, fontWeight: "bold" },
    titleInput: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.text,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    scrollContent: { padding: 15, flexGrow: 1 },
    contentInput: {
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
      flex: 1,
      textAlignVertical: "top",
    },
  });

export default NoteEditorScreen;
