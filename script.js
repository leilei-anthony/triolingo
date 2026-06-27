const genres = ["Mystery", "Sci-Fi", "Romance", "Travel"];
const storyTemplates = {
  Mystery: {
    title: "雨の駅",
    body: [
      "雨の夜、ミナは古い駅のホームに立っていた。窓の外を流れる水滴は、まるで小さな星のように光っていた。彼女は傘を閉じ、濡れた石畳の上をゆっくりと歩いた。駅の時計はまだ少し遅れていて、誰もいないはずのプラットホームに、ひどく静かな気配が漂っていた。",
      "彼女は昔、この町に戻ることを決めていた。だが、線路の向こうに見える赤い灯りが、胸の奥をざわつかせた。遠くで汽笛が鳴り、思い出の匂いが風に混ざってくる。彼女はその音を聞きながら、もう一度だけ自分の名前を口にした。"
    ],
    words: [
      { word: "ホーム", reading: "ほーむ", definition: "The platform where passengers get on and off a train." },
      { word: "水滴", reading: "すいてき", definition: "A tiny drop of water." },
      { word: "線路", reading: "せんろ", definition: "The tracks on which a train runs." },
      { word: "灯り", reading: "ともしび", definition: "Light or illumination." },
      { word: "胸", reading: "むね", definition: "The chest; the part of the body containing the heart." }
    ]
  },
  "Sci-Fi": {
    title: "空に浮かぶ信号",
    body: [
      "ジュールは屋上の庭で、青い光の信号を見上げていた。空の向こうからやって来るその光は、まるで静かなメッセージのようだった。彼は手にした小さな端末を見つめ、まばたき一つで夜の空を測っていた。遠い雲の間を抜けてくる光は、まるで誰かが彼を呼んでいるように見えた。",
      "下の街では、窓の向こうに小さな星が並び、未来の音がゆっくりと響いていた。彼はその音に耳を澄ませ、古い街の影をなぞるように歩き出した。新しい朝が来る前に、まだ見ぬものがひそかに現れ始めていた。"
    ],
    words: [
      { word: "信号", reading: "しんごう", definition: "A signal used to communicate something." },
      { word: "屋上", reading: "おくじょう", definition: "The flat roof of a building." },
      { word: "星", reading: "ほし", definition: "A bright object seen in the night sky." },
      { word: "未来", reading: "みらい", definition: "The time that is yet to come." },
      { word: "光", reading: "ひかり", definition: "Visible brightness or illumination." }
    ]
  },
  Romance: {
    title: "窓辺の手紙",
    body: [
      "電車がゆっくりと止まると、レオは窓辺に置かれた手紙を見つけた。紙の匂いには、雨と木の香りが残っていた。外の景色はすべて曇っていて、けれどその中で彼の指先だけが手紙の端を静かになぞっていた。彼は少しだけ息をのんで、誰からのものかを考えた。",
      "彼は一行目を何度も読み返した。そこに書かれた言葉は、朝が来る前に人生を少しだけ変えてしまいそうだった。最後の一文を読んだとき、彼は窓の向こうの街に目を向けた。今日の天気よりも、今日の気持ちのほうがずっと変わりやすかった。"
    ],
    words: [
      { word: "窓辺", reading: "まどべ", definition: "The space beside a window." },
      { word: "手紙", reading: "てがみ", definition: "A letter written on paper and sent to someone." },
      { word: "匂い", reading: "におい", definition: "A smell or odor." },
      { word: "香り", reading: "かおり", definition: "A pleasant fragrance." },
      { word: "言葉", reading: "ことば", definition: "Words used in speech or writing." }
    ]
  },
  Travel: {
    title: "朝の市場",
    body: [
      "朝の市場では、スパイスの香りとパンの匂いが空気に混じっていた。小さな店の前には、色とりどりの果物が並び、歩くたびに新しい道を見つけられた。人々の笑い声は朝の光に反射し、空にはまだ薄い雲が残っていた。彼女はゆっくりと歩きながら、どの屋台にも少しずつ名前をつけていった。",
      "彼女は川のほとりにある小さな橋を渡り、ゆっくりと流れる舟を見つめた。光の中で、世界はまるで絵のように見えた。橋の下を流れる水は、昨日のことを忘れたように静かに進んでいた。彼女はその流れを見つめながら、また少しだけ遠くへ行きたいと思った。"
    ],
    words: [
      { word: "市場", reading: "いちば", definition: "A place where people buy and sell goods." },
      { word: "香り", reading: "かおり", definition: "A pleasant scent or fragrance." },
      { word: "果物", reading: "くだもの", definition: "Fruit; food that grows on trees or plants." },
      { word: "橋", reading: "はし", definition: "A structure that allows people to cross over a river or valley." },
      { word: "舟", reading: "ふね", definition: "A small boat that moves on water." }
    ]
  }
};

