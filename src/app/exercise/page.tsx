"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { vocabData, VocabWord } from "@/data/vocab";
import { triggerSilentSync } from "@/lib/syncHelper";
import { getStudentProgress } from "@/actions/loadProgress";

import QuestScreen from "@/components/shared/QuestScreen";
import CountdownPhase from "@/components/feed/CountdownPhase";
import MeaningPractice from "@/components/exercise/MeaningPractice";
import MeaningPuzzle from "@/components/exercise/MeaningPuzzle";
import MeaningFlip from "@/components/exercise/MeaningFlip";
import MeaningMatch from "@/components/exercise/MeaningMatch";

export default function ExercisePage() {
  const router = useRouter();
  const [phase, setPhase] = useState<
    | "intro"
    | "countdown"
    | "practice"
    | "trans_puzzle"
    | "puzzle_countdown"
    | "puzzle"
    | "trans_flip"
    | "flip_countdown"
    | "flip"
    | "trans_match"
    | "match_countdown"
    | "match"
    | "complete"
  >("intro");

  const [sessionWords, setSessionWords] = useState<VocabWord[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const hasAwardedExp = useRef(false);

  useEffect(() => {
    async function fetchVocab() {
      const progress = await getStudentProgress();
      const currentSet = progress?.currentSet || 0;

      const startIndex = currentSet * 5;
      setSessionWords(vocabData.slice(startIndex, startIndex + 5));
      setIsLoaded(true);
    }
    fetchVocab();
  }, []);

  useEffect(() => {
    if (phase === "complete" && !hasAwardedExp.current) {
      hasAwardedExp.current = true;
      const currentExp = parseInt(
        localStorage.getItem("vocabmon_exp") || "0",
        10,
      );
      localStorage.setItem("vocabmon_exp", (currentExp + 50).toString());
      localStorage.setItem("quest_exercise_done", "true");
      localStorage.setItem("trigger_fireworks", "true");

      // Handle the completedQuests array
      const storedQuests = localStorage.getItem("completedQuests");
      const completedQuests: string[] = storedQuests ? JSON.parse(storedQuests) : [];
      if (!completedQuests.includes("exercise")) {
        completedQuests.push("exercise");
      }
      localStorage.setItem("completedQuests", JSON.stringify(completedQuests));

      // 🚀 NEW: Silently back up to MongoDB!
      triggerSilentSync();

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [phase, router]);

  if (!isLoaded)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center"></div>
    );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      {phase === "intro" && (
        <QuestScreen
          type="intro"
          theme="emerald"
          icon="📖"
          title="Exercise Time!"
          description="Master the meanings to evolve Vocabmon. Let's go!"
          buttonText="Start Training"
          onNext={() => setPhase("countdown")}
          showCancel={true}
        />
      )}

      {phase === "countdown" && (
        <CountdownPhase onFinish={() => setPhase("practice")} />
      )}
      {phase === "practice" && (
        <MeaningPractice
          words={sessionWords}
          onFinish={() => setPhase("trans_puzzle")}
        />
      )}

      {phase === "trans_puzzle" && (
        <QuestScreen
          type="transition"
          theme="emerald"
          icon="⚔️"
          title="Next Quest Ready"
          subtitle="Meaning Puzzle"
          description="Recall the exact words."
          buttonText="Start Test!"
          onNext={() => setPhase("puzzle_countdown")}
          audio="sword"
        />
      )}
      {phase === "puzzle_countdown" && (
        <CountdownPhase onFinish={() => setPhase("puzzle")} />
      )}
      {phase === "puzzle" && (
        <MeaningPuzzle
          words={sessionWords}
          onFinish={() => setPhase("trans_flip")}
        />
      )}

      {phase === "trans_flip" && (
        <QuestScreen
          type="transition"
          theme="emerald"
          icon="⚔️"
          title="Next Quest Ready"
          subtitle="Tile Flip Memory"
          description="Find the hidden tiles."
          buttonText="Start Test!"
          onNext={() => setPhase("flip_countdown")}
          audio="sword"
        />
      )}
      {phase === "flip_countdown" && (
        <CountdownPhase onFinish={() => setPhase("flip")} />
      )}
      {phase === "flip" && (
        <MeaningFlip
          words={sessionWords}
          onFinish={() => setPhase("trans_match")}
        />
      )}

      {phase === "trans_match" && (
        <QuestScreen
          type="transition"
          theme="emerald"
          icon="⚔️"
          title="Next Quest Ready"
          subtitle="Meaning Match"
          description="Draw the lines! Match the word to the exact meaning."
          buttonText="Start Test!"
          onNext={() => setPhase("match_countdown")}
          audio="sword"
        />
      )}
      {phase === "match_countdown" && (
        <CountdownPhase onFinish={() => setPhase("match")} />
      )}
      {phase === "match" && (
        <MeaningMatch
          words={sessionWords}
          onFinish={() => setPhase("complete")}
        />
      )}

      {phase === "complete" && (
        <div className="text-center animate-fade-in bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
          <div className="text-6xl mb-6">🎓</div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            Quest Mastered!
          </h2>
          <p className="text-gray-500 mb-8 font-medium">
            You crushed all tests and earned +50 EXP!
          </p>
          <Link
            href="/"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all shadow-md inline-block"
          >
            Return to Dashboard
          </Link>
        </div>
      )}
    </main>
  );
}
