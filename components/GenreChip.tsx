import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';
import type { Genre } from '../types';

type Props = {
  genre: Genre;
  active: boolean;
  onPress: () => void;
};

export function GenreChip({ genre, active, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={[styles.label, active && styles.labelActive]}>{genre}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#f2f7ff',
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: colors.accentSoft,
    borderColor: 'rgba(90, 194, 133, 0.3)',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  labelActive: {
    color: colors.accent2,
  },
});
