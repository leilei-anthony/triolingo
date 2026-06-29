import React, { createContext, useContext, useMemo, useReducer } from 'react';
import {
  arcExam,
  comprehensionChecks,
  currentStoryWordIds,
  genres,
  journeyBaseUnits,
  learningAfterArc,
  placementExam,
  progressHistory,
  recentWords,
  storyArc,
  targetWords,
  walkthroughSlides,
} from '../constants/data';
import type { GenreId, KomorebiState, PlacementMode, ReadView, ThemeMode, WordStatus } from '../types';

type Action =
  | { type: 'NEXT_WALK' }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'SET_PLACEMENT_MODE'; mode: PlacementMode }
  | { type: 'SET_PLACEMENT_ANSWER'; questionId: string; index: number }
  | { type: 'NEXT_PLACEMENT' }
  | { type: 'BEGINNER_RESULT' }
  | { type: 'PLACE_RESULT' }
  | { type: 'SET_SELECTED_GENRES'; genres: GenreId[] }
  | { type: 'SET_READ_VIEW'; readView: ReadView }
  | { type: 'SET_SEGMENT_INDEX'; index: number }
  | { type: 'MARK_GLOSS'; wordId: string }
  | { type: 'MARK_SEGMENT_WORDS'; wordIds: string[] }
  | { type: 'OPEN_CHECK'; segmentId: string }
  | { type: 'SET_CHECK_ANSWER'; index: number | null }
  | { type: 'MARK_CHECK_COMPLETE'; segmentId: string }
  | { type: 'SET_EXAM_ANSWER'; questionId: string; index: number }
  | { type: 'RESET_EXAM' }
  | { type: 'NEXT_EXAM' }
  | { type: 'ADVANCE_RESULTS' }
  | { type: 'SET_THEME'; theme: ThemeMode }
  | { type: 'SET_FONT_SIZE'; fontSize: number }
  | { type: 'TOGGLE_FURIGANA' }
  | { type: 'SET_LOADING'; text: string | null }
  | { type: 'RESET_DEMO' };

const initialState: KomorebiState = {
  onboardingComplete: false,
  onboardingScreen: 'welcome',
  walkIndex: 0,
  placementMode: 'exam',
  placementIndex: 0,
  placementAnswers: {},
  selectedGenres: ['mystery'],
  readView: 'home',
  segmentIndex: 0,
  glossedWordIds: [],
  completedCheckIds: [],
  checkSegmentId: null,
  checkAnswer: null,
  examIndex: 0,
  examAnswers: {},
  theme: 'washi',
  fontSize: 21,
  furigana: true,
  knownCount: 500,
  learningCount: 0,
  totalCount: 1500,
  level: 'N4後半',
  arcComplete: false,
  loadingText: null,
};

function uniqueAppend(existing: string[], incoming: string[]) {
  const next = [...existing];
  let added = 0;
  incoming.forEach((id) => {
    if (!next.includes(id)) {
      next.push(id);
      added += 1;
    }
  });
  return { next, added };
}

