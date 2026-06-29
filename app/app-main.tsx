import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Modal, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { brand, fonts, themes } from '../constants/colors';
import { MotionView, PressableScale, SpinningView } from '../components/komorebi/Motion';
import { ProgressStrip } from '../components/komorebi/ProgressStrip';
import { useKomorebi } from '../context/KomorebiContext';
import { currentStoryWordIds } from '../constants/data';
import type { StoryToken, TargetWord, WordStatus } from '../types';

type MainTab = 'read' | 'journey' | 'progress' | 'profile';

function getCurrentStoryWords(targetWords: TargetWord[]) {
  return currentStoryWordIds
    .map((wordId) => targetWords.find((word) => word.id === wordId))
    .filter((word): word is TargetWord => Boolean(word));
}

export default function AppMainRoute() {
  const [tab, setTab] = useState<MainTab>('read');
  const [glossWordId, setGlossWordId] = useState<string | null>(null);
  const {
    state,
    storyArc,
    targetWords,
    getWordStatus,
    markGloss,
    markSegmentWords,
    goToSegment,
    setReadView,
    comprehensionChecks,
    openCheck,
    markCheckComplete,
  } = useKomorebi();
  const theme = themes[state.theme];
  const immersive = tab === 'read' && ['reading', 'exam-intro', 'exam', 'results'].includes(state.readView);
  const screenKey = `${tab}-${state.readView}-${state.segmentIndex}-${state.examIndex}`;

  const openGloss = (wordId: string) => {
    markGloss(wordId);
    setGlossWordId(wordId);
  };

  const advanceCurrentSegment = () => {
    const segment = storyArc.segments[state.segmentIndex];
    const segmentWordIds = segment.paragraphs.flatMap((paragraph) =>
      paragraph.map((token) => token.wordId).filter((wordId): wordId is string => Boolean(wordId)),
    );
    markSegmentWords(segmentWordIds);
    if (state.segmentIndex < storyArc.segments.length - 1) {
      goToSegment(state.segmentIndex + 1);
      return;
    }
    setReadView('exam-intro');
  };

  const continueReading = () => {
    const segment = storyArc.segments[state.segmentIndex];
    const check = comprehensionChecks[segment.id];
    if (check && !state.completedCheckIds.includes(segment.id)) {
      openCheck(segment.id);
      return;
    }

    advanceCurrentSegment();
  };

  const currentCheck = comprehensionChecks[storyArc.segments[state.segmentIndex].id];
  const checkOpen = state.checkSegmentId === storyArc.segments[state.segmentIndex].id && Boolean(currentCheck);
  const glossWord = targetWords.find((word) => word.id === glossWordId) ?? null;

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: theme.bg }]}>
      <View style={styles.appShell}>
        {tab === 'journey' ? (
          <JourneyScreen />
        ) : (
          <ScrollView
            key={screenKey}
            style={styles.scroll}
            contentContainerStyle={[styles.scrollContent, immersive && styles.immersiveContent]}
          >
            <MotionView animateKey={screenKey} distance={immersive ? 12 : 18} duration={360}>
              {tab === 'read' && state.readView === 'home' ? <ReadHome setReadView={setReadView} /> : null}
              {tab === 'read' && state.readView === 'reading' ? <Reader openGloss={openGloss} continueReading={continueReading} /> : null}
              {tab === 'read' && state.readView === 'exam-intro' ? <ExamIntro setReadView={setReadView} /> : null}
              {tab === 'read' && state.readView === 'exam' ? <ExamScreen setReadView={setReadView} /> : null}
              {tab === 'read' && state.readView === 'results' ? <ResultsScreen setTab={setTab} /> : null}
              {tab === 'progress' ? <ProgressScreen /> : null}
              {tab === 'profile' ? <ProfileScreen /> : null}
            </MotionView>
          </ScrollView>
        )}

        {!immersive ? <TabBar active={tab} onChange={(next) => { setTab(next); setReadView('home'); }} /> : null}
        {tab === 'journey' && !immersive ? (
          <PressableScale onPress={() => { setTab('read'); setReadView('reading'); }} style={[styles.playFab, { backgroundColor: brand.matcha }]} activeScale={0.93}>
            <Text style={styles.playFabLabel}>▶  Play</Text>
          </PressableScale>
        ) : null}
      </View>

      {glossWord ? <GlossSheet word={glossWord} status={getWordStatus(glossWord.id)} onClose={() => setGlossWordId(null)} /> : null}
      {checkOpen && currentCheck ? (
        <CheckSheet
          onContinue={() => {
            markCheckComplete(storyArc.segments[state.segmentIndex].id);
            advanceCurrentSegment();
          }}
        />
      ) : null}
    </SafeAreaView>
  );
}

