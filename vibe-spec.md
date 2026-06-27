# Vibe Spec: AI Language Learning MVP

## 1. Product Vision

A reading-first language learning app that helps beginners stay motivated by turning vocabulary practice into an immersive, personalized experience. Instead of forcing users through dry drills, the product generates short stories that feel relevant, engaging, and just challenging enough to keep them moving forward.

The core promise is simple: learners read stories tailored to their current level, discover a small number of new words in context, and build confidence through immediate comprehension checks.

## 2. Problem Statement

Many language learners drop off because the jump from beginner materials to real-world content is too large. They either get overwhelmed by unfamiliar vocabulary or lose momentum when every word requires a manual lookup. This app closes that gap by generating content that is highly comprehensible, personalized, and emotionally engaging.

## 3. Core Goal

Help learners sustain motivation through comprehensible input while making vocabulary acquisition feel effortless, contextual, and rewarding.

## 4. MVP Experience

### 4.1 Onboarding Placement Exam
Users begin with a short diagnostic experience that estimates their proficiency and maps them to an approximate JLPT level. This establishes the baseline vocabulary range used to generate content.

### 4.2 Story Generation Loop
Before each story is generated, the user selects a genre or topic to improve engagement. The system then creates a short story designed to be approximately 95% understandable based on the learner’s current vocabulary profile.

### 4.3 Vocabulary Constraint
To avoid cognitive overload, each story introduces a maximum of 5 new target words. This keeps the experience lightweight and makes the freemium model more sustainable.

### 4.4 In-Story Support
The interface includes lightweight tooltips for the 5 target words so learners can understand meaning instantly without leaving the reading flow.

### 4.5 Post-Story Quiz
Immediately after reading, the user completes a short quiz that tests retention and contextual understanding of the new target words.

### 4.6 Milestone Mastery Exam
Once a learner has acquired 20 new words, the system generates a fresh story that uses all 20 words together and follows it with a more comprehensive exam to verify longer-term retention.

### 4.7 Progress Dashboard
The user sees a simple visualization of:
- current JLPT sub-level
- total vocabulary count
- reading streak

## 5. Key Product Principles

- Keep the experience low-friction and highly readable.
- Prioritize comprehension over grammar drills.
- Make vocabulary learning feel like a natural part of reading.
- Use personalization to reduce frustration and increase engagement.
- Keep the loop short: read, understand, quiz, repeat.

## 6. Feature Scope for Version 1

### Must-Have Features
- placement exam
- genre/topic selection
- story generation based on proficiency
- 5-word vocabulary ceiling per story
- inline word tooltips
- immediate post-story quiz
- milestone mastery exam at 20 words
- progress dashboard

### Non-Goals for Version 1
- spaced-repetition flashcards
- grammar lessons
- audio or text-to-speech

## 7. User Stories

- As a beginner learner, I want a story tailored to my level so I can read without feeling overwhelmed.
- As a learner, I want only a few new words per story so I can focus and build confidence.
- As a user, I want instant word support so I do not break immersion with manual dictionary lookups.
- As a learner, I want a quick quiz after each story so I can confirm what I understood.
- As a motivated user, I want visible progress so I can see my growth over time.

## 8. Technical Direction

### Data Model
The backend should support rich state tracking across user learning progress. At minimum, the system should model:
- User
- VocabularyProfile
- StoryHistory

The vocabulary profile should track:
- known words
- currently learning words
- mastered words

### LLM Integration
The generation system should use structured prompts and prompt chaining to ensure the language model stays within the learner’s current vocabulary boundaries.

The output should be returned as a strict JSON object containing:
- story text
- target word list with definitions
- generated quiz questions

### Frontend Experience
The reading experience should feel smooth and lightweight. Tooltips should appear without disrupting the flow of reading, and the quiz should feel immediate and rewarding.

## 9. Success Criteria

The MVP is successful if:
- users complete multiple story sessions in a row
- learners retain the target vocabulary from the immediate quiz
- users report that reading feels more approachable than traditional study methods
- engagement remains high enough to support repeated daily use

## 10. Product Tone and Feel

The product should feel:
- calm and encouraging
- intelligent but not overly academic
- immersive and lightweight
- motivating without becoming gamified

## 11. Open Questions

- What exact JLPT mapping logic should be used for placement?
- How should vocabulary mastery be calculated over time?
- What level of story length is ideal for the first MVP?
- Should the quiz be multiple choice, fill-in-the-blank, or mixed?
