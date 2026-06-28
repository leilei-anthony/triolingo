import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import type { Action, Genre, JLPTLevel, TrilingoState } from '../types';

const STORAGE_KEY = 'triolingo-state';

const defaultState: TrilingoState = {
  level: 'Placement pending',
  wordsLearned: 0,
  streak: 3,
  genre: 'Mystery',
  storyCompleted: false,
  diagnosticUnknowns: [],
  currentDiagnosticLevel: 'N5',
};

function reducer(state: TrilingoState, action: Action): TrilingoState {
  switch (action.type) {
    case 'HYDRATE':
      return { ...defaultState, ...action.payload };
    case 'SET_GENRE':
      return { ...state, genre: action.genre };
    case 'COMPLETE_STORY':
      return { ...state, storyCompleted: true };
    case 'SUBMIT_PLACEMENT':
      return { ...state, level: action.level };
    case 'COMPLETE_QUIZ':
      if (action.score >= 3) {
        return { ...state, wordsLearned: state.wordsLearned + 5, streak: state.streak + 1 };
      }
      return state;
    case 'SET_DIAGNOSTIC_UNKNOWNS':
      return { ...state, diagnosticUnknowns: action.unknowns };
    case 'SET_DIAGNOSTIC_LEVEL':
      return { ...state, currentDiagnosticLevel: action.level };
    default:
      return state;
  }
}

type ContextValue = {
  state: TrilingoState;
  hydrated: boolean;
  setGenre: (genre: Genre) => void;
  completeStory: () => void;
  submitPlacement: (level: string) => void;
  completeQuiz: (score: number) => void;
  setDiagnosticUnknowns: (unknowns: string[]) => void;
  setDiagnosticLevel: (level: JLPTLevel) => void;
};

const TrilingoContext = createContext<ContextValue | null>(null);

export function TrilingoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) {
          try {
            dispatch({ type: 'HYDRATE', payload: JSON.parse(raw) });
          } catch {
            // ignore bad stored data, use defaults
          }
        }
      })
      .finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (hydrated) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, hydrated]);

  const value: ContextValue = {
    state,
    hydrated,
    setGenre: (genre) => dispatch({ type: 'SET_GENRE', genre }),
    completeStory: () => dispatch({ type: 'COMPLETE_STORY' }),
    submitPlacement: (level) => dispatch({ type: 'SUBMIT_PLACEMENT', level }),
    completeQuiz: (score) => dispatch({ type: 'COMPLETE_QUIZ', score }),
    setDiagnosticUnknowns: (unknowns) => dispatch({ type: 'SET_DIAGNOSTIC_UNKNOWNS', unknowns }),
    setDiagnosticLevel: (level) => dispatch({ type: 'SET_DIAGNOSTIC_LEVEL', level }),
  };

  return <TrilingoContext.Provider value={value}>{children}</TrilingoContext.Provider>;
}

export function useTrilingoContext(): ContextValue {
  const ctx = useContext(TrilingoContext);
  if (!ctx) throw new Error('useTrilingoContext must be used within TrilingoProvider');
  return ctx;
}
