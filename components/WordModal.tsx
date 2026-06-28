import React from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';
import type { WordEntry } from '../types';

type Props = {
  word: WordEntry | null;
  onClose: () => void;
};

export function WordModal({ word, onClose }: Props) {
  return (
    <Modal visible={!!word} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.card} onStartShouldSetResponder={() => true}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.wordText}>{word?.word}</Text>
          {word?.reading ? (
            <Text style={styles.readingText}>({word.reading})</Text>
          ) : null}
          <Text style={styles.definitionText}>{word?.definition}</Text>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(18, 35, 63, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#112647',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 12,
  },
  closeBtn: {
    position: 'absolute',
    top: 14,
    right: 16,
    padding: 4,
  },
  closeBtnText: {
    fontSize: 16,
    color: colors.muted,
  },
  wordText: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
    marginRight: 32,
  },
  readingText: {
    fontSize: 15,
    color: colors.muted,
    marginBottom: 12,
  },
  definitionText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
});