function ReadHome({ setReadView }: { setReadView: (readView: 'home' | 'reading' | 'exam-intro' | 'exam' | 'results') => void }) {
  const { state, storyArc, targetWords, getWordStatus } = useKomorebi();
  const theme = themes[state.theme];
  const storyWords = getCurrentStoryWords(targetWords);
  const seenWords = storyWords.filter((word) => getWordStatus(word.id) !== 'locked').length;

  return (
    <View>
      <MotionView animateKey="read-home-header" style={styles.headerRow} from="down" distance={12}>
        <View>
          <Text style={[styles.appKicker, { color: theme.muted }]}>Today's Story</Text>
          <Text style={[styles.screenTitle, { color: theme.text }]}>{storyArc.title}</Text>
          <Text style={[styles.jpSub, { color: theme.muted }]}>{storyArc.japaneseTitle}</Text>
        </View>
        <View style={[styles.levelPill, { backgroundColor: theme.card, borderColor: theme.line }]}>
          <Text style={styles.levelPillText}>{state.level}</Text>
        </View>
      </MotionView>

      <MotionView animateKey={`read-home-card-${seenWords}-${state.segmentIndex}`} style={[styles.heroCard, { backgroundColor: theme.card, borderColor: theme.line }]} delay={90}>
        <View style={styles.bookMark}>
          <Text style={styles.bookMarkText}>推</Text>
        </View>
        <Text style={[styles.heroTitle, { color: theme.text }]}>A small mystery unfolding in a quiet library.</Text>
        <Text style={[styles.heroCopy, { color: theme.muted }]}>
          {seenWords} of {storyWords.length} new words unlocked.
        </Text>
        <ProgressStrip value={seenWords / storyWords.length} />
        <View style={styles.heroMeta}>
          <Text style={[styles.metaText, { color: theme.muted }]}>Ch. {state.segmentIndex + 1}</Text>
          <Text style={[styles.metaText, { color: theme.muted }]}>~{Math.max(2, (storyArc.segments.length - state.segmentIndex) * 3)} min left</Text>
        </View>
        <PressableScale onPress={() => setReadView('reading')} style={styles.primaryButton}>
          <Text style={styles.primaryLabel}>{state.arcComplete ? 'Read Again' : state.segmentIndex > 0 ? 'Continue' : 'Start Reading'}</Text>
        </PressableScale>
      </MotionView>
    </View>
  );
}

function Reader({ openGloss, continueReading }: { openGloss: (wordId: string) => void; continueReading: () => void }) {
  const { state, storyArc, getWordStatus, setReadView } = useKomorebi();
  const theme = themes[state.theme];
  const segment = storyArc.segments[state.segmentIndex];

  return (
    <View>
      <View style={styles.readerHeader}>
        <PressableScale onPress={() => setReadView('home')} style={styles.backButton}>
          <Text style={[styles.backText, { color: theme.text }]}>‹</Text>
        </PressableScale>
        <View style={styles.readerHeaderText}>
          <Text style={[styles.appKicker, { color: theme.muted }]}>{segment.chapter}</Text>
          <Text style={[styles.readerTitle, { color: theme.text }]}>{storyArc.japaneseTitle}</Text>
        </View>
      </View>

      <ProgressStrip value={(state.segmentIndex + 1) / storyArc.segments.length} />

      <View style={styles.readerBody}>
        {segment.paragraphs.map((paragraph, index) => (
          <MotionView key={`${segment.id}-${index}`} animateKey={`${segment.id}-${index}`} delay={90 + index * 90} distance={10}>
            <Text style={[styles.paragraph, { color: theme.text, fontSize: state.fontSize, lineHeight: state.fontSize * 1.9 }]}>
              {paragraph.map((token, tokenIndex) => renderToken(token, tokenIndex, state.furigana, getWordStatus, openGloss))}
            </Text>
          </MotionView>
        ))}
      </View>

      <PressableScale onPress={continueReading} style={styles.primaryButton}>
        <Text style={styles.primaryLabel}>{state.segmentIndex < storyArc.segments.length - 1 ? 'Next' : 'Finish Story'}</Text>
      </PressableScale>
    </View>
  );
}

function renderToken(
  token: StoryToken,
  tokenIndex: number,
  showFurigana: boolean,
  getWordStatus: (wordId: string) => WordStatus,
  openGloss: (wordId: string) => void,
) {
  if (!token.wordId) {
    return <Text key={tokenIndex}>{token.text}</Text>;
  }
  const status = getWordStatus(token.wordId);
  return (
    <Text key={tokenIndex} onPress={() => openGloss(token.wordId!)} style={[styles.wordToken, status === 'new' && styles.newWord, status === 'learning' && styles.learningWord]}>
      {token.text}
      {showFurigana && token.reading ? <Text style={styles.furigana}> {token.reading}</Text> : null}
    </Text>
  );
}

function ExamIntro({ setReadView }: { setReadView: (readView: 'home' | 'reading' | 'exam-intro' | 'exam' | 'results') => void }) {
  const { resetExam } = useKomorebi();
  const theme = themes[useKomorebi().state.theme];

  return (
    <View style={styles.centerScreen}>
      <Text style={styles.appKicker}>Review</Text>
      <Text style={[styles.screenTitle, { color: theme.text, textAlign: 'center' }]}>Let's check the words you've seen.</Text>
      <Text style={[styles.subtitle, { color: theme.muted, textAlign: 'center' }]}>
        A quick quiz will lock in the new words from this story.
      </Text>
      <PressableScale
        onPress={() => {
          resetExam();
          setReadView('exam');
        }}
        style={styles.primaryButton}
      >
        <Text style={styles.primaryLabel}>Review</Text>
      </PressableScale>
      <PressableScale onPress={() => setReadView('home')} style={styles.textButton}>
        <Text style={[styles.textButtonLabel, { color: theme.muted }]}>Later</Text>
      </PressableScale>
    </View>
  );
}

