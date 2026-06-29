export type GenreId =
  | 'slice-life'
  | 'romance'
  | 'comedy'
  | 'fantasy'
  | 'shounen'
  | 'mystery'
  | 'sci-fi'
  | 'horror';

export type ThemeMode = 'washi' | 'sepia' | 'dark';
export type WordStatus = 'new' | 'learning' | 'known' | 'locked';
export type QuestionKind = 'placement' | 'comprehension' | 'vocab-context' | 'story-comprehension';
export type ScreenName = 'welcome' | 'login' | 'placement-choice' | 'placement-exam' | 'placement-result' | 'genre-selection' | 'read' | 'journey' | 'progress' | 'profile' | 'story' | 'exam' | 'results';
export type PlacementMode = 'exam' | 'beginner';

export type Genre = {
  id: GenreId;
  english: string;
  japanese: string;
  accent: string;
};

export type TargetWord = {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  example: string;
};

export type StoryToken = {
  text: string;
  reading?: string;
  wordId?: string;
};

export type StorySegment = {
  id: string;
  chapter: string;
  paragraphs: StoryToken[][];
};

export type ChoiceQuestion = {
  id: string;
  kind: QuestionKind;
  prompt: string;
  options: string[];
  correctIndex: number;
  passage?: string;
  context?: string;
};

export type JourneyDot = {
  id: string;
  label?: string;
  wordId?: string;
  status: WordStatus;
};

export type JourneyUnit = {
  id: string;
  title: string;
  state: 'complete' | 'current' | 'locked';
  dots: JourneyDot[];
};

export type KomorebiState = {
  onboardingIndex: number;
  placementMode: PlacementMode;
  placementIndex: number;
  placementAnswers: Record<string, number>;
  selectedGenres: GenreId[];
  segmentIndex: number;
  glossedWordIds: string[];
  completedCheckIds: string[];
  examIndex: number;
  examAnswers: Record<string, number>;
  theme: ThemeMode;
  fontSize: number;
  furigana: boolean;
  knownCount: number;
  learningCount: number;
  totalCount: number;
  level: string;
  arcComplete: boolean;
};
