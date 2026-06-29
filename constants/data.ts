import type { ChoiceQuestion, Genre, JourneyUnit, StorySegment, TargetWord } from '../types';

export const walkthroughSlides = [
  {
    title: '今の自分に読める日本語を。',
    subtitle: '木漏れ日は、今日の読解力に合う物語を静かに届けます。',
  },
  {
    title: '物語も、語彙も、少しずつ深く。',
    subtitle: '一度に増やす新出語は少なめ。読み終えたくなる文脈の中で覚えます。',
  },
  {
    title: 'N3までの道のりを、無理なく見える形に。',
    subtitle: '連続記録に追われず、増えた語彙を一語ずつ確かめられます。',
  },
];

export const genres: Genre[] = [
  { id: 'slice-life', english: '日常もの', japanese: '日常', accent: '#8B7D5F' },
  { id: 'romance', english: '恋愛', japanese: '恋愛', accent: '#B76E79' },
  { id: 'comedy', english: '喜劇', japanese: 'お笑い', accent: '#C08A3E' },
  { id: 'fantasy', english: '幻想', japanese: '幻想', accent: '#6D6B9C' },
  { id: 'shounen', english: '少年向け', japanese: '少年', accent: '#B85C38' },
  { id: 'mystery', english: '推理', japanese: '推理', accent: '#5F7256' },
  { id: 'sci-fi', english: 'SF', japanese: 'SF', accent: '#47727A' },
  { id: 'horror', english: '怪談', japanese: '怪談', accent: '#4B3B4F' },
];

export const targetWords: TargetWord[] = [
  { id: 'yoru', word: '夜', reading: 'よる', meaning: '夜の時間', example: '夜は静かです。' },
  { id: 'toshokan', word: '図書館', reading: 'としょかん', meaning: '本を読んだり借りたりする場所', example: '図書館で本を読みます。' },
  { id: 'furui', word: '古い', reading: 'ふるい', meaning: '長い時間がたっている様子', example: 'この本はとても古い。' },
  { id: 'nakunaru', word: 'なくなる', reading: 'なくなる', meaning: 'あったものが見えなくなること', example: 'かぎがなくなった。' },
  { id: 'shizuka', word: '静か', reading: 'しずか', meaning: '音が少なく落ち着いている様子', example: '静かな部屋。' },
  { id: 'tegami', word: '手紙', reading: 'てがみ', meaning: '相手に気持ちや用件を書くもの', example: '母に手紙を書く。' },
  { id: 'tsukue', word: '机', reading: 'つくえ', meaning: '勉強や作業に使う台', example: '机の上に本がある。' },
  { id: 'mitsukaru', word: '見つかる', reading: 'みつかる', meaning: '探していたものが見えるようになること', example: 'かばんが見つかった。' },
  { id: 'sensei', word: '先生', reading: 'せんせい', meaning: '教える人', example: '先生に質問する。' },
  { id: 'gakusei', word: '学生', reading: 'がくせい', meaning: '学校で学ぶ人', example: '学生が三人いる。' },
  { id: 'fushigi', word: '不思議', reading: 'ふしぎ', meaning: '理由がすぐには分からない様子', example: '不思議な話。' },
  { id: 'shiraberu', word: '調べる', reading: 'しらべる', meaning: '分からないことを確かめること', example: '事件を調べる。' },
  { id: 'mado', word: '窓', reading: 'まど', meaning: '光や風を入れるための開口部', example: '窓を見る。' },
  { id: 'akeru', word: '開ける', reading: 'あける', meaning: '閉じているものを開くこと', example: 'ドアを開ける。' },
  { id: 'kagi', word: '鍵', reading: 'かぎ', meaning: '戸や箱を開け閉めする道具', example: '鍵を持つ。' },
  { id: 'motteiku', word: '持っていく', reading: 'もっていく', meaning: '持ったまま別の場所へ行くこと', example: '傘を持っていく。' },
  { id: 'shinjitsu', word: '真実', reading: 'しんじつ', meaning: '本当にあったこと', example: '真実を知る。' },
  { id: 'kakusu', word: '隠す', reading: 'かくす', meaning: '見えないようにすること', example: '本を隠す。' },
  { id: 'kizuku', word: '気づく', reading: 'きづく', meaning: 'それまで分からなかったことが分かること', example: '間違いに気づく。' },
  { id: 'yakusoku', word: '約束', reading: 'やくそく', meaning: '相手と決めて守ること', example: '約束を守る。' },
];

export const currentStoryWordIds = ['yoru', 'shizuka', 'mado', 'shinjitsu', 'yakusoku'];
export const learningAfterArc = ['yakusoku'];

