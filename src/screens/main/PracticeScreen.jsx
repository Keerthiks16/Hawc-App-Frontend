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

// --- A short, self-contained dummy quiz ---
const simpleQuiz = {
  title: "General Physics Quiz",
  questions: [
    {
      id: "q1",
      text: "Which of Newton's laws is also known as the law of inertia?",
      options: [
        { id: "a", text: "First Law" },
        { id: "b", text: "Second Law" },
        { id: "c", text: "Third Law" },
      ],
      correctAnswerId: "a",
    },
    {
      id: "q2",
      text: "What is the standard unit of measurement for Force?",
      options: [
        { id: "a", text: "Joule" },
        { id: "b", text: "Watt" },
        { id: "c", text: "Newton" },
      ],
      correctAnswerId: "c",
    },
    {
      id: "q3",
      text: "Work is done only when an object is...",
      options: [
        { id: "a", text: "Stationary" },
        { id: "b", text: "Displaced" },
        { id: "c", text: "Charged" },
      ],
      correctAnswerId: "b",
    },
  ],
};

const PracticeScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [results, setResults] = useState({});

  const question = simpleQuiz.questions[currentQuestionIndex];
  const progress =
    ((currentQuestionIndex + 1) / simpleQuiz.questions.length) * 100;
  const isAnswerChecked = results[currentQuestionIndex] !== undefined;

  const handleSelectOption = (optionId) => {
    if (isAnswerChecked) return; // Don't allow changing answer after checking
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionId,
    });
  };

  const handleCheckAnswer = () => {
    if (selectedAnswers[currentQuestionIndex]) {
      const isCorrect =
        selectedAnswers[currentQuestionIndex] === question.correctAnswerId;
      setResults({ ...results, [currentQuestionIndex]: isCorrect });
    }
  };

  const navigateQuestion = (direction) => {
    const newIndex = currentQuestionIndex + direction;
    if (newIndex >= 0 && newIndex < simpleQuiz.questions.length) {
      setCurrentQuestionIndex(newIndex);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={colors.gradients.appGradient}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.quizContainer}>
          <View style={styles.quizHeader}>
            <Text style={styles.quizHeaderText}>Practice Questions</Text>
            <View style={styles.questionCountBadge}>
              <Text style={styles.questionCountText}>
                Question {currentQuestionIndex + 1} of{" "}
                {simpleQuiz.questions.length}
              </Text>
            </View>
          </View>

          <Text style={styles.questionText}>{question.text}</Text>

          {question.options.map((option) => {
            const isSelected =
              selectedAnswers[currentQuestionIndex] === option.id;
            let optionStyle = [styles.optionContainer];
            if (isAnswerChecked) {
              if (option.id === question.correctAnswerId)
                optionStyle.push(styles.correctOption);
              else if (isSelected) optionStyle.push(styles.incorrectOption);
            } else if (isSelected) {
              optionStyle.push(styles.selectedOption);
            }
            return (
              <TouchableOpacity
                key={option.id}
                style={optionStyle}
                onPress={() => handleSelectOption(option.id)}
                disabled={isAnswerChecked}
              >
                <View
                  style={[
                    styles.radioOuter,
                    isSelected && { borderColor: colors.primary },
                  ]}
                >
                  {isSelected && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.optionText}>{option.text}</Text>
              </TouchableOpacity>
            );
          })}

          <View style={styles.quizFooter}>
            <TouchableOpacity
              style={[
                styles.navButton,
                currentQuestionIndex === 0 && styles.disabledButton,
              ]}
              disabled={currentQuestionIndex === 0}
              onPress={() => navigateQuestion(-1)}
            >
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.checkButton,
                (!selectedAnswers[currentQuestionIndex] || isAnswerChecked) &&
                  styles.disabledButton,
              ]}
              onPress={handleCheckAnswer}
              disabled={
                !selectedAnswers[currentQuestionIndex] || isAnswerChecked
              }
            >
              <Text style={styles.checkButtonText}>Check Answer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.navButton,
                currentQuestionIndex === simpleQuiz.questions.length - 1 &&
                  styles.disabledButton,
              ]}
              disabled={
                currentQuestionIndex === simpleQuiz.questions.length - 1
              }
              onPress={() => navigateQuestion(1)}
            >
              <Text style={styles.navButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {Math.round(progress)}% Complete
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    safeArea: { flex: 1 },
    container: { padding: 15, flexGrow: 1, justifyContent: "center" },
    quizContainer: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 20,
    },
    quizHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    quizHeaderText: { fontSize: 16, color: colors.text, fontWeight: "600" },
    questionCountBadge: {
      backgroundColor: colors.primaryMuted,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 15,
    },
    questionCountText: {
      color: colors.primary,
      fontSize: 12,
      fontWeight: "bold",
    },
    questionText: {
      fontSize: 18,
      color: colors.text,
      marginBottom: 25,
      lineHeight: 26,
    },

    optionContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 15,
      marginBottom: 10,
    },
    selectedOption: {
      borderColor: colors.primary,
      backgroundColor: colors.primaryMuted,
    },
    correctOption: {
      borderColor: colors.success,
      backgroundColor: "rgba(16, 185, 129, 0.1)",
    },
    incorrectOption: {
      borderColor: colors.error,
      backgroundColor: "rgba(239, 68, 68, 0.1)",
    },
    radioOuter: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.border,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    radioInner: {
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: colors.primary,
    },
    optionText: { fontSize: 16, color: colors.text, flex: 1 },

    quizFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    navButton: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    navButtonText: { color: colors.textSecondary, fontWeight: "600" },
    checkButton: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      backgroundColor: colors.primary,
    },
    checkButtonText: { color: colors.buttonText, fontWeight: "bold" },
    disabledButton: { opacity: 0.5 },

    progressBarContainer: {
      height: 8,
      backgroundColor: colors.border,
      borderRadius: 4,
      marginTop: 25,
      overflow: "hidden",
    },
    progressBar: { height: "100%", backgroundColor: colors.primary },
    progressText: {
      color: colors.textSecondary,
      fontSize: 12,
      alignSelf: "flex-end",
      marginTop: 5,
    },
  });

export default PracticeScreen;
