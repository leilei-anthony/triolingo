import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProgressBar } from '../../components/ProgressBar';
import { StatCard } from '../../components/StatCard';
import { colors } from '../../constants/colors';
import { useTrilingoContext } from '../../context/TrilingoContext';

export default function DashboardScreen() {
  const { state } = useTrilingoContext();
  const { level, wordsLearned, streak } = state;
  const progress = wordsLearned / 20;
  const atMilestone = wordsLearned >= 20;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Japanese progress</Text>
          <Text style={styles.heroTitle}>
            Track your Japanese vocabulary growth and reading momentum.
          </Text>
          <Text style={styles.heroCopy}>
            Your dashboard summarizes your current level, vocabulary, and streak in one clean view.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Japanese learning dashboard</Text>
          <Text style={styles.cardCopy}>
            Watch your Japanese progress increase as you complete stories and quizzes.
          </Text>

          <View style={styles.statsRow}>
            <StatCard label="JLPT sub-level" value={level} />
            <View style={styles.statSpacer} />
            <StatCard label="Vocabulary" value={String(wordsLearned)} />
          </View>
          <View style={[styles.statsRow, styles.statsRowSingle]}>
            <StatCard label="Reading streak" value={`${streak} days`} />
          </View>

          <View style={styles.milestoneCard}>
            <Text style={styles.milestoneTitle}>Milestone mastery</Text>
            <Text style={styles.milestoneCopy}>
              {atMilestone
                ? 'Milestone unlocked. Your mastery story is ready.'
                : `Collect ${20 - wordsLearned} more ${20 - wordsLearned === 1 ? 'word' : 'words'} to unlock a full mastery story.`}
            </Text>
            <View style={styles.progressRow}>
              <ProgressBar progress={progress} />
              <Text style={styles.progressLabel}>{wordsLearned} / 20 new words</Text>
            </View>
          </View>
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  cardCopy: { fontSize: 14, color: colors.muted, lineHeight: 22, marginBottom: 20 },
  statsRow: { flexDirection: 'row', marginBottom: 12 },
  statsRowSingle: { marginBottom: 20 },
  statSpacer: { width: 12 },
  milestoneCard: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(90, 194, 133, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(90, 194, 133, 0.16)',
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  milestoneCopy: { fontSize: 14, color: colors.muted, lineHeight: 22 },
  progressRow: { marginTop: 4 },
  progressLabel: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 6,
  },
});
