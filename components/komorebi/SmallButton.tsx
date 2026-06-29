import React from 'react';
import { StyleSheet, Text, ViewStyle } from 'react-native';
import { brand } from '../../komorebi/theme';
import { useKomorebi } from '../../context/KomorebiContext';
import { PressableScale } from './Motion';

export function SmallButton({
  label,
  onPress,
  style,
  secondary = false,
  disabled = false,
}: {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  secondary?: boolean;
  disabled?: boolean;
}) {
  const { state } = useKomorebi();
  const theme = state.theme === 'dark' ? { card: '#27272F', line: 'rgba(236,230,218,0.14)', text: '#ECE6DA' } : state.theme === 'sepia' ? { card: '#FBF4E6', line: 'rgba(58,44,28,0.14)', text: '#3A2C1C' } : { card: '#FFFFFF', line: 'rgba(30,30,36,0.1)', text: '#1E1E24' };
  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: secondary ? theme.card : brand.matcha,
          borderColor: secondary ? theme.line : brand.matcha,
        },
        style,
      ]}
    >
      <Text style={[styles.label, { color: secondary ? theme.text : brand.washi }]}>{label}</Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  label: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 15,
  },
});