function ExamScreen({ setReadView }: { setReadView: (readView: 'home' | 'reading' | 'exam-intro' | 'exam' | 'results') => void }) {
  const { state, arcExam, answerExam, nextExam, advanceResults, setLoading } = useKomorebi();
  const theme = themes[state.theme];
  const question = arcExam[state.examIndex];
  const selected = state.examAnswers[question.id];
  const answered = selected !== undefined;

  const next = () => {
    if (!answered) return;
    if (state.examIndex < arcExam.length - 1) {
      nextExam();
      return;
    }
    setLoading('Organizing what you read...');
    setTimeout(() => {
      setLoading(null);
      advanceResults();
      setReadView('results');
    }, 500);
  };

  return (
    <View>
      <View style={styles.progressRow}>
        <View style={styles.progressGrow}>
          <ProgressStrip value={(state.examIndex + 1) / arcExam.length} />
        </View>
        <Text style={[styles.counter, { color: theme.muted }]}>{state.examIndex + 1} / {arcExam.length}</Text>
      </View>

      <Text style={styles.appKicker}>{question.kind === 'vocab-context' ? 'Vocabulary in context' : 'Story comprehension'}</Text>
      {question.context ? (
        <MotionView animateKey={`exam-passage-${question.id}`} style={[styles.passage, { backgroundColor: theme.card, borderColor: theme.line }]} distance={10}>
          <Text style={[styles.passageText, { color: theme.text }]}>{question.context}</Text>
        </MotionView>
      ) : null}
      <MotionView animateKey={`exam-question-${question.id}`} distance={10} delay={60}>
        <Text style={[styles.question, { color: theme.text }]}>{question.prompt}</Text>
      </MotionView>

      <View style={styles.options}>
        {question.options.map((option, index) => {
          const active = selected === index;
          return (
            <MotionView key={option} animateKey={`${question.id}-${option}`} delay={110 + index * 55} distance={12}>
              <PressableScale
                onPress={() => answerExam(question.id, index)}
                style={[
                  styles.option,
                  { backgroundColor: theme.card, borderColor: active ? brand.matcha : theme.line },
                  active && styles.optionActive,
                ]}
              >
                <Text style={[styles.optionText, { color: theme.text }]}>{option}</Text>
              </PressableScale>
            </MotionView>
          );
        })}
      </View>

      <PressableScale onPress={next} disabled={!answered} style={[styles.primaryButton, styles.spacedButton, { backgroundColor: answered ? brand.matcha : theme.line }]}>
        <Text style={[styles.primaryLabel, { color: answered ? brand.washi : theme.muted }]}>
          {state.examIndex < arcExam.length - 1 ? 'Continue' : 'Finish Review'}
        </Text>
      </PressableScale>
      <LoadingOverlay />
    </View>
  );
}

function ResultsScreen({ setTab }: { setTab: (tab: MainTab) => void }) {
  const { state, targetWords, learningAfterArc } = useKomorebi();
  const theme = themes[state.theme];
  const storyWords = getCurrentStoryWords(targetWords);
  const acquiredCount = storyWords.length - learningAfterArc.length;

  return (
    <View>
      <View style={styles.resultHeader}>
        <Text style={styles.appKicker}>Story Complete</Text>
        <Text style={[styles.screenTitle, { color: theme.text }]}>Great work finishing the story.</Text>
        <Text style={[styles.subtitle, { color: theme.muted }]}>{acquiredCount} of {storyWords.length} new words acquired.</Text>
      </View>

      <MotionView animateKey="results-list" style={[styles.listCard, { backgroundColor: theme.card, borderColor: theme.line }]} delay={80}>
        {storyWords.map((word, index) => {
          const learning = learningAfterArc.includes(word.id);
          return (
            <MotionView key={word.id} animateKey={`result-${word.id}`} style={[styles.resultWordRow, { borderBottomColor: theme.line }]} delay={110 + index * 24} distance={8}>
              <View style={[styles.wordDot, { backgroundColor: learning ? brand.vermilion : brand.matcha }]} />
              <View style={styles.resultWordText}>
                <Text style={[styles.resultWordJa, { color: theme.text }]}>{word.word} <Text style={[styles.resultReading, { color: theme.muted }]}>{word.reading}</Text></Text>
                <Text style={[styles.resultMeaning, { color: theme.muted }]}>{word.meaning}</Text>
              </View>
              <Text style={[styles.resultStatus, { color: learning ? brand.vermilion : brand.matcha }]}>{learning ? 'Review' : 'Acquired'}</Text>
            </MotionView>
          );
        })}
      </MotionView>

      <MotionView animateKey="results-stats" style={[styles.statsCard, { backgroundColor: theme.card, borderColor: theme.line }]} delay={170}>
        <Stat number={state.knownCount} label="Known" color={brand.matcha} />
        <Stat number={state.learningCount} label="Reviewing" color={brand.vermilion} />
        <Stat number={state.totalCount} label="Remaining" color={theme.text} />
      </MotionView>

      <PressableScale onPress={() => setTab('journey')} style={styles.primaryButton}>
        <Text style={styles.primaryLabel}>View Path</Text>
      </PressableScale>
    </View>
  );
}

// The full vocabulary journey to N3 is 1500 words; each tiny dot is one word.
const N3_GOAL = 1500;
const DOTS_PER_ROW = 13; // dots across the winding band
const WAVE_PERIOD_ROWS = 13; // rows per full left-right-left cycle
const DOT_CELL = 11; // tiny dot (7) + horizontal margins (2 + 2)

