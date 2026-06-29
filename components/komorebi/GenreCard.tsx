import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useKomorebi } from '../../context/KomorebiContext';
import type { Genre } from '../../types';
import { PressableScale } from './Motion';

export function GenreCard({ genre, active, onPress }: { genre: Genre; active: boolean; onPress: () => void }) {
  const { state } = useKomorebi();
  const theme = state.theme === 'dark' ? { card: '#27272F', line: 'rgba(236,230,218,0.14)', text: '#ECE6DA' } : state.theme === 'sepia' ? { card: '#FBF4E6', line: 'rgba(58,44,28,0.14)', text: '#3A2C1C' } : { card: '#FFFFFF', line: 'rgba(30,30,36,0.1)', text: '#1E1E24' };
  return (
    <PressableScale
      onPress={onPress}
      style={[
        styles.card,
        { backgroundColor: theme.card, borderColor: active ? genre.accent : theme.line },
        active && { shadowColor: genre.accent, shadowOpacity: 0.15 },
      ]}
    >
      <Text style={[styles.jp, { color: active ? genre.accent : theme.text }]}>{genre.japanese}</Text>
      <Text style={[styles.en, { color: theme.text }]}>{genre.english}</Text>
      <View style={[styles.dot, { backgroundColor: genre.accent }]} />
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 112,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    justifyContent: 'space-between',
  },
  jp: {
    fontFamily: 'NotoSerifJP_500Medium',
    fontSize: 22,
  },
  en: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 13,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    alignSelf: 'flex-end',
  },
});
