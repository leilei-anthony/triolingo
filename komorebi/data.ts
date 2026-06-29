import type { ChoiceQuestion, Genre, JourneyUnit, StorySegment, TargetWord } from './types';

export const walkthroughSlides = [
  {
    title: 'Read Japanese you can actually understand.',
    subtitle: 'Komorebi gives you stories pitched at exactly the level you can handle today.',
  },
  {
    title: 'Stories at your level - that grow as you do.',
    subtitle: 'A few new words each session, woven into a narrative you actually want to finish.',
  },
  {
    title: 'Progress toward N3, no streaks required.',
    subtitle: 'Watch your vocabulary grow along a calm, visible path. Come back for the story, not the guilt.',
  },
];

export const genres: Genre[] = [
  { id: 'slice-life', english: 'Slice of Life', japanese: '日常', accent: '#8B7D5F' },
  { id: 'romance', english: 'Romance', japanese: '恋愛', accent: '#B76E79' },
  { id: 'comedy', english: 'Comedy', japanese: 'お笑い', accent: '#C08A3E' },
  { id: 'fantasy', english: 'Fantasy', japanese: '幻想', accent: '#6D6B9C' },
  { id: 'shounen', english: 'Shounen', japanese: '少年', accent: '#B85C38' },
  { id: 'mystery', english: 'Mystery', japanese: '推理', accent: '#5F7256' },
  { id: 'sci-fi', english: 'Sci-Fi', japanese: 'SF', accent: '#47727A' },
  { id: 'horror', english: 'Horror', japanese: '怪談', accent: '#4B3B4F' },
];

export const targetWords: TargetWord[] = [
  { id: 'yoru', word: '夜', reading: 'よる', meaning: 'night', example: '夜は静かです。 / The night is quiet.' },
  { id: 'toshokan', word: '図書館', reading: 'としょかん', meaning: 'library', example: '図書館で本を読みます。 / I read books at the library.' },
  { id: 'furui', word: '古い', reading: 'ふるい', meaning: 'old (of objects)', example: 'この本はとても古い。 / This book is very old.' },
  { id: 'nakunaru', word: 'なくなる', reading: 'なくなる', meaning: 'to disappear; be lost', example: 'かぎがなくなった。 / The key disappeared.' },
  { id: 'shizuka', word: '静か', reading: 'しずか', meaning: 'quiet; calm', example: '静かな部屋。 / A quiet room.' },
  { id: 'tegami', word: '手紙', reading: 'てがみ', meaning: 'letter', example: '母に手紙を書く。 / I write a letter to my mother.' },
  { id: 'tsukue', word: '机', reading: 'つくえ', meaning: 'desk', example: '机の上に本がある。 / There is a book on the desk.' },
  { id: 'mitsukaru', word: '見つかる', reading: 'みつかる', meaning: 'to be found', example: 'かばんが見つかった。 / The bag was found.' },
  { id: 'sensei', word: '先生', reading: 'せんせい', meaning: 'teacher', example: '先生に質問する。 / I ask the teacher a question.' },
  { id: 'gakusei', word: '学生', reading: 'がくせい', meaning: 'student', example: '学生が三人いる。 / There are three students.' },
  { id: 'fushigi', word: '不思議', reading: 'ふしぎ', meaning: 'mysterious; strange', example: '不思議な話。 / A strange story.' },
  { id: 'shiraberu', word: '調べる', reading: 'しらべる', meaning: 'to investigate; look into', example: '事件を調べる。 / To investigate the case.' },
  { id: 'mado', word: '窓', reading: 'まど', meaning: 'window', example: '窓を見る。 / I look at the window.' },
  { id: 'akeru', word: '開ける', reading: 'あける', meaning: 'to open', example: 'ドアを開ける。 / To open the door.' },
  { id: 'kagi', word: '鍵', reading: 'かぎ', meaning: 'key', example: '鍵を持つ。 / To hold the key.' },
  { id: 'motteiku', word: '持っていく', reading: 'もっていく', meaning: 'to take away', example: '傘を持っていく。 / To take an umbrella.' },
  { id: 'shinjitsu', word: '真実', reading: 'しんじつ', meaning: 'the truth', example: '真実を知る。 / To know the truth.' },
  { id: 'kakusu', word: '隠す', reading: 'かくす', meaning: 'to hide; conceal', example: '本を隠す。 / To hide a book.' },
  { id: 'kizuku', word: '気づく', reading: 'きづく', meaning: 'to notice; realize', example: '間違いに気づく。 / To notice a mistake.' },
  { id: 'yakusoku', word: '約束', reading: 'やくそく', meaning: 'promise', example: '約束を守る。 / To keep a promise.' },
];