// Mock JLPT N3 vocabulary used to fill in what each learned dot represents.
const N3_VOCAB: { word: string; reading: string; meaning: string }[] = [
  { word: '経済', reading: 'けいざい', meaning: 'economy' },
  { word: '政治', reading: 'せいじ', meaning: 'politics' },
  { word: '文化', reading: 'ぶんか', meaning: 'culture' },
  { word: '社会', reading: 'しゃかい', meaning: 'society' },
  { word: '影響', reading: 'えいきょう', meaning: 'influence' },
  { word: '関係', reading: 'かんけい', meaning: 'relationship' },
  { word: '状況', reading: 'じょうきょう', meaning: 'situation' },
  { word: '理由', reading: 'りゆう', meaning: 'reason' },
  { word: '結果', reading: 'けっか', meaning: 'result' },
  { word: '方法', reading: 'ほうほう', meaning: 'method' },
  { word: '意見', reading: 'いけん', meaning: 'opinion' },
  { word: '情報', reading: 'じょうほう', meaning: 'information' },
  { word: '経験', reading: 'けいけん', meaning: 'experience' },
  { word: '能力', reading: 'のうりょく', meaning: 'ability' },
  { word: '責任', reading: 'せきにん', meaning: 'responsibility' },
  { word: '判断', reading: 'はんだん', meaning: 'judgment' },
  { word: '表現', reading: 'ひょうげん', meaning: 'expression' },
  { word: '解決', reading: 'かいけつ', meaning: 'solution' },
  { word: '増加', reading: 'ぞうか', meaning: 'increase' },
  { word: '減少', reading: 'げんしょう', meaning: 'decrease' },
  { word: '変化', reading: 'へんか', meaning: 'change' },
  { word: '発展', reading: 'はってん', meaning: 'development' },
  { word: '成長', reading: 'せいちょう', meaning: 'growth' },
  { word: '努力', reading: 'どりょく', meaning: 'effort' },
  { word: '目的', reading: 'もくてき', meaning: 'purpose' },
  { word: '計画', reading: 'けいかく', meaning: 'plan' },
  { word: '準備', reading: 'じゅんび', meaning: 'preparation' },
  { word: '確認', reading: 'かくにん', meaning: 'confirmation' },
  { word: '比較', reading: 'ひかく', meaning: 'comparison' },
  { word: '選択', reading: 'せんたく', meaning: 'choice' },
  { word: '想像', reading: 'そうぞう', meaning: 'imagination' },
  { word: '記憶', reading: 'きおく', meaning: 'memory' },
  { word: '感情', reading: 'かんじょう', meaning: 'emotion' },
  { word: '性格', reading: 'せいかく', meaning: 'personality' },
  { word: '習慣', reading: 'しゅうかん', meaning: 'habit' },
  { word: '環境', reading: 'かんきょう', meaning: 'environment' },
  { word: '自然', reading: 'しぜん', meaning: 'nature' },
  { word: '科学', reading: 'かがく', meaning: 'science' },
  { word: '技術', reading: 'ぎじゅつ', meaning: 'technology' },
  { word: '歴史', reading: 'れきし', meaning: 'history' },
];

type DotKind = 'known' | 'learning' | 'locked';

type DotInfo = { index: number; kind: DotKind };

const PathDot = React.memo(function PathDot({
  index,
  kind,
  color,
  onPress,
}: {
  index: number;
  kind: DotKind;
  color: string;
  onPress: (info: DotInfo) => void;
}) {
  return (
    <Pressable hitSlop={4} onPress={() => onPress({ index, kind })} style={[styles.tinyDot, { backgroundColor: color }]} />
  );
});

function JourneyScreen() {
  const { state } = useKomorebi();
  const theme = themes[state.theme];
  const { width } = useWindowDimensions();
  const [selected, setSelected] = useState<DotInfo | null>(null);

  const knownCount = Math.min(state.knownCount, N3_GOAL);
  const learningEnd = Math.min(knownCount + state.learningCount, N3_GOAL);

  const onDotPress = React.useCallback((info: DotInfo) => setSelected(info), []);

  // How far each row can swing left/right while keeping the band on screen.
  const usable = width - 44; // screen has 22px padding on each side
  const bandPx = DOTS_PER_ROW * DOT_CELL;
  const amplitude = Math.max(0, Math.min(96, (usable - bandPx) / 2));
  const freq = (Math.PI * 2) / WAVE_PERIOD_ROWS;

  // Chunk the 1500 word-dots into fixed-width rows; each row is shifted along a
  // sine wave so the band snakes left-right down the screen like Duolingo's path.
  const rows: number[][] = [];
  for (let start = 0; start < N3_GOAL; start += DOTS_PER_ROW) {
    const row: number[] = [];
    for (let c = 0; c < DOTS_PER_ROW && start + c < N3_GOAL; c++) row.push(start + c);
    rows.push(row);
  }

  const kindFor = (index: number): DotKind =>
    index < knownCount ? 'known' : index < learningEnd ? 'learning' : 'locked';
  const colorFor = (kind: DotKind): string =>
    kind === 'known' ? brand.matcha : kind === 'learning' ? brand.vermilion : theme.line;

  return (
    <View style={styles.journeyRoot}>
      <View style={[styles.journeyHeader, { backgroundColor: theme.bg, borderBottomColor: theme.line }]}>
        <Text style={[styles.screenTitle, { color: theme.text }]}>Path to N3</Text>
        <Text style={[styles.journeyLead, { color: theme.muted }]}>Every dot is one word on your way to N3.</Text>
        <View style={[styles.statsCard, styles.journeyStats, { backgroundColor: theme.card, borderColor: theme.line }]}>
          <Stat number={knownCount} label="Learned" color={brand.matcha} />
          <Stat number={state.learningCount} label="Reviewing" color={brand.vermilion} />
          <Stat number={N3_GOAL} label="Total" color={theme.text} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.journeyScrollContent} showsVerticalScrollIndicator={false}>
        <MotionView animateKey={`journey-trail-${knownCount}-${state.learningCount}`} style={styles.dotField} delay={70} distance={12}>
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={[styles.dotRow, { transform: [{ translateX: Math.sin(rowIndex * freq) * amplitude }] }]}>
              {row.map((index) => {
                const kind = kindFor(index);
                return (
                  <PathDot key={index} index={index} kind={kind} color={colorFor(kind)} onPress={onDotPress} />
                );
              })}
            </View>
          ))}
        </MotionView>
      </ScrollView>

      {selected ? <DotWordSheet info={selected} onClose={() => setSelected(null)} /> : null}
    </View>
  );
}