const quizQuestions = [
  { prompt: "Which word means 'the platform where passengers get on and off a train' ?", answer: "ホーム", distractors: ["橋", "舟", "星"] },
  { prompt: "Which word means 'a tiny drop of water' ?", answer: "水滴", distractors: ["光", "果物", "言葉"] },
  { prompt: "Which word means 'a signal used to communicate something' ?", answer: "信号", distractors: ["香り", "市場", "橋"] },
  { prompt: "Which word means 'a place where people buy and sell goods' ?", answer: "市場", distractors: ["舟", "手紙", "未来"] }
];

const STORAGE_KEY = "triolingo-state";

const defaultState = {
  level: "Placement pending",
  wordsLearned: 0,
  streak: 3,
  genre: "Mystery",
  storyCompleted: false
};

function loadState() {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultState;
    return { ...defaultState, ...JSON.parse(saved) };
  } catch (error) {
    return defaultState;
  }
}

function saveState() {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const state = loadState();
const page = document.body.dataset.page || "home";

// Diagnostic paragraphs keyed by JLPT level — these are short, anchored to level.
const diagnosticParagraphs = {
  N5: "今日はいい天気です。公園で小さな犬が遊んでいます。子どもたちが笑って、花が咲いています。鳥が飛び、ベンチに座る人が本を読んでいます。道で見かけた自転車や帽子、靴も話題になりました。",
  N4: "駅の前で古い友達に会った。カフェに入って、お互いの近況を話した。時間はゆっくりと過ぎて行った。荷物、傘、窓、切符、改札、通学路などを話題にした。帰り道には夜風と自動販売機の光があった。",
  N3: "街の図書館で、一冊の古い本を見つけた。ページをめくるたびに、知らない言葉が静かに顔を出した。彼は意味を推測しながら読み進めた。書架や索引、作者の名前、章の見出し、引用句が目を引いた。",
  N2: "彼は忙しい朝に少し立ち止まり、窓の外の風景を見つめた。社会の変化と自分の位置について考えを巡らせ、その瞬間に小さな決意を固めた。報告書、統計、政策、議論といった語が頭に浮かんだ。"
};

// Tracks words the user marked as unknown during the diagnostic
state.diagnosticUnknowns = state.diagnosticUnknowns || [];

function hideTooltip() {
  const tooltip = document.getElementById("tooltip");
  if (tooltip) {
    tooltip.classList.add("hidden");
  }
}

document.addEventListener("click", () => {
  hideTooltip();
});

function renderGenres() {
  const row = document.getElementById("genre-row");
  if (!row) return;

  row.innerHTML = genres
    .map(
      (genre) => `
        <button class="genre-chip ${genre === state.genre ? "active" : ""}" data-genre="${genre}">
          ${genre}
        </button>
      `
    )
    .join("");

  row.querySelectorAll(".genre-chip").forEach((button) => {
    button.addEventListener("click", () => {
      state.genre = button.dataset.genre;
      renderGenres();
      renderStory();
    });
  });
}

function renderStory() {
  const container = document.getElementById("story-content");
  if (!container) return;

  const story = storyTemplates[state.genre];
  state.storyCompleted = true;
  saveState();
  const bodyHtml = story.body
    .map((paragraph) => {
      const words = story.words.map((item) => item.word);
      let paragraphText = paragraph;
      words.forEach((word) => {
        const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        paragraphText = paragraphText.replace(new RegExp(escapedWord, "g"), `<button class="word-chip" data-word="${word}">${word}</button>`);
      });
      return `<p>${paragraphText}</p>`;
    })
    .join("");

  container.innerHTML = `
    <h3>${story.title}</h3>
    ${bodyHtml}
  `;

  const quizLink = document.getElementById("quiz-link");
  if (quizLink) {
    quizLink.innerHTML = '<a href="quiz.html" class="secondary">Take the comprehension quiz</a>';
    quizLink.classList.remove("hidden");
  }

  container.querySelectorAll(".word-chip").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      showTooltip(event.currentTarget);
    });
  });
}

