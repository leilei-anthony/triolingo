import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { brand, fonts, themes } from '../constants/colors';
import { MotionView, PressableScale } from '../components/komorebi/Motion';
import { ProgressStrip } from '../components/komorebi/ProgressStrip';
import { useKomorebi } from '../context/KomorebiContext';

export default function PlacementResultRoute() {
  const { state } = useKomorebi();
  const theme = themes[state.theme];
  const isBeginner = state.placementMode === 'beginner';

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: theme.bg }]}>
      <View style={styles.content}>
        <MotionView animateKey="placement-result-copy" from="down" distance={12}>
          <Text style={styles.kicker}>読解レベル</Text>
          <Text style={[styles.level, { color: theme.text }]}>{isBeginner ? 'はじめて' : state.level}</Text>
          <Text style={[styles.subtitle, { color: theme.muted }]}>
            {isBeginner ? 'やさしい物語から、少しずつ進みましょう。' : 'N3までの道のりが見えてきました。'}
          </Text>
        </MotionView>

        <MotionView animateKey="placement-result-card" style={[styles.card, { backgroundColor: theme.card, borderColor: theme.line }]} delay={100}>
          <Text style={[styles.cardKicker, { color: theme.muted }]}>N3までの道のり</Text>
          <View style={styles.stats}>
            <View>
              <Text style={styles.statNumber}>{state.knownCount}</Text>
              <Text style={[styles.statLabel, { color: theme.muted }]}>既習語</Text>
            </View>
            <View>
              <Text style={[styles.statNumber, { color: theme.text }]}>{state.totalCount}</Text>
              <Text style={[styles.statLabel, { color: theme.muted }]}>残り</Text>
            </View>
          </View>
          <ProgressStrip value={isBeginner ? 0.02 : 0.25} />
        </MotionView>

        <PressableScale onPress={() => router.push('/genres')} style={styles.primaryButton}>
          <Text style={styles.primaryLabel}>物語へ進む</Text>
        </PressableScale>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  kicker: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 11,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    color: brand.matcha,
    marginBottom: 12,
  },
  level: {
    fontFamily: fonts.serif,
    fontSize: 42,
    lineHeight: 50,
  },
  subtitle: {
    fontFamily: fonts.serifItalic,
    fontSize: 17,
    marginTop: 6,
    marginBottom: 30,
  },
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 24,
    marginBottom: 18,
    shadowColor: '#1E1E24',
    shadowOpacity: 0.05,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
  },
  cardKicker: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 10.5,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  statNumber: {
    fontFamily: fonts.serif,
    fontSize: 27,
    color: brand.matcha,
  },
  statLabel: {
    fontFamily: fonts.sans,
    fontSize: 12,
    marginTop: 4,
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: brand.matcha,
  },
  primaryLabel: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 15,
    color: brand.washi,
  },
});