function DotWordSheet({ info, onClose }: { info: DotInfo; onClose: () => void }) {
  const theme = themes[useKomorebi().state.theme];
  const locked = info.kind === 'locked';
  const vocab = N3_VOCAB[info.index % N3_VOCAB.length];
  const pillColor = info.kind === 'known' ? brand.matcha : info.kind === 'learning' ? brand.vermilion : theme.muted;
  const pillLabel = info.kind === 'known' ? 'Learned' : info.kind === 'learning' ? 'Reviewing' : 'Not learned';

  return (
    <Modal transparent visible animationType="fade" onRequestClose={onClose}>
      <Pressable onPress={onClose} style={styles.sheetOverlay}>
        <Pressable style={styles.sheetPressArea} onPress={() => undefined}>
          <MotionView animateKey={`dot-${info.index}`} style={[styles.sheet, { backgroundColor: theme.card }]} distance={34}>
            <View style={[styles.sheetHandle, { backgroundColor: theme.line }]} />
            <View style={styles.glossHeader}>
              <Text style={[styles.glossWord, { color: theme.text }]}>{locked ? '？？？' : vocab.word}</Text>
              <Text style={[styles.glossPill, { color: pillColor, backgroundColor: `${pillColor}22` }]}>{pillLabel}</Text>
            </View>
            <Text style={styles.glossReading}>{locked ? '？？？' : vocab.reading}</Text>
            <Text style={[styles.glossMeaning, { color: theme.text }]}>{locked ? 'You haven’t learned this word yet.' : vocab.meaning}</Text>
            <Text style={[styles.glossExample, { backgroundColor: theme.bg, color: theme.muted }]}>
              {locked ? 'Keep reading stories to unlock it.' : `Word ${info.index + 1} of ${N3_GOAL} on your path to N3 · JLPT N3`}
            </Text>
            <PressableScale onPress={onClose} style={styles.primaryButton}>
              <Text style={styles.primaryLabel}>{locked ? 'Got it' : 'Nice'}</Text>
            </PressableScale>
          </MotionView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function ChartBar({ height, color, delay }: { height: number; color: string; delay: number }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      delay,
      duration: 620,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [delay, progress]);

  const animatedHeight = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [10, height],
  });

  return <Animated.View style={[styles.chartBar, { height: animatedHeight, backgroundColor: color }]} />;
}

function ProgressScreen() {
  const { state, progressHistory, recentWords } = useKomorebi();
  const theme = themes[state.theme];

  return (
    <View>
      <Text style={[styles.screenTitle, { color: theme.text }]}>Progress</Text>
      <MotionView animateKey="progress-stats" style={[styles.statsCard, styles.tallStats, { backgroundColor: theme.card, borderColor: theme.line }]} distance={12}>
        <Stat number={state.knownCount} label="Known" color={brand.matcha} />
        <Stat number={state.learningCount} label="Reviewing" color={brand.vermilion} />
        <Stat number={state.totalCount} label="Remaining" color={theme.text} />
      </MotionView>
      <MotionView animateKey="progress-chart-card" style={[styles.progressCard, { backgroundColor: theme.card, borderColor: theme.line }]} delay={80} distance={12}>
        <Text style={[styles.appKicker, { color: theme.muted }]}>Trend</Text>
        <Text style={[styles.heroTitle, { color: theme.text }]}>At this pace, you'll reach <Text style={{ color: brand.matcha }}>N3</Text> in about <Text style={{ color: brand.matcha }}>5 months</Text>.</Text>
        <View style={styles.chart}>
          {progressHistory.map((value, index) => (
            <ChartBar
              key={`${value}-${index}`}
              height={Math.max(16, (value - 380) / 2.1)}
              color={index === progressHistory.length - 1 ? brand.matcha : 'rgba(95,114,86,0.24)'}
              delay={index * 55}
            />
          ))}
        </View>
        <Text style={[styles.metaText, { color: theme.muted, textAlign: 'center' }]}>Total words learned · last 8 weeks</Text>
      </MotionView>
      <MotionView animateKey="progress-metrics" style={styles.metricRow} delay={130} distance={12}>
        <MetricCard value="86%" label="Avg. comprehension" />
        <MetricCard value={state.arcComplete ? '5' : '0'} label="New words this week" />
      </MotionView>
      <MotionView animateKey="progress-recent" style={[styles.progressCard, { backgroundColor: theme.card, borderColor: theme.line }]} delay={180} distance={12}>
        <Text style={[styles.appKicker, { color: theme.muted }]}>Recent vocabulary</Text>
        <View style={styles.wordChips}>
          {recentWords.map((word, index) => (
            <MotionView key={word} animateKey={`recent-${word}`} delay={210 + index * 28} distance={8}>
              <Text style={[styles.wordChip, { color: theme.text }]}>{word}</Text>
            </MotionView>
          ))}
        </View>
      </MotionView>
    </View>
  );
}

