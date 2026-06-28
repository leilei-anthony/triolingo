import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from '../constants/colors';
import type { WordEntry } from '../types';
import { segmentParagraph } from '../utils/tokenizer';

type Props = {
  text: string;
  words: WordEntry[];
  onWordPress: (entry: WordEntry) => void;
};

export function StoryParagraph({ text, words, onWordPress }: Props) {
  const segments = segmentParagraph(text, words);

  return (
    <Text style={styles.paragraph}>
      {segments.map((seg, i) => {
        if (seg.type === 'word') {
          return (
            <Text
              key={i}
              style={styles.wordChip}
              onPress={() => onWordPress(seg.entry)}
              suppressHighlighting
            >
              {seg.text}
            </Text>
          );
        }
        return <Text key={i}>{seg.text}</Text>;
      })}
    </Text>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 17,
    lineHeight: 30,
    color: colors.text,
    marginBottom: 16,
  },
  wordChip: {
    backgroundColor: colors.accentSoft,
    color: colors.accent2,
    fontWeight: '700',
  },
});