function renderDiagnostic(level) {
  const container = document.getElementById("diagnostic");
  if (!container) return;
  const text = diagnosticParagraphs[level] || diagnosticParagraphs.N5;
  // Heuristic tokenizer: split contiguous Japanese runs into smaller selectable tokens
  function isJapaneseChar(ch) {
    return /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(ch);
  }

  function tokenize(text) {
    const tokens = [];
    let buf = "";
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (isJapaneseChar(ch)) {
        buf += ch;
        // when buffer reaches 2 chars, push as a token to avoid long grouped spans
        if (buf.length >= 2) {
          tokens.push(buf);
          buf = "";
        }
      } else {
        // flush buffer
        if (buf.length) {
          tokens.push(buf);
          buf = "";
        }
        tokens.push(ch);
      }
    }
    if (buf.length) tokens.push(buf);
    return tokens;
  }

  const parts = tokenize(text);
  const paragraphHtml = parts
    .map((part) => {
      if (/^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]{1,2}$/u.test(part)) {
        const safe = part.replace(/"/g, "&quot;");
        return `<button class="word-chip diagnostic-word" data-word="${safe}">${part}</button>`;
      }
      // keep punctuation and spaces as-is
      return part;
    })
    .join("");
  container.innerHTML = `<p>${paragraphHtml}</p>`;
  state.diagnosticUnknowns = [];
  // remember which level this diagnostic represents
  state.currentDiagnosticLevel = level;

  container.querySelectorAll(".diagnostic-word").forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      const word = btn.dataset.word;
      btn.classList.toggle("word-unknown");
      const idx = state.diagnosticUnknowns.indexOf(word);
      if (idx === -1) state.diagnosticUnknowns.push(word);
      else state.diagnosticUnknowns.splice(idx, 1);
    });
  });
}

function showTooltip(button) {
  const word = button.dataset.word;
  const item = storyTemplates[state.genre].words.find((entry) => entry.word === word);
  const tooltip = document.getElementById("tooltip");
  if (!tooltip || !item) return;

  tooltip.innerHTML = `<strong>${item.word}</strong><span>${item.reading ? `(${item.reading})` : ""}</span><span>${item.definition}</span>`;
  tooltip.classList.remove("hidden");

  const rect = button.getBoundingClientRect();
  const container = document.getElementById("story-card");
  const containerRect = container
    ? container.getBoundingClientRect()
    : { left: 0, top: 0 };

  const left = Math.min(Math.max(rect.left - containerRect.left - 110, 12), container ? container.clientWidth - 260 : 220);
  const top = Math.max(rect.top - containerRect.top - 92, 12);

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
}

function renderQuiz() {
  const wrapper = document.getElementById("quiz-questions");
  const notice = document.getElementById("quiz-notice");
  if (!wrapper) return;

  if (!state.storyCompleted) {
    wrapper.innerHTML = "";
    if (notice) {
      notice.classList.remove("hidden");
      notice.innerHTML = 'Complete a story first to unlock the comprehension quiz. <a href="story.html">Go to story</a>';
    }
    return;
  }

  if (notice) notice.classList.add("hidden");

  wrapper.innerHTML = quizQuestions
    .map((question, index) => {
      const options = [question.answer, ...question.distractors].sort(() => 0.5 - Math.random());
      return `
        <div class="question">
          <label>${index + 1}. ${question.prompt}</label>
          ${options
            .map(
              (option) => `
                <label class="quiz-option">
                  <input type="radio" name="q${index}" value="${option}" />
                  <span>${option}</span>
                </label>
              `
            )
            .join("")}
        </div>
      `;
    })
    .join("");
}