function reducer(state: KomorebiState, action: Action): KomorebiState {
  switch (action.type) {
    case 'NEXT_WALK':
      return { ...state, walkIndex: Math.min(state.walkIndex + 1, walkthroughSlides.length - 1) };
    case 'COMPLETE_ONBOARDING':
      return { ...state, onboardingComplete: true, onboardingScreen: 'login' };
    case 'SET_PLACEMENT_MODE':
      return { ...state, placementMode: action.mode, placementIndex: 0, placementAnswers: {} };
    case 'SET_PLACEMENT_ANSWER':
      return { ...state, placementAnswers: { ...state.placementAnswers, [action.questionId]: action.index } };
    case 'NEXT_PLACEMENT':
      return { ...state, placementIndex: Math.min(state.placementIndex + 1, placementExam.length - 1) };
    case 'BEGINNER_RESULT':
      return {
        ...state,
        placementMode: 'beginner',
        level: 'はじめて',
        knownCount: 0,
        learningCount: 0,
        totalCount: 2000,
      };
    case 'PLACE_RESULT':
      return {
        ...state,
        placementMode: 'exam',
        level: 'N4後半',
        knownCount: 500,
        learningCount: 0,
        totalCount: 1500,
      };
    case 'SET_SELECTED_GENRES':
      return { ...state, selectedGenres: action.genres.slice(0, 3) };
    case 'SET_READ_VIEW':
      return { ...state, readView: action.readView };
    case 'SET_SEGMENT_INDEX':
      return { ...state, segmentIndex: Math.max(0, Math.min(action.index, storyArc.segments.length - 1)) };
    case 'MARK_GLOSS': {
      if (state.glossedWordIds.includes(action.wordId)) return state;
      const isCurrentStoryWord = currentStoryWordIds.includes(action.wordId);
      return {
        ...state,
        glossedWordIds: [...state.glossedWordIds, action.wordId],
        learningCount: isCurrentStoryWord ? state.learningCount + 1 : state.learningCount,
      };
    }
    case 'MARK_SEGMENT_WORDS': {
      const storyWordIds = action.wordIds.filter((wordId) => currentStoryWordIds.includes(wordId));
      const { next, added } = uniqueAppend(state.glossedWordIds, storyWordIds);
      return { ...state, glossedWordIds: next, learningCount: state.learningCount + added };
    }
    case 'OPEN_CHECK':
      return { ...state, checkSegmentId: action.segmentId, checkAnswer: null };
    case 'SET_CHECK_ANSWER':
      return { ...state, checkAnswer: action.index };
    case 'MARK_CHECK_COMPLETE':
      if (state.completedCheckIds.includes(action.segmentId)) {
        return { ...state, checkAnswer: null, checkSegmentId: null };
      }
      return {
        ...state,
        completedCheckIds: [...state.completedCheckIds, action.segmentId],
        checkAnswer: null,
        checkSegmentId: null,
      };
    case 'SET_EXAM_ANSWER':
      return { ...state, examAnswers: { ...state.examAnswers, [action.questionId]: action.index } };
    case 'RESET_EXAM':
      return { ...state, examIndex: 0, examAnswers: {} };
    case 'NEXT_EXAM':
      return { ...state, examIndex: Math.min(state.examIndex + 1, arcExam.length - 1) };
    case 'ADVANCE_RESULTS':
      return {
        ...state,
        arcComplete: true,
        knownCount: state.knownCount + currentStoryWordIds.length - learningAfterArc.length,
        learningCount: learningAfterArc.length,
        totalCount: Math.max(0, state.totalCount - (currentStoryWordIds.length - learningAfterArc.length)),
      };
    case 'SET_THEME':
      return { ...state, theme: action.theme };
    case 'SET_FONT_SIZE':
      return { ...state, fontSize: Math.max(18, Math.min(27, action.fontSize)) };
    case 'TOGGLE_FURIGANA':
      return { ...state, furigana: !state.furigana };
    case 'SET_LOADING':
      return { ...state, loadingText: action.text };
    case 'RESET_DEMO':
      return initialState;
    default:
      return state;
  }
}

type Context = {
  state: KomorebiState;
  walkthroughSlides: typeof walkthroughSlides;
  genres: typeof genres;
  targetWords: typeof targetWords;
  storyArc: typeof storyArc;
  placementExam: typeof placementExam;
  comprehensionChecks: typeof comprehensionChecks;
  arcExam: typeof arcExam;
  journeyBaseUnits: typeof journeyBaseUnits;
  progressHistory: typeof progressHistory;
  recentWords: typeof recentWords;
  learningAfterArc: typeof learningAfterArc;
  getWordStatus: (wordId: string) => WordStatus;
  nextWalk: () => void;
  completeOnboarding: () => void;
  selectPlacementMode: (mode: PlacementMode) => void;
  answerPlacement: (questionId: string, index: number) => void;
  nextPlacement: () => void;
  beginnerResult: () => void;
  placeResult: () => void;
  selectGenres: (ids: GenreId[]) => void;
  goToSegment: (index: number) => void;
  setReadView: (readView: ReadView) => void;
  markGloss: (wordId: string) => void;
  markSegmentWords: (wordIds: string[]) => void;
  openCheck: (segmentId: string) => void;
  answerCheck: (index: number | null) => void;
  markCheckComplete: (segmentId: string) => void;
  answerExam: (questionId: string, index: number) => void;
  resetExam: () => void;
  nextExam: () => void;
  advanceResults: () => void;
  setTheme: (theme: ThemeMode) => void;
  setFontSize: (fontSize: number) => void;
  toggleFurigana: () => void;
  setLoading: (text: string | null) => void;
  resetDemo: () => void;
};

