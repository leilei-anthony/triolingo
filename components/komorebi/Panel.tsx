import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { themes } from '../../constants/colors';
import { useKomorebi } from '../../context/KomorebiContext';

export function Panel({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  const { state } = useKomorebi();
  const theme = themes[state.theme];
  return <View style={[styles.panel, { backgroundColor: theme.card, borderColor: theme.line }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
  },
});