export const storyArc = {
  title: '図書館の手紙',
  japaneseTitle: '図書館の手紙',
  genre: '推理',
  totalWords: currentStoryWordIds.length,
  segments: [
    {
      id: 'segment-1',
      chapter: '第1章',
      paragraphs: [
        [
          { text: '昨日', reading: 'きのう' },
          { text: 'の' },
          { text: '夜', reading: 'よる', wordId: 'yoru' },
          { text: '、' },
          { text: '図書館', reading: 'としょかん', wordId: 'toshokan' },
          { text: 'で' },
          { text: '古い', reading: 'ふるい', wordId: 'furui' },
          { text: '本', reading: 'ほん' },
          { text: 'が' },
          { text: '一冊', reading: 'いっさつ' },
          { text: 'なくなりました', wordId: 'nakunaru' },
          { text: '。' },
        ],
        [
          { text: '図書館', reading: 'としょかん', wordId: 'toshokan' },
          { text: 'には' },
          { text: '先生', reading: 'せんせい', wordId: 'sensei' },
          { text: 'と' },
          { text: '学生', reading: 'がくせい', wordId: 'gakusei' },
          { text: '三人', reading: 'さんにん' },
          { text: 'がいました。' },
        ],
        [
          { text: '朝', reading: 'あさ' },
          { text: 'に' },
          { text: 'なると' },
          { text: '、本は' },
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
      chapter: '第2章',
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
    {
      id: 'segment-3',
      chapter: '第3章',
      paragraphs: [
        [
          { text: '学生は' },
          { text: '窓', reading: 'まど', wordId: 'mado' },
          { text: 'の近くへ行きました。' },
          { text: '窓', reading: 'まど', wordId: 'mado' },
          { text: 'は少し' },
          { text: '開いて', reading: 'あいて', wordId: 'akeru' },
          { text: 'いました。' },
        ],
        [
          { text: 'その下に、小さな' },
          { text: '鍵', reading: 'かぎ', wordId: 'kagi' },
          { text: 'が落ちていました。' },
          { text: '先生', reading: 'せんせい', wordId: 'sensei' },
          { text: 'はその' },
          { text: '鍵', reading: 'かぎ', wordId: 'kagi' },
          { text: 'を見ると、何も言いませんでした。' },
        ],
        [
          { text: '学生は、だれかが' },
          { text: '手紙', reading: 'てがみ', wordId: 'tegami' },
          { text: 'を' },
          { text: '持っていった', wordId: 'motteiku' },
          { text: 'ことに' },
          { text: '気づきました', wordId: 'kizuku' },
          { text: '。' },
        ],
      ],
    },
    {
      id: 'segment-4',
      chapter: '第4章',
      paragraphs: [
        [
          { text: '最後に、学生は' },
          { text: '真実', reading: 'しんじつ', wordId: 'shinjitsu' },
          { text: 'に近づきました。' },
          { text: '先生', reading: 'せんせい', wordId: 'sensei' },
          { text: 'は' },
          { text: '古い', reading: 'ふるい', wordId: 'furui' },
          { text: '約束', reading: 'やくそく', wordId: 'yakusoku' },
          { text: 'を' },
          { text: '隠して', reading: 'かくして', wordId: 'kakusu' },
          { text: 'いたのです。' },
        ],
        [
          { text: 'その' },
          { text: '手紙', reading: 'てがみ', wordId: 'tegami' },
          { text: 'には、昔の友だちとの' },
          { text: '約束', reading: 'やくそく', wordId: 'yakusoku' },
          { text: 'が書いてありました。' },
        ],
        [
          { text: '図書館', reading: 'としょかん', wordId: 'toshokan' },
          { text: 'の' },
          { text: '夜', reading: 'よる', wordId: 'yoru' },
          { text: 'はまた' },
          { text: '静か', reading: 'しずか', wordId: 'shizuka' },
          { text: 'になりました。' },
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
  'segment-2': {
    id: 'check-2',
    kind: 'comprehension',
    prompt: 'この話で、まだ分かっていないことは何ですか。',
    options: ['本はどこにあったか', '本は何冊あったか', 'だれが手紙を持っていったか', '図書館はいつ開いたか'],
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
    options: ['先週', '来週', '昨日', '毎週'],
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
    options: ['かばんを買いました。', 'かばんが見つかりました。', 'かばんは重かったです。', 'かばんを開けました。'],
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
    context: '夜の図書館は静かでした。',
    prompt: '「夜」の意味は？',
    options: ['朝の時間', '昼の時間', '夜の時間', '春の季節'],
    correctIndex: 2,
  },
  {
    id: 'exam-2',
    kind: 'vocab-context',
    context: '図書館はとても静かでした。',
    prompt: '「静か」の意味は？',
    options: ['音が少ない様子', 'とても古い様子', 'すぐ近い様子', '明るい様子'],
    correctIndex: 0,
  },
  {
    id: 'exam-3',
    kind: 'vocab-context',
    context: '窓の近くへ行きました。',
    prompt: '「窓」の意味は？',
    options: ['本を置く台', '外を見るところ', '手紙を書くもの', '鍵を入れる箱'],
    correctIndex: 1,
  },
  {
    id: 'exam-4',
    kind: 'vocab-context',
    context: '学生は真実に近づきました。',
    prompt: '「真実」の意味は？',
    options: ['本当のこと', '小さい鍵', '古い本', '静かな場所'],
    correctIndex: 0,
  },
  {
    id: 'exam-5',
    kind: 'vocab-context',
    context: '昔の友だちとの約束が書いてありました。',
    prompt: '「約束」の意味は？',
    options: ['相手と決めて守ること', '見えないようにすること', '探して確かめること', '本を借りること'],
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
    title: '既習語 1',
    state: 'complete',
    dots: Array.from({ length: 12 }, (_, i) => ({ id: `unit-1-${i}`, status: 'known' as const })),
  },
  {
    id: 'unit-2',
    title: '既習語 2',
    state: 'complete',
    dots: Array.from({ length: 12 }, (_, i) => ({ id: `unit-2-${i}`, status: 'known' as const })),
  },
  {
    id: 'unit-3',
    title: '既習語 3',
    state: 'complete',
    dots: Array.from({ length: 12 }, (_, i) => ({ id: `unit-3-${i}`, status: 'known' as const })),
  },
];

export const progressHistory = [412, 430, 447, 461, 474, 487, 500, 518];
export const recentWords = ['真実', '約束', '鍵', '調べる', '隠す', '気づく', '窓', '学生'];
