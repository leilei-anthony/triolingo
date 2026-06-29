import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { brand, fonts, themes } from '../constants/colors';
import { GenreCard } from '../components/komorebi/GenreCard';
import { MotionView, PressableScale, SpinningView } from '../components/komorebi/Motion';
import { useKomorebi } from '../context/KomorebiContext';
import type { GenreId } from '../types';

export default function GenresRoute() {
  const { state, genres, selectGenres, setLoading } = useKomorebi();
  const theme = themes[state.theme];
  const canContinue = state.selectedGenres.length > 0;

  const toggleGenre = (id: GenreId) => {
    const selected = state.selectedGenres.includes(id);
    if (selected) {
      selectGenres(state.selectedGenres.filter((genreId) => genreId !== id));
      return;
    }
    selectGenres([...state.selectedGenres, id]);
  };

  const continueToApp = () => {
    if (!canContinue) return;
    setLoading('物語を用意しています...');
    setTimeout(() => {
      setLoading(null);
      router.replace('/app-main');
    }, 500);
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <MotionView animateKey="genres-copy" from="down" distance={12}>
          <Text style={[styles.title, { color: theme.text }]}>どんな物語が好きですか。</Text>
          <Text style={[styles.subtitle, { color: theme.muted }]}>三つまで選べます。最初の物語に反映します。</Text>
        </MotionView>

        <View style={styles.grid}>
          {genres.map((genre, index) => (
            <MotionView key={genre.id} animateKey={`genre-${genre.id}`} style={styles.genreCardMotion} delay={70 + index * 45} distance={14}>
              <GenreCard
                genre={genre}
                active={state.selectedGenres.includes(genre.id)}
                onPress={() => toggleGenre(genre.id)}
              />
            </MotionView>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: theme.bg }]}>
        <PressableScale
          onPress={continueToApp}
          disabled={!canContinue}
          style={[styles.primaryButton, { backgroundColor: canContinue ? brand.matcha : theme.line }]}
        >
          <Text style={[styles.primaryLabel, { color: canContinue ? brand.washi : theme.muted }]}>
            {canContinue ? '最初の物語を読む' : '一つ以上選んでください'}
          </Text>
        </PressableScale>
      </View>
      <LoadingOverlay />
    </SafeAreaView>
  );
}

function LoadingOverlay() {
  const { state } = useKomorebi();
  const theme = themes[state.theme];
  if (!state.loadingText) return null;

  return (
    <MotionView animateKey={state.loadingText} style={[styles.loadingOverlay, { backgroundColor: theme.bg }]} from="none" duration={240}>
      <SpinningView style={[styles.spinner, { borderColor: theme.line, borderTopColor: brand.matcha }]}>
        <View style={styles.spinnerDot} />
      </SpinningView>
      <Text style={[styles.loadingText, { color: theme.text }]}>{state.loadingText}</Text>
    </MotionView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 118,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 28,
    lineHeight: 35,
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 22,
    fontFamily: fonts.sans,
    fontSize: 15,
    lineHeight: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  genreCardMotion: {
    width: '48%',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 30,
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryLabel: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 15,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  spinner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: brand.matcha,
  },
  loadingText: {
    fontFamily: fonts.serifItalic,
    fontSize: 16,
  },
});
