import type { Genre, JLPTLevel, QuizQuestion, StoryTemplate } from '../types';

export const genres: Genre[] = ['Mystery', 'Sci-Fi', 'Romance', 'Travel'];

export const storyTemplates: Record<Genre, StoryTemplate> = {
  Mystery: {
    title: '雨の駅',
    body: [
      '雨の夜、ミナは古い駅のホームに立っていた。窓の外を流れる水滴は、まるで小さな星のように光っていた。彼女は傘を閉じ、濡れた石畳の上をゆっくりと歩いた。駅の時計はまだ少し遅れていて、誰もいないはずのプラットホームに、ひどく静かな気配が漂っていた。',
      '彼女は昔、この町に戻ることを決めていた。だが、線路の向こうに見える赤い灯りが、胸の奥をざわつかせた。遠くで汽笛が鳴り、思い出の匂いが風に混ざってくる。彼女はその音を聞きながら、もう一度だけ自分の名前を口にした。',
    ],
    words: [
      { word: 'ホーム', reading: 'ほーむ', definition: 'The platform where passengers get on and off a train.' },
      { word: '水滴', reading: 'すいてき', definition: 'A tiny drop of water.' },
      { word: '線路', reading: 'せんろ', definition: 'The tracks on which a train runs.' },
      { word: '灯り', reading: 'ともしび', definition: 'Light or illumination.' },
      { word: '胸', reading: 'むね', definition: 'The chest; the part of the body containing the heart.' },
    ],
  },
  'Sci-Fi': {
    title: '空に浮かぶ信号',
    body: [
      'ジュールは屋上の庭で、青い光の信号を見上げていた。空の向こうからやって来るその光は、まるで静かなメッセージのようだった。彼は手にした小さな端末を見つめ、まばたき一つで夜の空を測っていた。遠い雲の間を抜けてくる光は、まるで誰かが彼を呼んでいるように見えた。',
      '下の街では、窓の向こうに小さな星が並び、未来の音がゆっくりと響いていた。彼はその音に耳を澄ませ、古い街の影をなぞるように歩き出した。新しい朝が来る前に、まだ見ぬものがひそかに現れ始めていた。',
    ],
    words: [
      { word: '信号', reading: 'しんごう', definition: 'A signal used to communicate something.' },
      { word: '屋上', reading: 'おくじょう', definition: 'The flat roof of a building.' },
      { word: '星', reading: 'ほし', definition: 'A bright object seen in the night sky.' },
      { word: '未来', reading: 'みらい', definition: 'The time that is yet to come.' },
      { word: '光', reading: 'ひかり', definition: 'Visible brightness or illumination.' },
    ],
  },
  Romance: {
    title: '窓辺の手紙',
    body: [
      '電車がゆっくりと止まると、レオは窓辺に置かれた手紙を見つけた。紙の匂いには、雨と木の香りが残っていた。外の景色はすべて曇っていて、けれどその中で彼の指先だけが手紙の端を静かになぞっていた。彼は少しだけ息をのんで、誰からのものかを考えた。',
      '彼は一行目を何度も読み返した。そこに書かれた言葉は、朝が来る前に人生を少しだけ変えてしまいそうだった。最後の一文を読んだとき、彼は窓の向こうの街に目を向けた。今日の天気よりも、今日の気持ちのほうがずっと変わりやすかった。',
    ],
    words: [
      { word: '窓辺', reading: 'まどべ', definition: 'The space beside a window.' },
      { word: '手紙', reading: 'てがみ', definition: 'A letter written on paper and sent to someone.' },
      { word: '匂い', reading: 'におい', definition: 'A smell or odor.' },
      { word: '香り', reading: 'かおり', definition: 'A pleasant fragrance.' },
      { word: '言葉', reading: 'ことば', definition: 'Words used in speech or writing.' },
    ],
  },
  Travel: {
    title: '朝の市場',
    body: [
      '朝の市場では、スパイスの香りとパンの匂いが空気に混じっていた。小さな店の前には、色とりどりの果物が並び、歩くたびに新しい道を見つけられた。人々の笑い声は朝の光に反射し、空にはまだ薄い雲が残っていた。彼女はゆっくりと歩きながら、どの屋台にも少しずつ名前をつけていった。',
      '彼女は川のほとりにある小さな橋を渡り、ゆっくりと流れる舟を見つめた。光の中で、世界はまるで絵のように見えた。橋の下を流れる水は、昨日のことを忘れたように静かに進んでいた。彼女はその流れを見つめながら、また少しだけ遠くへ行きたいと思った。',
    ],
    words: [
      { word: '市場', reading: 'いちば', definition: 'A place where people buy and sell goods.' },
      { word: '香り', reading: 'かおり', definition: 'A pleasant scent or fragrance.' },
      { word: '果物', reading: 'くだもの', definition: 'Fruit; food that grows on trees or plants.' },
      { word: '橋', reading: 'はし', definition: 'A structure that allows people to cross over a river or valley.' },
      { word: '舟', reading: 'ふね', definition: 'A small boat that moves on water.' },
    ],
  },
};

export const quizQuestions: QuizQuestion[] = [
  { prompt: "Which word means 'the platform where passengers get on and off a train'?", answer: 'ホーム', distractors: ['橋', '舟', '星'] },
  { prompt: "Which word means 'a tiny drop of water'?", answer: '水滴', distractors: ['光', '果物', '言葉'] },
  { prompt: "Which word means 'a signal used to communicate something'?", answer: '信号', distractors: ['香り', '市場', '橋'] },
  { prompt: "Which word means 'a place where people buy and sell goods'?", answer: '市場', distractors: ['舟', '手紙', '未来'] },
];

export const diagnosticParagraphs: Record<JLPTLevel, string> = {
  N5: '今日はいい天気です。公園で小さな犬が遊んでいます。子どもたちが笑って、花が咲いています。鳥が飛び、ベンチに座る人が本を読んでいます。道で見かけた自転車や帽子、靴も話題になりました。',
  N4: '駅の前で古い友達に会った。カフェに入って、お互いの近況を話した。時間はゆっくりと過ぎて行った。荷物、傘、窓、切符、改札、通学路などを話題にした。帰り道には夜風と自動販売機の光があった。',
  N3: '街の図書館で、一冊の古い本を見つけた。ページをめくるたびに、知らない言葉が静かに顔を出した。彼は意味を推測しながら読み進めた。書架や索引、作者の名前、章の見出し、引用句が目を引いた。',
  N2: '彼は忙しい朝に少し立ち止まり、窓の外の風景を見つめた。社会の変化と自分の位置について考えを巡らせ、その瞬間に小さな決意を固めた。報告書、統計、政策、議論といった語が頭に浮かんだ。',
};

export const jlptLevels: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2'];