function ProfileScreen() {
  const { state, genres, setTheme, setFontSize, toggleFurigana, selectGenres, resetDemo } = useKomorebi();
  const theme = themes[state.theme];

  return (
    <View>
      <View style={styles.profileHeader}>
        <View style={styles.profileIcon}>
          <Text style={styles.profileIconText}>読</Text>
        </View>
        <View>
          <Text style={[styles.profileName, { color: theme.text }]}>Guest Reader</Text>
          <Text style={[styles.metaText, { color: theme.muted }]}>Reading level <Text style={{ color: brand.matcha }}>{state.level}</Text></Text>
        </View>
      </View>

      <Text style={[styles.sectionKicker, { color: theme.muted }]}>Appearance</Text>
      <View style={[styles.settingsCard, { backgroundColor: theme.card, borderColor: theme.line }]}>
        <View style={[styles.settingRow, { borderBottomColor: theme.line }]}>
          <Text style={[styles.settingLabel, { color: theme.text }]}>Theme</Text>
          <View style={[styles.segmented, { backgroundColor: theme.bg }]}>
            {(['washi', 'sepia', 'dark'] as const).map((mode) => (
              <PressableScale key={mode} onPress={() => setTheme(mode)} style={[styles.segment, state.theme === mode && styles.segmentActive]} activeScale={0.95}>
                <Text style={[styles.segmentText, { color: state.theme === mode ? brand.washi : theme.muted }]}>{mode === 'washi' ? 'Light' : mode === 'sepia' ? 'Sepia' : 'Dark'}</Text>
              </PressableScale>
            ))}
          </View>
        </View>
        <View style={[styles.settingRow, { borderBottomColor: theme.line }]}>
          <Text style={[styles.settingLabel, { color: theme.text }]}>Font size</Text>
          <View style={styles.stepper}>
            <PressableScale onPress={() => setFontSize(state.fontSize - 1)} style={[styles.stepButton, { borderColor: theme.line }]}>
              <Text style={[styles.stepLabel, { color: theme.text }]}>-</Text>
            </PressableScale>
            <Text style={[styles.settingLabel, { color: theme.text }]}>{state.fontSize}</Text>
            <PressableScale onPress={() => setFontSize(state.fontSize + 1)} style={[styles.stepButton, { borderColor: theme.line }]}>
              <Text style={[styles.stepLabel, { color: theme.text }]}>+</Text>
            </PressableScale>
          </View>
        </View>
        <PressableScale onPress={toggleFurigana} style={styles.settingRow} activeScale={0.99}>
          <View>
            <Text style={[styles.settingLabel, { color: theme.text }]}>Furigana</Text>
            <Text style={[styles.metaText, { color: theme.muted }]}>Show readings for kanji</Text>
          </View>
          <View style={[styles.toggleTrack, { backgroundColor: state.furigana ? brand.matcha : theme.line }]}>
            <View style={[styles.toggleKnob, state.furigana && styles.toggleKnobOn]} />
          </View>
        </PressableScale>
      </View>

      <Text style={[styles.sectionKicker, { color: theme.muted }]}>Favorite genres</Text>
      <View style={styles.wordChips}>
        {genres.map((genre) => {
          const selected = state.selectedGenres.includes(genre.id);
          return (
            <PressableScale
              key={genre.id}
              onPress={() =>
                selectGenres(selected ? state.selectedGenres.filter((id) => id !== genre.id) : [...state.selectedGenres, genre.id])
              }
              style={[styles.profileGenre, { backgroundColor: selected ? brand.matcha : theme.card, borderColor: selected ? brand.matcha : theme.line }]}
            >
              <Text style={[styles.profileGenreText, { color: selected ? brand.washi : theme.muted }]}>{genre.english}</Text>
            </PressableScale>
          );
        })}
      </View>

      <PressableScale onPress={resetDemo} style={[styles.secondaryButton, { borderColor: theme.line, backgroundColor: theme.card }]}>
        <Text style={[styles.secondaryLabel, { color: theme.text }]}>Reset progress</Text>
      </PressableScale>
    </View>
  );
}

function CheckSheet({ onContinue }: { onContinue: () => void }) {
  const { state, storyArc, comprehensionChecks, answerCheck } = useKomorebi();
  const theme = themes[state.theme];
  const check = comprehensionChecks[storyArc.segments[state.segmentIndex].id];
  const answered = state.checkAnswer !== null;
  const correct = state.checkAnswer === check.correctIndex;

  return (
    <View style={styles.sheetOverlay}>
      <MotionView animateKey={`check-${storyArc.segments[state.segmentIndex].id}`} style={[styles.sheet, { backgroundColor: theme.card }]} distance={34}>
        <View style={[styles.sheetHandle, { backgroundColor: theme.line }]} />
        <Text style={styles.appKicker}>Check</Text>
        <Text style={[styles.sheetQuestion, { color: theme.text }]}>{check.prompt}</Text>
        <View style={styles.options}>
          {check.options.map((option, index) => {
            const active = state.checkAnswer === index;
            const revealCorrect = answered && index === check.correctIndex;
            const revealWrong = answered && active && !revealCorrect;
            return (
              <PressableScale
                key={option}
                onPress={() => answerCheck(index)}
                style={[
                  styles.option,
                  { backgroundColor: theme.bg, borderColor: 'transparent' },
                  revealCorrect && { borderColor: brand.matcha, backgroundColor: 'rgba(95,114,86,0.12)' },
                  revealWrong && { borderColor: brand.vermilion, backgroundColor: 'rgba(211,90,71,0.1)' },
                ]}
              >
                <Text style={[styles.optionText, { color: theme.text }]}>{option}</Text>
              </PressableScale>
            );
          })}
        </View>
        {answered ? (
          <>
            <Text style={[styles.feedback, { color: correct ? brand.matcha : brand.vermilion }]}>
              {correct ? "That's right! You're reading well." : 'Not quite. Try re-reading the previous section.'}
            </Text>
            <PressableScale onPress={onContinue} style={styles.primaryButton}>
              <Text style={styles.primaryLabel}>{correct ? 'Continue' : 'Keep reading'}</Text>
            </PressableScale>
          </>
        ) : null}
      </MotionView>
    </View>
  );
}

function GlossSheet({ word, status, onClose }: { word: TargetWord; status: WordStatus; onClose: () => void }) {
  const theme = themes[useKomorebi().state.theme];
  const pillColor = status === 'known' ? brand.tokiwa : status === 'learning' ? brand.matcha : brand.vermilion;

  return (
    <Pressable onPress={onClose} style={styles.sheetOverlay}>
      <Pressable style={styles.sheetPressArea} onPress={() => undefined}>
        <MotionView animateKey={word.id} style={[styles.sheet, { backgroundColor: theme.card }]} distance={34}>
        <View style={[styles.sheetHandle, { backgroundColor: theme.line }]} />
        <View style={styles.glossHeader}>
          <Text style={[styles.glossWord, { color: theme.text }]}>{word.word}</Text>
          <Text style={[styles.glossPill, { color: pillColor, backgroundColor: `${pillColor}22` }]}>
            {status === 'known' ? 'Known' : status === 'learning' ? 'Reviewing' : 'New'}
          </Text>
        </View>
        <Text style={styles.glossReading}>{word.reading}</Text>
        <Text style={[styles.glossMeaning, { color: theme.text }]}>{word.meaning}</Text>
        <Text style={[styles.glossExample, { backgroundColor: theme.bg, color: theme.text }]}>{word.example}</Text>
        <PressableScale onPress={onClose} style={styles.primaryButton}>
          <Text style={styles.primaryLabel}>Got it</Text>
        </PressableScale>
        </MotionView>
      </Pressable>
    </Pressable>
  );
}

