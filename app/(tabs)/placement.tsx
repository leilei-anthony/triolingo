import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DiagnosticParagraph } from '../../components/DiagnosticParagraph';
import { colors } from '../../constants/colors';
import { diagnosticParagraphs } from '../../constants/data';
import { useTrilingoContext } from '../../context/TrilingoContext';
import type { JLPTLevel } from '../../types';
import { calculateJLPTLevel } from '../../utils/tokenizer';

const levels: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2'];

export default function PlacementScreen() {
  const { state, submitPlacement, setDiagnosticLevel, setDiagnosticUnknowns } = useTrilingoContext();
  const [unknowns, setUnknowns] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const currentLevel = state.currentDiagnosticLevel;
  const diagnosticText = diagnosticParagraphs[currentLevel];

  function handleLevelSelect(level: JLPTLevel) {
    setDiagnosticLevel(level);
    setUnknowns([]);
    setResult(null);
  }

  function handleUnknownsChange(words: string[]) {
    setUnknowns(words);
    setDiagnosticUnknowns(words);
  }

  function handleSubmit() {
    const placed = calculateJLPTLevel(currentLevel, unknowns);
    submitPlacement(placed);
    setResult(placed);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>JLPT placement</Text>
          <Text style={styles.heroTitle}>Find the right level for your Japanese reading journey.</Text>
          <Text style={styles.heroCopy}>
            Select your starting level, then tap any words you don't understand and submit.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Choose your starting level</Text>
          <View style={styles.levelRow}>
            {levels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[styles.levelChip, currentLevel === level && styles.levelChipActive]}
                onPress={() => handleLevelSelect(level)}
                activeOpacity={0.75}
              >
                <Text style={[styles.levelChipText, currentLevel === level && styles.levelChipTextActive]}>
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Diagnostic paragraph</Text>
          <Text style={styles.instructionText}>
            Tap any words you do not understand — they will turn red.
          </Text>
          <View style={styles.diagnosticBlock}>
            <DiagnosticParagraph text={diagnosticText} onUnknownsChange={handleUnknownsChange} />
          </View>

          {unknowns.length > 0 && (
            <Text style={styles.unknownCount}>
              {unknowns.length} unfamiliar {unknowns.length === 1 ? 'word' : 'words'} marked
            </Text>
          )}

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
            <Text style={styles.submitBtnText}>Submit placement</Text>
          </TouchableOpacity>

          {result && (
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>
                You are placed at{' '}
                <Text style={styles.resultLevel}>{result}</Text>. You marked {unknowns.length}{' '}
                unfamiliar {unknowns.length === 1 ? 'word' : 'words'} in the diagnostic paragraph.
              </Text>
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
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    marginTop: 4,
  },
  levelRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  levelChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#f2f7ff',
    borderWidth: 1,
    borderColor: colors.border,
  },
  levelChipActive: {
    backgroundColor: colors.accentSoft,
    borderColor: 'rgba(90, 194, 133, 0.3)',
  },
  levelChipText: { fontSize: 14, fontWeight: '700', color: colors.text },
  levelChipTextActive: { color: colors.accent2 },
  instructionText: { fontSize: 14, color: colors.muted, marginBottom: 12 },
  diagnosticBlock: {
    padding: 18,
    borderRadius: 20,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
  },
  unknownCount: { fontSize: 13, color: colors.muted, marginBottom: 14 },
  submitBtn: {
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
  submitBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  resultBox: {
    marginTop: 16,
    padding: 16,
    borderRadius: 18,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: 'rgba(90, 194, 133, 0.2)',
  },
  resultText: { fontSize: 15, color: colors.accent2, lineHeight: 22 },
  resultLevel: { fontWeight: '800' },
});
