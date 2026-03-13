"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { vocabData, VocabWord } from "@/data/vocab";

import QuestScreen from "@/components/shared/QuestScreen";
import CountdownPhase from "@/components/feed/CountdownPhase";
import MasteryTest from "@/components/test/MasteryTest";

export default function ReviewPage() {
  const [phase, setPhase] = useState<
    "intro" | "countdown" | "mastery" | "complete"
  >("intro");
  const [sessionWords, setSessionWords] = useState<VocabWord[]>([]);
  const [reviewType, setReviewType] = useState<
    "midterm" | "final1" | "finale" | ""
  >("");
  const [isLoaded, setIsLoaded] = useState(false);
  const hasAwarded = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const t = params.get("type") as "midterm" | "final1" | "finale";
      setReviewType(t);

      // EXACT SLICES FOR THE 50 WORD CAMPAIGN
      if (t === "midterm") {
        setSessionWords(vocabData.slice(0, 25)); // Words 1 - 25
      } else if (t === "final1") {
        setSessionWords(vocabData.slice(25, 50)); // Words 26 - 50
      } else if (t === "finale") {
        setSessionWords(vocabData.slice(0, 50)); // All 50 Words
      }
      setIsLoaded(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === "complete" && !hasAwarded.current && reviewType) {
      hasAwarded.current = true;
      if (reviewType === "midterm")
        localStorage.setItem("quest_midterm_done", "true");
      if (reviewType === "final1")
        localStorage.setItem("quest_final1_done", "true");
      if (reviewType === "finale")
        localStorage.setItem("quest_finale_done", "true");

      localStorage.setItem("trigger_fireworks", "true");
    }
  }, [phase, reviewType]);

  if (!isLoaded || !reviewType)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center"></div>
    );

  const config = {
    midterm: {
      theme: "purple" as const,
      icon: "👾",
      title: "Midterm Boss Fight",
      desc: "A massive test of the first 25 words. Prove your mastery!",
    },
    final1: {
      theme: "amber" as const,
      icon: "🔥",
      title: "Final Boss: Part 1",
      desc: "A grueling test of the last 25 words. Focus up!",
    },
    finale: {
      theme: "red" as const,
      icon: "👑",
      title: "The Grand Finale",
      desc: "The ultimate challenge. ALL 50 WORDS. Leave nothing behind!",
    },
  };

  const currentConfig = config[reviewType];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      {phase === "intro" && (
        <QuestScreen
          type="intro"
          theme={currentConfig.theme}
          icon={currentConfig.icon}
          title={currentConfig.title}
          description={currentConfig.desc}
          buttonText="Enter the Arena ⚔️"
          onNext={() => setPhase("countdown")}
          showCancel={true}
        />
      )}

      {phase === "countdown" && (
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
          <div className="text-6xl mb-6">🎖️</div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            Boss Defeated!
          </h2>
          <p className="text-gray-500 mb-8 font-medium">
            Absolutely incredible. You proved you know these words by heart!
          </p>
          <Link
            href="/"
            className={`text-white font-bold py-4 px-8 rounded-xl text-xl transition-all shadow-md inline-block bg-${currentConfig.theme}-500 hover:bg-${currentConfig.theme}-600`}
            style={{
              backgroundColor:
                currentConfig.theme === "purple"
                  ? "#a855f7"
                  : currentConfig.theme === "amber"
                    ? "#f59e0b"
                    : "#ef4444",
            }}
          >
            Return to Dashboard
          </Link>
        </div>
      )}
    </main>
  );
}
