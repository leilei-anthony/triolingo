import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GenreChip } from '../../components/GenreChip';
import { StoryParagraph } from '../../components/StoryParagraph';
import { WordModal } from '../../components/WordModal';
import { colors } from '../../constants/colors';
import { genres, storyTemplates } from '../../constants/data';
import { useTrilingoContext } from '../../context/TrilingoContext';
import type { Genre, WordEntry } from '../../types';

export default function StoryScreen() {
  const { state, setGenre, completeStory } = useTrilingoContext();
  const [selectedWord, setSelectedWord] = useState<WordEntry | null>(null);

  const story = storyTemplates[state.genre];

  function handleGenreSelect(genre: Genre) {
    setGenre(genre);
  }

  function handleWordPress(entry: WordEntry) {
    setSelectedWord(entry);
  }

  function handleGoToQuiz() {
    completeStory();
    router.push('/quiz');
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Japanese story practice</Text>
          <Text style={styles.heroTitle}>
            Choose a genre and read a Japanese story tailored to your level.
          </Text>
          <Text style={styles.heroCopy}>
            The engine keeps the story clear while introducing a handful of new Japanese target words.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Story generator</Text>
          <Text style={styles.sectionCopy}>
            Pick your favorite mood and the system will craft a short, readable Japanese passage for you.
          </Text>

          <View style={styles.genreRow}>
            {genres.map((genre) => (
              <GenreChip
                key={genre}
                genre={genre}
                active={state.genre === genre}
                onPress={() => handleGenreSelect(genre)}
              />
            ))}
          </View>

          <View style={styles.storyBlock}>
            <Text style={styles.storyTitle}>{story.title}</Text>
            {story.body.map((paragraph, i) => (
              <StoryParagraph
                key={i}
                text={paragraph}
                words={story.words}
                onWordPress={handleWordPress}
              />
            ))}
          </View>

          <View style={styles.vocabSection}>
            <Text style={styles.vocabHeading}>Target words</Text>
            {story.words.map((w) => (
              <TouchableOpacity
                key={w.word}
                style={styles.vocabRow}
                onPress={() => setSelectedWord(w)}
                activeOpacity={0.75}
              >
                <Text style={styles.vocabWord}>{w.word}</Text>
                <Text style={styles.vocabReading}>({w.reading})</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.quizBtn} onPress={handleGoToQuiz} activeOpacity={0.85}>
            <Text style={styles.quizBtnText}>Take the comprehension quiz →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <WordModal word={selectedWord} onClose={() => setSelectedWord(null)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: { padding: 20, paddingBottom: 40 },
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  sectionCopy: { fontSize: 14, color: colors.muted, lineHeight: 22, marginBottom: 16 },
  genreRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  storyBlock: {
    padding: 18,
    borderRadius: 20,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#173152',
    marginBottom: 14,
  },
  vocabSection: { marginBottom: 20 },
  vocabHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.muted,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  vocabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  vocabWord: { fontSize: 16, fontWeight: '700', color: colors.accent2 },
  vocabReading: { fontSize: 14, color: colors.muted },
  quizBtn: {
    backgroundColor: colors.accent,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: 'rgba(90, 194, 133, 0.4)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
  },
  quizBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
