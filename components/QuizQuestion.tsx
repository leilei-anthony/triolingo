import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';
import type { QuizQuestion as QuizQuestionType } from '../types';

type Props = {
  question: QuizQuestionType;
  index: number;
  selected: string | null;
  onSelect: (answer: string) => void;
};

export function QuizQuestion({ question, index, selected, onSelect }: Props) {
  const options = useMemo(
    () => [question.answer, ...question.distractors].sort(() => 0.5 - Math.random()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [index],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>
        {index + 1}. {question.prompt}
      </Text>
      {options.map((option) => {
        const isSelected = selected === option;
        return (
          <TouchableOpacity
            key={option}
            style={[styles.option, isSelected && styles.optionSelected]}
            onPress={() => onSelect(option)}
            activeOpacity={0.75}
          >
            <View style={[styles.radio, isSelected && styles.radioSelected]}>
              {isSelected && <View style={styles.radioDot} />}
            </View>
            <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  prompt: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2f4361',
    marginBottom: 10,
    lineHeight: 22,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#f7fbff',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
  },
  optionSelected: {
    backgroundColor: colors.accentSoft,
    borderColor: 'rgba(90, 194, 133, 0.4)',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.accent2,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent2,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  optionTextSelected: {
    color: colors.accent2,
    fontWeight: '700',
  },
});
