import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';

type NavCard = { title: string; description: string; route: string };

const cards: NavCard[] = [
  {
    title: 'Placement exam',
    description: 'Discover your level with a quick diagnostic and unlock stories that fit your current skill.',
    route: '/placement',
  },
  {
    title: 'Story generator',
    description: 'Pick a genre and read a short story that introduces just five new target words.',
    route: '/story',
  },
  {
    title: 'Dashboard',
    description: 'Track your Japanese JLPT sub-level, total vocabulary growth, and streak in one clean view.',
    route: '/dashboard',
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Learn Japanese through engaging stories</Text>
          <Text style={styles.heroTitle}>
            Read, learn, and keep going with Japanese stories built for your level.
          </Text>
          <Text style={styles.heroCopy}>
            Explore JLPT placement, Japanese story practice, quizzes, and your progress tracker as separate steps in your study flow.
          </Text>
        </View>

        {cards.map((card) => (
          <TouchableOpacity
            key={card.route}
            style={styles.card}
            onPress={() => router.push(card.route as any)}
            activeOpacity={0.85}
          >
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardDescription}>{card.description}</Text>
            <Text style={styles.cardLink}>Go →</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
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
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
    lineHeight: 34,
    marginBottom: 10,
  },
  heroCopy: {
    fontSize: 15,
    color: colors.muted,
    lineHeight: 24,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 22,
    marginBottom: 14,
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
  cardDescription: {
    fontSize: 14,
    color: colors.muted,
    lineHeight: 22,
    marginBottom: 14,
  },
  cardLink: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.accent2,
  },
});
