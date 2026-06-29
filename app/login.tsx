import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { brand, fonts, themes } from '../constants/colors';
import { useKomorebi } from '../context/KomorebiContext';
import { FloatingView, MotionView, PressableScale } from '../components/komorebi/Motion';

export default function LoginRoute() {
  const { state } = useKomorebi();
  const theme = themes[state.theme];

  const continueToPlacement = () => router.push('/placement');

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: theme.bg }]}>
      <View style={styles.center}>
        <FloatingView distance={4}>
          <MotionView animateKey="login-logo" from="down" distance={14}>
            <View style={styles.logo}>
              <View style={styles.logoMoon} />
              <Text style={styles.logoKanji}>木</Text>
            </View>
          </MotionView>
        </FloatingView>

        <MotionView animateKey="login-brand" style={styles.brandBlock} delay={80}>
          <Text style={[styles.jpName, { color: theme.text }]}>木漏れ日</Text>
          <Text style={[styles.tagline, { color: theme.muted }]}>静かに読んで、少しずつ覚える。</Text>
        </MotionView>

        <MotionView animateKey="login-actions" style={styles.authStack} delay={150}>
          <PressableScale onPress={continueToPlacement} style={[styles.authButton, { backgroundColor: theme.card, borderColor: theme.line }]}>
            <View style={styles.googleDot} />
            <Text style={[styles.authLabel, { color: theme.text }]}>Googleでつづける</Text>
          </PressableScale>
          <PressableScale onPress={continueToPlacement} style={[styles.appleButton, { backgroundColor: theme.text }]}>
            <Text style={[styles.authLabel, { color: theme.bg }]}>Appleでつづける</Text>
          </PressableScale>
          <PressableScale onPress={continueToPlacement} activeScale={0.98} style={styles.guestButton}>
            <Text style={[styles.guestLabel, { color: theme.muted }]}>ゲストではじめる</Text>
          </PressableScale>
        </MotionView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 34,
  },
  logo: {
    width: 78,
    height: 78,
    borderRadius: 22,
    backgroundColor: brand.matcha,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
    shadowColor: brand.matcha,
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
  },
  logoMoon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#ECE6D5',
  },
  logoKanji: {
    position: 'absolute',
    right: 13,
    bottom: 8,
    fontFamily: fonts.jp,
    fontSize: 23,
    color: '#FFFFFF',
  },
  brandBlock: {
    alignItems: 'center',
    marginBottom: 38,
  },
  jpName: {
    fontFamily: fonts.jp,
    fontSize: 22,
    letterSpacing: 5,
  },
  tagline: {
    marginTop: 10,
    fontFamily: fonts.serifItalic,
    fontSize: 17,
  },
  authStack: {
    width: '100%',
    gap: 11,
  },
  authButton: {
    minHeight: 52,
    borderRadius: 13,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  appleButton: {
    minHeight: 52,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: brand.vermilion,
    borderWidth: 4,
    borderColor: brand.matcha,
  },
  authLabel: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 14.5,
  },
  guestButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  guestLabel: {
    fontFamily: fonts.sansMedium,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