export const storyArc = {
  title: 'The Library Letter',
  japaneseTitle: '図書館の手紙',
  genre: 'Mystery',
  segments: [
    {
      id: 'segment-1',
      chapter: 'Chapter 1',
      paragraphs: [
        [
          { text: '昨日', reading: 'きのう' },
          { text: 'の' },
          { text: '夜', reading: 'よる', wordId: 'yoru' },
          { text: '、' },
          { text: '図書館', reading: 'としょかん', wordId: 'toshokan' },
          { text: 'で' },
          { text: '古い', reading: 'ふるい', wordId: 'furui' },
          { text: '本' },
          { text: 'が' },
          { text: '一冊' },
          { text: 'なくなりました', wordId: 'nakunaru' },
          { text: '。' },
        ],
        [
          { text: '図書館', reading: 'としょかん', wordId: 'toshokan' },
          { text: 'には' },
          { text: '先生', reading: 'せんせい', wordId: 'sensei' },
          { text: 'と' },
          { text: '学生', reading: 'がくせい', wordId: 'gakusei' },
          { text: '三人がいました。' },
        ],
        [
          { text: '朝' },
          { text: 'になると、本は' },
          { text: '机', reading: 'つくえ', wordId: 'tsukue' },
          { text: 'の下で' },
          { text: '見つかりました', wordId: 'mitsukaru' },
          { text: '。' },
        ],
        [
          { text: 'でも、本の中にあった' },
          { text: '手紙', reading: 'てがみ', wordId: 'tegami' },
          { text: 'はなくなっていました。' },
        ],
        [
          { text: 'だれが' },
          { text: '手紙', reading: 'てがみ', wordId: 'tegami' },
          { text: 'を' },
          { text: '持っていった', wordId: 'motteiku' },
          { text: 'のでしょうか。' },
        ],
      ],
    },
    {
      id: 'segment-2',
      chapter: 'Chapter 2',
      paragraphs: [
        [
          { text: '図書館', reading: 'としょかん', wordId: 'toshokan' },
          { text: 'はとても' },
          { text: '静か', reading: 'しずか', wordId: 'shizuka' },
          { text: 'でした。' },
          { text: '先生', reading: 'せんせい', wordId: 'sensei' },
          { text: 'は' },
          { text: '机', reading: 'つくえ', wordId: 'tsukue' },
          { text: 'の近くに立っていました。' },
        ],
        [
          { text: '三人の' },
          { text: '学生', reading: 'がくせい', wordId: 'gakusei' },
          { text: 'は、' },
          { text: '不思議', reading: 'ふしぎ', wordId: 'fushigi' },
          { text: 'な顔をして、本を見ていました。' },
        ],
        [
          { text: '一人の学生は「この' },
          { text: '手紙', reading: 'てがみ', wordId: 'tegami' },
          { text: 'を' },
          { text: '調べる', reading: 'しらべる', wordId: 'shiraberu' },
          { text: '必要があります」と言いました。' },
        ],
      ],
    },
  ] satisfies StorySegment[],
};

export const comprehensionChecks: Record<string, ChoiceQuestion> = {
  'segment-1': {
    id: 'check-1',
    kind: 'comprehension',
    prompt: '本はどこで見つかりましたか。',
    options: ['本棚の上', '先生のかばん', '机の下', 'ドアの前'],
    correctIndex: 2,
  },
};

