import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { brand, fonts, themes } from '../constants/colors';
import { MotionView, PressableScale, SpinningView } from '../components/komorebi/Motion';
import { ProgressStrip } from '../components/komorebi/ProgressStrip';
import { useKomorebi } from '../context/KomorebiContext';

export default function PlacementExamRoute() {
  const { state, placementExam, answerPlacement, nextPlacement, placeResult, setLoading } = useKomorebi();
  const theme = themes[state.theme];
  const question = placementExam[state.placementIndex];
  const selected = state.placementAnswers[question.id];
  const answered = selected !== undefined;
  const progress = (state.placementIndex + 1) / placementExam.length;

  const continueExam = () => {
    if (!answered) return;
    if (state.placementIndex < placementExam.length - 1) {
      nextPlacement();
      return;
    }

    setLoading('読解レベルを見ています...');
    setTimeout(() => {
      setLoading(null);
      placeResult();
      router.push('/placement-result');
    }, 500);
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.progressRow}>
          <View style={styles.progressGrow}>
            <ProgressStrip value={progress} />
          </View>
          <Text style={[styles.counter, { color: theme.muted }]}>
            {state.placementIndex + 1} / {placementExam.length}
          </Text>
        </View>

        {question.passage ? (
          <MotionView animateKey={`placement-passage-${question.id}`} style={[styles.passage, { backgroundColor: theme.card, borderColor: theme.line }]} distance={10}>
            <Text style={[styles.passageText, { color: theme.text }]}>{question.passage}</Text>
          </MotionView>
        ) : null}

        <MotionView animateKey={`placement-question-${question.id}`} distance={12}>
          <Text style={[styles.question, { color: theme.text }]}>{question.prompt}</Text>
        </MotionView>

        <View style={styles.options}>
          {question.options.map((option, index) => {
            const active = selected === index;
            return (
              <MotionView key={option} animateKey={`${question.id}-${option}`} delay={70 + index * 55} distance={12}>
                <PressableScale
                  onPress={() => answerPlacement(question.id, index)}
                  style={[
                    styles.option,
                    { backgroundColor: theme.card, borderColor: active ? brand.matcha : theme.line },
                    active && styles.optionActive,
                  ]}
                >
                  <Text style={[styles.optionText, { color: theme.text }]}>{option}</Text>
                </PressableScale>
              </MotionView>
            );
          })}
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: theme.bg }]}>
        <PressableScale
          onPress={continueExam}
          disabled={!answered}
          style={[styles.primaryButton, { backgroundColor: answered ? brand.matcha : theme.line }]}
        >
          <Text style={[styles.primaryLabel, { color: answered ? brand.washi : theme.muted }]}>
            {state.placementIndex < placementExam.length - 1 ? 'つづける' : 'レベルを見る'}
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
    flexGrow: 1,
    padding: 28,
    paddingTop: 26,
    paddingBottom: 118,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 26,
  },
  progressGrow: {
    flex: 1,
  },
  counter: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 12,
  },
  passage: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
  },
  passageText: {
    fontFamily: fonts.jpRegular,
    fontSize: 17,
    lineHeight: 33,
  },
  question: {
    fontFamily: fonts.jp,
    fontSize: 19,
    lineHeight: 31,
    marginBottom: 20,
  },
  options: {
    gap: 11,
  },
  option: {
    borderWidth: 1.5,
    borderRadius: 13,
    padding: 15,
  },
  optionActive: {
    backgroundColor: 'rgba(95,114,86,0.08)',
  },
  optionText: {
    fontFamily: fonts.jpRegular,
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 28,
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
