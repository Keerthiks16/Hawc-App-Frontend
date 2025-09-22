import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"; // Import the image picker
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

const subjects = ["Physics", "Chemistry", "Biology", "Zoology", "Maths"];

const DoubtsScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  // State for the form fields
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [doubtTitle, setDoubtTitle] = useState("");
  const [doubtDescription, setDoubtDescription] = useState("");
  const [attachedImage, setAttachedImage] = useState(null); // Will store the image URI

  // Function to handle image selection
  const handleImagePick = async () => {
    // Request permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAttachedImage(result.assets[0].uri);
    }
  };

  // Function to handle form submission
  const handleSubmitDoubt = () => {
    if (!doubtTitle.trim() || !doubtDescription.trim()) {
      Alert.alert(
        "Incomplete Form",
        "Please fill out the title and description for your doubt."
      );
      return;
    }

    // For now, we'll just show an alert with the data.
    // In a real app, you would send this to your backend API.
    const submittedData = {
      subject: selectedSubject,
      title: doubtTitle,
      description: doubtDescription,
      imageUri: attachedImage,
    };
    Alert.alert("Doubt Submitted!", JSON.stringify(submittedData, null, 2));

    // Reset the form
    setDoubtTitle("");
    setDoubtDescription("");
    setAttachedImage(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={colors.gradients.appGradient}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Ask a Doubt</Text>
        <Text style={styles.subtitle}>
          Select a subject and describe your question.
        </Text>

        {/* Subject Selector */}
        <View style={styles.section}>
          <Text style={styles.label}>Subject</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {subjects.map((subject) => (
              <TouchableOpacity
                key={subject}
                onPress={() => setSelectedSubject(subject)}
                style={[
                  styles.subjectButton,
                  selectedSubject === subject && styles.subjectButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.subjectButtonText,
                    selectedSubject === subject &&
                      styles.subjectButtonTextActive,
                  ]}
                >
                  {subject}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Doubt Title Input */}
        <View style={styles.section}>
          <Text style={styles.label}>Doubt Title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Problem with Newton's Third Law"
            placeholderTextColor={colors.inputPlaceholder}
            value={doubtTitle}
            onChangeText={setDoubtTitle}
          />
        </View>

        {/* Doubt Description Input */}
        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe your question in detail..."
            placeholderTextColor={colors.inputPlaceholder}
            value={doubtDescription}
            onChangeText={setDoubtDescription}
            multiline
          />
        </View>

        {/* Image Upload Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Attach an Image (Optional)</Text>
          {attachedImage ? (
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{ uri: attachedImage }}
                style={styles.imagePreview}
              />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => setAttachedImage(null)}
              >
                <Ionicons name="close-circle" size={24} color={colors.error} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleImagePick}
            >
              <Ionicons
                name="camera-outline"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.uploadButtonText}>Upload Image</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitDoubt}
        >
          <Text style={styles.submitButtonText}>Submit Doubt</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    safeArea: { flex: 1 },
    container: { padding: 20 },
    headerTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: { fontSize: 16, color: colors.textSecondary, marginBottom: 24 },
    section: { marginBottom: 20 },
    label: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.textSecondary,
      marginBottom: 10,
    },
    subjectButton: {
      backgroundColor: colors.card,
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 20,
      marginRight: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    subjectButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    subjectButtonText: { color: colors.text, fontWeight: "500" },
    subjectButtonTextActive: { color: colors.buttonText },
    input: {
      backgroundColor: colors.inputBackground,
      borderColor: colors.inputBorder,
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: colors.inputText,
    },
    textArea: {
      height: 120,
      textAlignVertical: "top",
    },
    uploadButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 1,
      borderStyle: "dashed",
      borderRadius: 8,
      padding: 20,
    },
    uploadButtonText: {
      color: colors.primary,
      marginLeft: 10,
      fontSize: 16,
      fontWeight: "bold",
    },
    imagePreviewContainer: {
      position: "relative",
    },
    imagePreview: {
      width: 100,
      height: 100,
      borderRadius: 8,
    },
    removeImageButton: {
      position: "absolute",
      top: -10,
      right: -10,
      backgroundColor: colors.card,
      borderRadius: 15,
    },
    submitButton: {
      backgroundColor: colors.primary,
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 20,
    },
    submitButtonText: {
      color: colors.buttonText,
      fontSize: 16,
      fontWeight: "bold",
    },
  });

export default DoubtsScreen;