const KomorebiContext = createContext<Context | null>(null);

export function KomorebiProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo<Context>(
    () => ({
      state,
      walkthroughSlides,
      genres,
      targetWords,
      storyArc,
      placementExam,
      comprehensionChecks,
      arcExam,
      journeyBaseUnits,
      progressHistory,
      recentWords,
      learningAfterArc,
      getWordStatus: (wordId) => {
        if (!currentStoryWordIds.includes(wordId)) return 'known';
        if (state.arcComplete) return learningAfterArc.includes(wordId) ? 'learning' : 'known';
        if (state.glossedWordIds.includes(wordId)) return 'learning';
        const firstIndex = storyArc.segments.findIndex((segment) =>
          segment.paragraphs.some((paragraph) => paragraph.some((token) => token.wordId === wordId)),
        );
        if (firstIndex === -1) return 'locked';
        if (firstIndex < state.segmentIndex) return 'learning';
        if (firstIndex === state.segmentIndex) return 'new';
        return 'locked';
      },
      nextWalk: () => dispatch({ type: 'NEXT_WALK' }),
      completeOnboarding: () => dispatch({ type: 'COMPLETE_ONBOARDING' }),
      selectPlacementMode: (mode) => dispatch({ type: 'SET_PLACEMENT_MODE', mode }),
      answerPlacement: (questionId, index) => dispatch({ type: 'SET_PLACEMENT_ANSWER', questionId, index }),
      nextPlacement: () => dispatch({ type: 'NEXT_PLACEMENT' }),
      beginnerResult: () => dispatch({ type: 'BEGINNER_RESULT' }),
      placeResult: () => dispatch({ type: 'PLACE_RESULT' }),
      selectGenres: (ids) => dispatch({ type: 'SET_SELECTED_GENRES', genres: ids }),
      setReadView: (readView) => dispatch({ type: 'SET_READ_VIEW', readView }),
      goToSegment: (index) => dispatch({ type: 'SET_SEGMENT_INDEX', index }),
      markGloss: (wordId) => dispatch({ type: 'MARK_GLOSS', wordId }),
      markSegmentWords: (wordIds) => dispatch({ type: 'MARK_SEGMENT_WORDS', wordIds }),
      openCheck: (segmentId) => dispatch({ type: 'OPEN_CHECK', segmentId }),
      answerCheck: (index) => dispatch({ type: 'SET_CHECK_ANSWER', index }),
      markCheckComplete: (segmentId) => dispatch({ type: 'MARK_CHECK_COMPLETE', segmentId }),
      answerExam: (questionId, index) => dispatch({ type: 'SET_EXAM_ANSWER', questionId, index }),
      resetExam: () => dispatch({ type: 'RESET_EXAM' }),
      nextExam: () => dispatch({ type: 'NEXT_EXAM' }),
      advanceResults: () => dispatch({ type: 'ADVANCE_RESULTS' }),
      setTheme: (theme) => dispatch({ type: 'SET_THEME', theme }),
      setFontSize: (fontSize) => dispatch({ type: 'SET_FONT_SIZE', fontSize }),
      toggleFurigana: () => dispatch({ type: 'TOGGLE_FURIGANA' }),
      setLoading: (text) => dispatch({ type: 'SET_LOADING', text }),
      resetDemo: () => dispatch({ type: 'RESET_DEMO' }),
    }),
    [state],
  );

  return <KomorebiContext.Provider value={value}>{children}</KomorebiContext.Provider>;
}

export function useKomorebi() {
  const ctx = useContext(KomorebiContext);
  if (!ctx) throw new Error('useKomorebi must be used within KomorebiProvider');
  return ctx;
}
