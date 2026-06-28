import type { JLPTLevel, TextSegment, WordEntry } from '../types';
import { diagnosticParagraphs, jlptLevels } from '../constants/data';

export type DiagnosticToken =
  | { type: 'japanese'; text: string }
  | { type: 'other'; text: string };

function isJapaneseChar(ch: string): boolean {
  return /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(ch);
}

export function tokenizeDiagnostic(text: string): DiagnosticToken[] {
  const tokens: DiagnosticToken[] = [];
  let buf = '';

  for (const ch of text) {
    if (isJapaneseChar(ch)) {
      buf += ch;
      if (buf.length >= 2) {
        tokens.push({ type: 'japanese', text: buf });
        buf = '';
      }
    } else {
      if (buf.length) {
        tokens.push({ type: 'japanese', text: buf });
        buf = '';
      }
      tokens.push({ type: 'other', text: ch });
    }
  }
  if (buf.length) tokens.push({ type: 'japanese', text: buf });
  return tokens;
}

export function segmentParagraph(text: string, words: WordEntry[]): TextSegment[] {
  if (words.length === 0) return [{ type: 'plain', text }];

  const sortedWords = [...words].sort((a, b) => b.word.length - a.word.length);
  const pattern = sortedWords
    .map((w) => w.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  const regex = new RegExp(`(${pattern})`);
  const parts = text.split(regex);

  return parts
    .filter((p) => p.length > 0)
    .map((part) => {
      const entry = words.find((w) => w.word === part);
      if (entry) return { type: 'word' as const, text: part, entry };
      return { type: 'plain' as const, text: part };
    });
}

export function calculateJLPTLevel(
  currentLevel: JLPTLevel,
  unknowns: string[],
): string {
  const text = diagnosticParagraphs[currentLevel] ?? diagnosticParagraphs.N5;
  const total = text.match(/[\p{L}\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]+/gu)?.length ?? 1;
  const comprehension = 1 - unknowns.length / total;

  let idx = jlptLevels.indexOf(currentLevel);
  if (idx === -1) idx = 0;
  if (comprehension >= 0.8 && idx < jlptLevels.length - 1) idx += 1;
  else if (comprehension < 0.5 && idx > 0) idx -= 1;

  return `JLPT ${jlptLevels[idx]}`;
}
