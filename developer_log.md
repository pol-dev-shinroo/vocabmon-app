# Vocabmon - Developer Log

## Architecture Overview
- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** MongoDB + Mongoose
- **Auth:** Custom secure cookie sessions (`src/proxy.ts` middleware)

## Core Features
**1. The Vocabmon Engine**
- Custom React SVG components (`DigimonVocabmon.tsx`, `FireVocabmon.tsx`).
- Supports 10 stages of evolution based on EXP thresholds (150 EXP per level).
- Includes CSS-driven idle animations, eating logic, and tier-specific attack/special animations.

**2. Gamified Curriculum (Dashboard)**
- Weekly sets of 50 words broken into daily chunks.
- Quests are chronologically locked (Spelling -> Exercise -> Test).
- Weekend Boss Fights (Midterm and Finals) test cumulative memory.

**3. Interactive Exercises**
- `SpellingPractice & Test`: Web Speech API dictation and typing.
- `MeaningPractice`: Rebuilding definitions from word banks.
- `MeaningMatch`: Interactive SVG line-drawing between words and definitions.
- `SentenceFill & DragDropTest`: Contextual reading comprehension.
- `MeaningPuzzle`: Letter-slot guessing games.

**4. 3D Runner Mini-Game**
- Pseudo-3D CSS runner (`JumpGame.tsx`).
- Endless survival mode using active weekly vocabulary.
- 2-Strike life system with custom Suno AI background tracks.

**5. Progress & Archival**
- `syncHelper.ts` silently pushes `localStorage` state to MongoDB.
- `scripts/rollover.ts` CLI tool archives the current week to the Hall of Fame and resets the board for next week.
