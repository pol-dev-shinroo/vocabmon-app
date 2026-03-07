"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { vocabData, VocabWord } from "@/data/vocab";

import QuestScreen from "@/components/shared/QuestScreen";
import CountdownPhase from "@/components/feed/CountdownPhase";
import DragDropTest from "@/components/test/DragDropTest";
import MasteryTest from "@/components/test/MasteryTest";

export default function TestPage() {
  const [phase, setPhase] = useState<
    | "intro"
    | "countdown"
    | "dragdrop"
    | "encouragement"
    | "trans_mastery"
    | "mastery_countdown"
    | "mastery"
    | "complete"
  >("intro");

  const [sessionWords, setSessionWords] = useState<VocabWord[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const hasAwardedExp = useRef(false);

  useEffect(() => {
    const initTimer = setTimeout(() => {
      const currentSet = parseInt(
        localStorage.getItem("current_word_set") || "0",
        10,
      );
      // FIX: Removed the "10 +" offset! Set 0 now starts exactly at index 0.
      const startIndex = currentSet * 5;
      setSessionWords(vocabData.slice(startIndex, startIndex + 5));
      setIsLoaded(true);
    }, 0);

    return () => clearTimeout(initTimer);
  }, []);

  useEffect(() => {
    if (phase === "complete" && !hasAwardedExp.current) {
      hasAwardedExp.current = true;
      const currentExp = parseInt(
        localStorage.getItem("vocabmon_exp") || "0",
        10,
      );
      localStorage.setItem("vocabmon_exp", (currentExp + 50).toString());
      localStorage.setItem("quest_test_done", "true");
      localStorage.setItem("trigger_fireworks", "true");
    }
  }, [phase]);

  if (!isLoaded)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center"></div>
    );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      {phase === "intro" && (
        <QuestScreen
          type="intro"
          theme="indigo"
          icon="📝"
          title="The Final Test"
          description="Prove your mastery of today's words to unlock the final EXP bonus."
          buttonText="Start Final Exam"
          onNext={() => setPhase("countdown")}
          showCancel={true}
        />
      )}

      {phase === "countdown" && (
        <CountdownPhase onFinish={() => setPhase("dragdrop")} />
      )}
      {phase === "dragdrop" && (
        <DragDropTest
          words={sessionWords}
          onFinish={() => setPhase("encouragement")}
        />
      )}

      {phase === "encouragement" && (
        <QuestScreen
          type="encouragement"
          theme="indigo"
          icon="🔥"
          title="Great Job!"
          description="You crushed the Drag & Drop! Brace yourself for the Final Boss..."
          buttonText="Face the Final Test"
          onNext={() => setPhase("trans_mastery")}
          audio="victory"
        />
      )}

      {phase === "trans_mastery" && (
        <QuestScreen
          type="transition"
          theme="blue"
          icon="⚔️"
          title="Next Quest Ready"
          subtitle="The Final Boss"
          description="Complete the meaning, then spell the word from memory!"
          buttonText="Start Test!"
          onNext={() => setPhase("mastery_countdown")}
          audio="sword"
        />
      )}

      {phase === "mastery_countdown" && (
        <CountdownPhase onFinish={() => setPhase("mastery")} />
      )}
      {phase === "mastery" && (
        <MasteryTest
          words={sessionWords}
          onFinish={() => setPhase("complete")}
        />
      )}

      {phase === "complete" && (
        <div className="text-center animate-fade-in bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
          <div className="text-6xl mb-6">🏆</div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            Flawless Victory!
          </h2>
          <p className="text-gray-500 mb-8 font-medium">
            You dominated the final test and earned +50 EXP!
          </p>
          <Link
            href="/"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all shadow-md inline-block"
          >
            Return to Dashboard
          </Link>
        </div>
      )}
    </main>
  );
}