function TabBar({ active, onChange }: { active: MainTab; onChange: (tab: MainTab) => void }) {
  const theme = themes[useKomorebi().state.theme];
  const tabs: { key: MainTab; icon: string; label: string }[] = [
    { key: 'read', icon: '読', label: 'Read' },
    { key: 'journey', icon: '道', label: 'Path' },
    { key: 'progress', icon: '記', label: 'Progress' },
    { key: 'profile', icon: '設', label: 'Settings' },
  ];

  return (
    <View style={[styles.tabBar, { backgroundColor: theme.card, borderTopColor: theme.line }]}>
      {tabs.map((tab) => {
        const selected = active === tab.key;
        return (
          <PressableScale key={tab.key} onPress={() => onChange(tab.key)} style={styles.tabButton} activeScale={0.92}>
            <Text style={[styles.tabIcon, { color: selected ? brand.matcha : theme.muted }]}>{tab.icon}</Text>
            <Text style={[styles.tabLabel, { color: selected ? brand.matcha : theme.muted }]}>{tab.label}</Text>
          </PressableScale>
        );
      })}
    </View>
  );
}

function Stat({ number, label, color }: { number: number; label: string; color: string }) {
  const theme = themes[useKomorebi().state.theme];
  return (
    <View style={styles.stat}>
      <Text style={[styles.statNumber, { color }]}>{number}</Text>
      <Text style={[styles.statLabel, { color: theme.muted }]}>{label}</Text>
    </View>
  );
}

function MetricCard({ value, label }: { value: string; label: string }) {
  const theme = themes[useKomorebi().state.theme];
  return (
    <View style={[styles.metricCard, { backgroundColor: theme.card, borderColor: theme.line }]}>
      <Text style={[styles.metricValue, { color: theme.text }]}>{value}</Text>
      <Text style={[styles.metaText, { color: theme.muted }]}>{label}</Text>
    </View>
  );
}

