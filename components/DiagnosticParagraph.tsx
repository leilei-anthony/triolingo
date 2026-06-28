import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from '../constants/colors';
import { tokenizeDiagnostic } from '../utils/tokenizer';

type Props = {
  text: string;
  onUnknownsChange: (unknowns: string[]) => void;
};

export function DiagnosticParagraph({ text, onUnknownsChange }: Props) {
  const [unknowns, setUnknowns] = useState<Set<string>>(new Set());
  const tokens = tokenizeDiagnostic(text);

  useEffect(() => {
    setUnknowns(new Set());
  }, [text]);

  function toggleUnknown(word: string) {
    setUnknowns((prev) => {
      const next = new Set(prev);
      if (next.has(word)) next.delete(word);
      else next.add(word);
      onUnknownsChange([...next]);
      return next;
    });
  }

  return (
    <Text style={styles.paragraph}>
      {tokens.map((token, i) => {
        if (token.type !== 'japanese') {
          return <Text key={i}>{token.text}</Text>;
        }
        const isUnknown = unknowns.has(token.text);
        return (
          <Text
            key={i}
            style={isUnknown ? styles.unknown : styles.known}
            onPress={() => toggleUnknown(token.text)}
            suppressHighlighting
          >
            {token.text}
          </Text>
        );
      })}
    </Text>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 17,
    lineHeight: 30,
    color: colors.text,
  },
  known: {
    color: colors.text,
  },
  unknown: {
    backgroundColor: colors.dangerSoft,
    color: colors.danger,
  },
});