function updateDashboard() {
  const levelBadge = document.getElementById("level-badge");
  const statLevel = document.getElementById("stat-level");
  const statVocab = document.getElementById("stat-vocab");
  const statStreak = document.getElementById("stat-streak");
  const progressText = document.getElementById("progress-text");
  const progressFill = document.getElementById("progress-fill");
  const milestoneCopy = document.getElementById("milestone-copy");

  if (levelBadge) levelBadge.textContent = state.level;
  if (statLevel) statLevel.textContent = state.level;
  if (statVocab) statVocab.textContent = state.wordsLearned;
  if (statStreak) statStreak.textContent = `${state.streak} days`;
  if (progressText) progressText.textContent = `${state.wordsLearned} / 20 new words`;
  if (progressFill) progressFill.style.width = `${Math.min(100, (state.wordsLearned / 20) * 100)}%`;

  if (milestoneCopy) {
    milestoneCopy.textContent = state.wordsLearned >= 20
      ? "Milestone unlocked. Your mastery story is ready."
      : `Collect ${20 - state.wordsLearned} more words to unlock a full mastery story.`;
  }
}

function handlePlacement(event) {
  event.preventDefault();
  const selected = state.currentDiagnosticLevel || (state.level && state.level.startsWith("JLPT ") ? state.level.split(" ")[1] : "N5");
  const unknowns = state.diagnosticUnknowns ? state.diagnosticUnknowns.length : 0;
  const total = (diagnosticParagraphs[selected] || diagnosticParagraphs.N5).match(/[\p{L}\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]+/gu)?.length || 1;
  const comprehension = 1 - unknowns / total; // 0..1

  // Simple placement rule: if comprehension high, keep or promote; if low, demote
  const levels = ["N5", "N4", "N3", "N2"];
  let idx = levels.indexOf(selected || "N5");
  if (idx === -1) idx = 0;
  if (comprehension >= 0.8 && idx < levels.length - 1) idx += 1;
  else if (comprehension < 0.5 && idx > 0) idx -= 1;
  state.level = `JLPT ${levels[idx]}`;

  const result = document.getElementById("placement-result");
  if (!result) return;

  result.classList.remove("hidden");
  result.classList.remove("error");
  result.innerHTML = `You are placed at <strong>${state.level}</strong>. You marked ${unknowns} unfamiliar ${unknowns === 1 ? 'word' : 'words'} in the diagnostic paragraph. The story engine will tailor future reading to this level.`;
  saveState();
  updateDashboard();
}

function handleQuiz(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  let correct = 0;

  quizQuestions.forEach((question, index) => {
    const answer = formData.get(`q${index}`);
    if (answer === question.answer) correct += 1;
  });

  const result = document.getElementById("quiz-result");
  if (!result) return;

  result.classList.remove("hidden");
  if (correct >= 3) {
    state.wordsLearned += 5;
    state.streak += 1;
    result.classList.remove("error");
    result.innerHTML = `Nice work! You scored ${correct}/4 and earned 5 new words.`;
  } else {
    result.classList.add("error");
    result.innerHTML = `You scored ${correct}/4. Try another story and keep going.`;
  }
  saveState();
  updateDashboard();
}

function setupPage() {
  if (page === "placement") {
    const placementForm = document.getElementById("placement-form");
    placementForm?.addEventListener("submit", handlePlacement);
    // auto-render diagnostic using current state level or default to N5
    let defaultLevel = "N5";
    if (state.level && state.level.startsWith("JLPT ")) {
      defaultLevel = state.level.split(" ")[1] || "N5";
    }
    renderDiagnostic(defaultLevel);
  }

  if (page === "story") {
    renderGenres();
    renderStory();
    const generateButton = document.getElementById("generate-story");
    generateButton?.addEventListener("click", () => {
      renderStory();
      document.getElementById("story-content")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  if (page === "quiz") {
    renderQuiz();
    const quizForm = document.getElementById("quiz-form");
    quizForm?.addEventListener("submit", handleQuiz);
  }

  if (page === "dashboard") {
    updateDashboard();
  }

  updateDashboard();
}

setupPage();