function LoadingOverlay() {
  const { state } = useKomorebi();
  const theme = themes[state.theme];
  if (!state.loadingText) return null;

  return (
    <MotionView animateKey={state.loadingText} style={[styles.loadingOverlay, { backgroundColor: theme.bg }]} from="none" duration={240}>
      <SpinningView style={[styles.spinner, { borderColor: theme.line, borderTopColor: brand.matcha }]}>
        <View style={styles.spinnerDot} />
      </SpinningView>
      <Text style={[styles.loadingText, { color: theme.text }]}>{state.loadingText}</Text>
    </MotionView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  appShell: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 22,
    paddingBottom: 118,
  },
  immersiveContent: {
    paddingBottom: 36,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 22,
  },
  appKicker: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 10.5,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: brand.matcha,
    marginBottom: 8,
  },
  screenTitle: {
    fontFamily: fonts.serif,
    fontSize: 27,
    lineHeight: 34,
  },
  subtitle: {
    fontFamily: fonts.sans,
    fontSize: 15,
    lineHeight: 24,
    marginTop: 8,
    marginBottom: 22,
  },
  jpSub: {
    fontFamily: fonts.jpRegular,
    fontSize: 15,
    marginTop: 6,
  },
  levelPill: {
    borderWidth: 1,
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  levelPillText: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 11,
    color: brand.matcha,
  },
  heroCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 22,
    shadowColor: '#1E1E24',
    shadowOpacity: 0.05,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
  },
  bookMark: {
    width: 56,
    height: 72,
    borderRadius: 8,
    backgroundColor: brand.matcha,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  bookMarkText: {
    fontFamily: fonts.jp,
    fontSize: 28,
    color: brand.washi,
  },
  heroTitle: {
    fontFamily: fonts.serif,
    fontSize: 21,
    lineHeight: 30,
    marginBottom: 8,
  },
  heroCopy: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 18,
  },
  heroMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    marginBottom: 20,
  },
  metaText: {
    fontFamily: fonts.sans,
    fontSize: 12,
    lineHeight: 18,
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: brand.matcha,
  },
  spacedButton: {
    marginTop: 28,
  },
  primaryLabel: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 15,
    color: brand.washi,
  },
  readerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18,
  },
  readerHeaderText: {
    flex: 1,
  },
  backButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontFamily: fonts.sans,
    fontSize: 32,
    lineHeight: 34,
  },
  readerTitle: {
    fontFamily: fonts.jp,
    fontSize: 18,
  },
  readerBody: {
    paddingVertical: 28,
  },
  paragraph: {
    fontFamily: fonts.jpRegular,
    marginBottom: 22,
  },
  wordToken: {
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(95,114,86,0.5)',
  },
  newWord: {
    backgroundColor: 'rgba(211,90,71,0.07)',
    borderBottomColor: brand.vermilion,
    borderBottomWidth: 2,
  },
  learningWord: {
    color: brand.matcha,
    borderStyle: 'dashed',
  },
  furigana: {
    fontFamily: fonts.sans,
    fontSize: 10,
    color: 'rgba(30,30,36,0.45)',
  },
  centerScreen: {
    minHeight: 650,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  textButton: {
    paddingTop: 14,
  },
  textButtonLabel: {
    fontFamily: fonts.sansMedium,
    fontSize: 14,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 26,
  },
  progressGrow: {
    flex: 1,
  },
  counter: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 12,
  },
  passage: {
    borderWidth: 1,
    borderRadius: 13,
    padding: 15,
    marginBottom: 16,
  },
  passageText: {
    fontFamily: fonts.jpRegular,
    fontSize: 17,
    lineHeight: 30,
  },
  question: {
    fontFamily: fonts.jp,
    fontSize: 19,
    lineHeight: 31,
    marginBottom: 20,
  },
  options: {
    gap: 10,
  },
  option: {
    borderWidth: 1.5,
    borderRadius: 13,
    padding: 15,
  },
  optionActive: {
    backgroundColor: 'rgba(95,114,86,0.08)',
  },
  optionText: {
    fontFamily: fonts.jpRegular,
    fontSize: 16,
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: 26,
  },
  listCard: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 18,
    marginBottom: 22,
  },
  resultWordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    borderBottomWidth: 1,
    paddingVertical: 11,
  },
  wordDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  resultWordText: {
    flex: 1,
    minWidth: 0,
  },
  resultWordJa: {
    fontFamily: fonts.jpRegular,
    fontSize: 16,
  },
  resultReading: {
    fontFamily: fonts.sans,
    fontSize: 12,
  },
  resultMeaning: {
    fontFamily: fonts.sans,
    fontSize: 12.5,
    marginTop: 1,
  },
  resultStatus: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  statsCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  tallStats: {
    paddingVertical: 24,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: fonts.serif,
    fontSize: 26,
  },
  statLabel: {
    fontFamily: fonts.sans,
    fontSize: 12,
    marginTop: 4,
  },
  unitBlock: {
    marginBottom: 22,
  },
  unitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
    flexWrap: 'wrap',
  },
  unitTitle: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 10.5,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  unitTag: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 9.5,
    letterSpacing: 1,
    textTransform: 'uppercase',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 99,
  },
  journeyRoot: {
    flex: 1,
  },
  journeyHeader: {
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 16,
    borderBottomWidth: 1,
    zIndex: 2,
  },
  journeyLead: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 16,
  },
  journeyStats: {
    marginBottom: 0,
  },
  journeyScrollContent: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 150,
  },
  dotField: {
    marginTop: 4,
  },
  dotRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tinyDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginHorizontal: 2,
    marginVertical: 2,
  },
  playFab: {
    position: 'absolute',
    bottom: 82,
    left: 20,
    height: 48,
    paddingHorizontal: 22,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1E1E24',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  playFabLabel: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 14,
    color: brand.washi,
    letterSpacing: 0.5,
  },
  dotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  compactDotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  compactKnownDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: brand.matcha,
    opacity: 0.72,
  },
  journeyDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  knownDot: {
    backgroundColor: brand.matcha,
    borderColor: brand.matcha,
  },
  learningDot: {
    borderColor: brand.matcha,
    borderWidth: 2,
  },
  dotText: {
    fontFamily: fonts.jpRegular,
    fontSize: 12,
  },
  progressCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 22,
    marginBottom: 16,
  },
  chart: {
    height: 130,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    paddingTop: 16,
    paddingBottom: 8,
  },
  chartBar: {
    flex: 1,
    borderRadius: 99,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
  },
  metricValue: {
    fontFamily: fonts.serif,
    fontSize: 28,
    marginBottom: 4,
  },
  wordChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  wordChip: {
    fontFamily: fonts.jpRegular,
    fontSize: 15,
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 99,
    backgroundColor: 'rgba(95,114,86,0.1)',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 28,
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: brand.matcha,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIconText: {
    fontFamily: fonts.jp,
    fontSize: 26,
    color: '#FFFFFF',
  },
  profileName: {
    fontFamily: fonts.serif,
    fontSize: 21,
  },
  sectionKicker: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 10.5,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    marginHorizontal: 4,
    marginBottom: 12,
  },
  settingsCard: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 18,
    marginBottom: 24,
  },
  settingRow: {
    minHeight: 62,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
  },
  settingLabel: {
    fontFamily: fonts.sans,
    fontSize: 15,
  },
  segmented: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 11,
    gap: 4,
  },
  segment: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 8,
  },
  segmentActive: {
    backgroundColor: brand.matcha,
  },
  segmentText: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 12,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepLabel: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 18,
    lineHeight: 20,
  },
  toggleTrack: {
    width: 48,
    height: 28,
    borderRadius: 99,
    padding: 3,
  },
  toggleKnob: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
  },
  toggleKnobOn: {
    marginLeft: 20,
  },
  profileGenre: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 99,
  },
  profileGenreText: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 13,
  },
  secondaryButton: {
    minHeight: 50,
    borderWidth: 1.5,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  secondaryLabel: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 14,
  },
  sheetOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 20,
    backgroundColor: 'rgba(30,30,36,0.32)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 34,
  },
  sheetPressArea: {
    justifyContent: 'flex-end',
  },
  sheetHandle: {
    width: 38,
    height: 5,
    borderRadius: 99,
    alignSelf: 'center',
    marginBottom: 20,
  },
  sheetQuestion: {
    fontFamily: fonts.jp,
    fontSize: 18,
    lineHeight: 29,
    marginBottom: 20,
  },
  feedback: {
    marginTop: 18,
    marginBottom: 18,
    fontFamily: fonts.serifItalic,
    fontSize: 15,
    lineHeight: 23,
  },
  glossHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  glossWord: {
    fontFamily: fonts.jp,
    fontSize: 36,
    lineHeight: 42,
  },
  glossPill: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 99,
    marginTop: 8,
  },
  glossReading: {
    fontFamily: fonts.jpRegular,
    fontSize: 17,
    color: brand.matcha,
    marginTop: 6,
    marginBottom: 16,
  },
  glossMeaning: {
    fontFamily: fonts.serif,
    fontSize: 18,
    marginBottom: 18,
  },
  glossExample: {
    borderRadius: 13,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: fonts.jpRegular,
    fontSize: 15,
    lineHeight: 27,
    marginBottom: 22,
  },
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 8,
    paddingBottom: 26,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
  },
  tabIcon: {
    fontFamily: fonts.jp,
    fontSize: 21,
    lineHeight: 23,
  },
  tabLabel: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 9.5,
    letterSpacing: 0.6,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    zIndex: 30,
  },
  spinner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: brand.matcha,
  },
  loadingText: {
    fontFamily: fonts.serifItalic,
    fontSize: 16,
  },
});
