import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QuizQuestion } from '../components/QuizQuestion';
import { colors } from '../constants/colors';
import { quizQuestions } from '../constants/data';
import { useTrilingoContext } from '../context/TrilingoContext';

export default function QuizScreen() {
  const { state, completeQuiz } = useTrilingoContext();
  const [selections, setSelections] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (!state.storyCompleted) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.gateContainer}>
          <Text style={styles.gateTitle}>Complete a story first</Text>
          <Text style={styles.gateCopy}>
            Read a story in the Story tab to unlock the comprehension quiz.
          </Text>
          <TouchableOpacity style={styles.btn} onPress={() => router.replace('/story')} activeOpacity={0.85}>
            <Text style={styles.btnText}>Go to Story</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  function handleSelect(index: number, answer: string) {
    if (submitted) return;
    setSelections((prev) => ({ ...prev, [index]: answer }));
  }

  function handleSubmit() {
    const correct = quizQuestions.reduce(
      (acc, q, i) => acc + (selections[i] === q.answer ? 1 : 0),
      0,
    );
    setScore(correct);
    setSubmitted(true);
    completeQuiz(correct);
  }

  const allAnswered = quizQuestions.every((_, i) => selections[i] !== undefined);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Japanese quiz</Text>
          <Text style={styles.heroTitle}>Test what you learned from the Japanese story.</Text>
          <Text style={styles.heroCopy}>
            A quick check after the story helps cement the new Japanese words in context.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Comprehension quiz</Text>
          <Text style={styles.cardCopy}>
            Answer four simple questions based on the Japanese target vocabulary in your current story.
          </Text>

          {quizQuestions.map((question, i) => (
            <QuizQuestion
              key={i}
              question={question}
              index={i}
              selected={selections[i] ?? null}
              onSelect={(answer) => handleSelect(i, answer)}
            />
          ))}

          {!submitted ? (
            <TouchableOpacity
              style={[styles.btn, !allAnswered && styles.btnDisabled]}
              onPress={handleSubmit}
              disabled={!allAnswered}
              activeOpacity={0.85}
            >
              <Text style={styles.btnText}>Submit quiz</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <View style={[styles.resultBox, score >= 3 ? styles.resultSuccess : styles.resultError]}>
                <Text style={[styles.resultText, score >= 3 ? styles.resultTextSuccess : styles.resultTextError]}>
                  {score >= 3
                    ? `Nice work! You scored ${score}/4 and earned 5 new words.`
                    : `You scored ${score}/4. Try another story and keep going.`}
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.btn, styles.btnSecondary]}
                onPress={() => router.replace('/dashboard')}
                activeOpacity={0.85}
              >
                <Text style={styles.btnSecondaryText}>View Dashboard</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: { padding: 20, paddingBottom: 40 },
  gateContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gateTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  gateCopy: {
    fontSize: 15,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  hero: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#112647',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },
  eyebrow: {
    fontSize: 13,
    color: colors.muted,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    lineHeight: 30,
    marginBottom: 10,
  },
  heroCopy: { fontSize: 14, color: colors.muted, lineHeight: 22 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#112647',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  cardCopy: { fontSize: 14, color: colors.muted, lineHeight: 22, marginBottom: 20 },
  btn: {
    backgroundColor: colors.accent,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: 'rgba(90, 194, 133, 0.4)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
    marginTop: 8,
  },
  btnDisabled: { opacity: 0.5 },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  btnSecondary: {
    backgroundColor: '#f5f8ff',
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    marginTop: 10,
  },
  btnSecondaryText: { color: colors.text, fontWeight: '700', fontSize: 16 },
  resultBox: {
    padding: 16,
    borderRadius: 18,
    marginTop: 16,
    marginBottom: 4,
    borderWidth: 1,
  },
  resultSuccess: {
    backgroundColor: colors.accentSoft,
    borderColor: 'rgba(90, 194, 133, 0.2)',
  },
  resultError: {
    backgroundColor: colors.dangerSoft,
    borderColor: 'rgba(222, 75, 69, 0.2)',
  },
  resultText: { fontSize: 15, lineHeight: 22 },
  resultTextSuccess: { color: colors.accent2 },
  resultTextError: { color: colors.danger },
});
