import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { brand, fonts, themes } from '../constants/colors';
import { useKomorebi } from '../context/KomorebiContext';
import { FloatingView, MotionView, PressableScale } from '../components/komorebi/Motion';

export default function WelcomeRoute() {
  const { state, walkthroughSlides, nextWalk, completeOnboarding } = useKomorebi();
  const theme = themes[state.theme];
  const slide = walkthroughSlides[state.walkIndex];

  const continueFlow = () => {
    if (state.walkIndex < walkthroughSlides.length - 1) {
      nextWalk();
      return;
    }
    completeOnboarding();
    router.push('/login');
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: theme.bg }]}>
      <View style={styles.center}>
        <FloatingView>
          <MotionView animateKey="welcome-logo" from="down" distance={14}>
            <View style={styles.logo}>
              <View style={styles.logoMoon} />
              <Text style={styles.logoKanji}>木</Text>
            </View>
          </MotionView>
        </FloatingView>

        <MotionView animateKey={state.walkIndex} style={styles.copyBlock} from="up">
          <Text style={[styles.title, { color: theme.text }]}>{slide.title}</Text>
          <Text style={[styles.subtitle, { color: theme.muted }]}>{slide.subtitle}</Text>
        </MotionView>

        <MotionView animateKey="welcome-dots" style={styles.dots} delay={110} distance={10}>
          {walkthroughSlides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: index === state.walkIndex ? brand.matcha : theme.line },
                index === state.walkIndex && styles.activeDot,
              ]}
            />
          ))}
        </MotionView>

        <PressableScale onPress={continueFlow} style={styles.primaryButton}>
          <Text style={styles.primaryLabel}>{state.walkIndex < walkthroughSlides.length - 1 ? 'Continue' : 'Get Started'}</Text>
        </PressableScale>
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
    gap: 30,
  },
  logo: {
    width: 104,
    height: 104,
    borderRadius: 28,
    backgroundColor: brand.matcha,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: brand.matcha,
    shadowOpacity: 0.35,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 14 },
  },
  logoMoon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ECE6D5',
  },
  logoKanji: {
    position: 'absolute',
    right: 18,
    bottom: 10,
    fontFamily: fonts.jp,
    fontSize: 32,
    color: '#FFFFFF',
  },
  copyBlock: {
    alignItems: 'center',
    gap: 14,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 30,
    lineHeight: 39,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.sans,
    fontSize: 15.5,
    lineHeight: 25,
    textAlign: 'center',
    maxWidth: 300,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 99,
  },
  activeDot: {
    width: 22,
  },
  primaryButton: {
    width: '100%',
    maxWidth: 300,
    minHeight: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: brand.matcha,
    shadowColor: brand.matcha,
    shadowOpacity: 0.28,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
  },
  primaryLabel: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 15,
    color: brand.washi,
  },
});