export const placementExam: ChoiceQuestion[] = [
  {
    id: 'placement-1',
    kind: 'placement',
    passage: 'わたしは まいにち 学校へ 行きます。ともだちと いっしょに べんきょうします。',
    prompt: 'わたしは だれと べんきょうしますか。',
    options: ['先生', 'ともだち', 'かぞく', 'ひとりで'],
    correctIndex: 1,
  },
  {
    id: 'placement-2',
    kind: 'placement',
    prompt: '「この本は とても ＿＿ です。むずかしくて よめません。」 ＿＿に入る言葉は？',
    options: ['かんたん', 'おもしろい', 'むずかしい', 'やすい'],
    correctIndex: 2,
  },
  {
    id: 'placement-3',
    kind: 'placement',
    prompt: '「来週、日本へ 旅行に 行きます。」 「来週」の意味は？',
    options: ['last week', 'next week', 'yesterday', 'every week'],
    correctIndex: 1,
  },
  {
    id: 'placement-4',
    kind: 'placement',
    passage: '駅の前で古い友だちに会いました。雨だったので、二人で小さいカフェに入りました。',
    prompt: '二人はどうしてカフェに入りましたか。',
    options: ['雨だったから', '駅が閉まったから', '本を買うため', '先生を待つため'],
    correctIndex: 0,
  },
  {
    id: 'placement-5',
    kind: 'placement',
    prompt: '「かばんが見つかりました。」に一番近い意味は？',
    options: ['The bag was bought.', 'The bag was found.', 'The bag was heavy.', 'The bag was opened.'],
    correctIndex: 1,
  },
  {
    id: 'placement-6',
    kind: 'placement',
    prompt: '「図書館では静かにしてください。」どこで静かにしますか。',
    options: ['学校', '駅', '図書館', '家'],
    correctIndex: 2,
  },
];

export const arcExam: ChoiceQuestion[] = [
  {
    id: 'exam-1',
    kind: 'vocab-context',
    context: '先生は事件を調べる。',
    prompt: '「調べる」の意味は？',
    options: ['to hide', 'to investigate', 'to open', 'to notice'],
    correctIndex: 1,
  },
  {
    id: 'exam-2',
    kind: 'vocab-context',
    context: '友だちと約束をする。',
    prompt: '「約束」の意味は？',
    options: ['promise', 'letter', 'truth', 'key'],
    correctIndex: 0,
  },
  {
    id: 'exam-3',
    kind: 'vocab-context',
    context: 'お金を隠す。',
    prompt: '「隠す」の意味は？',
    options: ['to find', 'to hide', 'to lose', 'to take'],
    correctIndex: 1,
  },
  {
    id: 'exam-4',
    kind: 'vocab-context',
    context: '間違いに気づく。',
    prompt: '「気づく」の意味は？',
    options: ['to forget', 'to open', 'to notice', 'to read'],
    correctIndex: 2,
  },
  {
    id: 'exam-5',
    kind: 'vocab-context',
    context: '真実を話す。',
    prompt: '「真実」の意味は？',
    options: ['the truth', 'a promise', 'a window', 'a desk'],
    correctIndex: 0,
  },
  {
    id: 'exam-6',
    kind: 'story-comprehension',
    prompt: 'この物語で、なくなったものは何ですか。',
    options: ['古い本と手紙', '鍵だけ', '机', '窓'],
    correctIndex: 0,
  },
  {
    id: 'exam-7',
    kind: 'story-comprehension',
    prompt: 'だれが真実を隠していましたか。',
    options: ['先生', '学生', '図書館の人', 'だれも隠していない'],
    correctIndex: 0,
  },
  {
    id: 'exam-8',
    kind: 'story-comprehension',
    prompt: '学生は最後に何に気づきましたか。',
    options: ['先生の古い約束', '鍵の場所', '本の名前', '窓の鍵'],
    correctIndex: 0,
  },
];

export const journeyBaseUnits: JourneyUnit[] = [
  {
    id: 'unit-1',
    title: 'Unit 1 · First Steps',
    state: 'complete',
    dots: Array.from({ length: 12 }, (_, i) => ({ id: `unit-1-${i}`, status: 'known' as const })),
  },
  {
    id: 'unit-2',
    title: 'Unit 2 · Everyday Life',
    state: 'complete',
    dots: Array.from({ length: 12 }, (_, i) => ({ id: `unit-2-${i}`, status: 'known' as const })),
  },
  {
    id: 'unit-3',
    title: 'Unit 3 · School & Friends',
    state: 'current',
    dots: Array.from({ length: 12 }, (_, i) => ({ id: `unit-3-${i}`, status: i < 5 ? 'known' as const : 'new' as const })),
  },
];

export const progressHistory = [412, 430, 447, 461, 474, 487, 500, 518];
export const recentWords = ['真実', '約束', '鍵', '調べる', '隠す', '気づく', '窓', '学生'];
