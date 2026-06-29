import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { brand, fonts, themes } from '../constants/colors';
import { useKomorebi } from '../context/KomorebiContext';
import { MotionView, PressableScale, SpinningView } from '../components/komorebi/Motion';

export default function PlacementRoute() {
  const { state, selectPlacementMode, beginnerResult, setLoading } = useKomorebi();
  const theme = themes[state.theme];

  const startBeginner = () => {
    selectPlacementMode('beginner');
    setLoading('道のりを準備しています...');
    setTimeout(() => {
      setLoading(null);
      beginnerResult();
      router.push('/placement-result');
    }, 500);
  };

  const startExam = () => {
    selectPlacementMode('exam');
    router.push('/placement-exam');
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <MotionView animateKey="placement-copy" from="down" distance={12}>
          <Text style={[styles.title, { color: theme.text }]}>どこから始めますか。</Text>
          <Text style={[styles.subtitle, { color: theme.muted }]}>
            どちらを選んでも大丈夫です。物語の難しさはあなたに合わせます。
          </Text>
        </MotionView>

        <MotionView animateKey="placement-beginner" delay={80}>
          <PressableScale onPress={startBeginner} style={[styles.choice, { backgroundColor: theme.card, borderColor: theme.line }]}>
            <Text style={styles.kicker}>はじめて</Text>
            <Text style={[styles.choiceTitle, { color: theme.text }]}>最初から始める</Text>
            <Text style={[styles.choiceCopy, { color: theme.muted }]}>日本語を始めたばかりなら、やさしい物語から進みます。</Text>
          </PressableScale>
        </MotionView>

        <MotionView animateKey="placement-exam" delay={150}>
          <PressableScale onPress={startExam} style={[styles.choice, styles.featuredChoice, { backgroundColor: theme.card }]}>
            <Text style={styles.kicker}>少し読める</Text>
            <Text style={[styles.choiceTitle, { color: theme.text }]}>レベルを確認する</Text>
            <Text style={[styles.choiceCopy, { color: theme.muted }]}>短い確認で、最初の物語から読みやすく整えます。</Text>
          </PressableScale>
        </MotionView>
      </ScrollView>
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
    flexGrow: 1,
    padding: 28,
    paddingTop: 34,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 28,
    lineHeight: 35,
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 28,
    fontFamily: fonts.sans,
    fontSize: 15,
    lineHeight: 24,
  },
  choice: {
    borderWidth: 1.5,
    borderRadius: 18,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#1E1E24',
    shadowOpacity: 0.05,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
  },
  featuredChoice: {
    borderColor: brand.matcha,
    shadowColor: brand.matcha,
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
  },
  kicker: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 10.5,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: brand.matcha,
    marginBottom: 9,
  },
  choiceTitle: {
    fontFamily: fonts.serif,
    fontSize: 20,
    marginBottom: 6,
  },
  choiceCopy: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
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
