import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { brand, themes } from '../../constants/colors';
import { useKomorebi } from '../../context/KomorebiContext';

export function ProgressStrip({ value }: { value: number }) {
  const { state } = useKomorebi();
  const theme = themes[state.theme];
  const clamped = Math.max(0, Math.min(1, value));
  const fill = useRef(new Animated.Value(clamped)).current;

  useEffect(() => {
    Animated.timing(fill, {
      toValue: clamped,
      duration: 560,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [clamped, fill]);

  const width = fill.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.track, { backgroundColor: theme.line }]}>
      <Animated.View style={[styles.fill, { width, backgroundColor: brand.matcha }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 8,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  },
});
