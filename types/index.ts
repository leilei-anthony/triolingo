export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2';
export type Genre = 'Mystery' | 'Sci-Fi' | 'Romance' | 'Travel';

export type WordEntry = {
  word: string;
  reading: string;
  definition: string;
};

export type StoryTemplate = {
  title: string;
  body: string[];
  words: WordEntry[];
};

export type QuizQuestion = {
  prompt: string;
  answer: string;
  distractors: string[];
};

export type TrilingoState = {
  level: string;
  wordsLearned: number;
  streak: number;
  genre: Genre;
  storyCompleted: boolean;
  diagnosticUnknowns: string[];
  currentDiagnosticLevel: JLPTLevel;
};

export type Action =
  | { type: 'HYDRATE'; payload: TrilingoState }
  | { type: 'SET_GENRE'; genre: Genre }
  | { type: 'COMPLETE_STORY' }
  | { type: 'SUBMIT_PLACEMENT'; level: string }
  | { type: 'COMPLETE_QUIZ'; score: number }
  | { type: 'SET_DIAGNOSTIC_UNKNOWNS'; unknowns: string[] }
  | { type: 'SET_DIAGNOSTIC_LEVEL'; level: JLPTLevel };

export type TextSegment =
  | { type: 'plain'; text: string }
  | { type: 'word'; text: string; entry: WordEntry };
