"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { vocabData, VocabWord } from "@/data/vocab";
import { triggerSilentSync } from "@/lib/syncHelper";
import { getStudentProgress } from "@/actions/loadProgress";

import QuestScreen from "@/components/shared/QuestScreen";
import CountdownPhase from "@/components/feed/CountdownPhase";
import SpellingPractice from "@/components/feed/SpellingPractice";
import SpellingTest from "@/components/feed/SpellingTest";

export default function FeedPage() {
  const [feedPhase, setFeedPhase] = useState<
    | "intro"
    | "countdown"
    | "spelling"
    | "encouragement"
    | "transition"
    | "test_countdown"
    | "test"
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
    if (feedPhase === "complete" && !hasAwardedExp.current) {
      hasAwardedExp.current = true;
      const currentExp = parseInt(
        localStorage.getItem("vocabmon_exp") || "0",
        10,
      );
      localStorage.setItem("vocabmon_exp", (currentExp + 50).toString());
      localStorage.setItem("quest_spelling_done", "true");
      localStorage.setItem("trigger_fireworks", "true");

      // 🚀 NEW: Silently back up to MongoDB!
      triggerSilentSync();
    }
  }, [feedPhase]);

  if (!isLoaded)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center"></div>
    );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      {feedPhase === "intro" && (
        <QuestScreen
          type="intro"
          theme="indigo"
          icon="vocabmon"
          title="Vocabmon is hungry!"
          description={
            <>
              Let&apos;s feed Vocabmon by practicing our spelling.
              <br />
              Type the words correctly to give him EXP!
            </>
          }
          buttonText="Let's Feed Him! 🍎"
          onNext={() => setFeedPhase("countdown")}
          showCancel={true}
        />
      )}

      {feedPhase === "countdown" && (
        <CountdownPhase onFinish={() => setFeedPhase("spelling")} />
      )}
      {feedPhase === "spelling" && (
        <SpellingPractice
          words={sessionWords}
          onFinish={() => setFeedPhase("encouragement")}
        />
      )}

      {feedPhase === "encouragement" && (
        <QuestScreen
          type="encouragement"
          theme="emerald"
          icon="🔥"
          title="Amazing Job!"
          description="You're doing incredible! Take a deep breath before the next challenge."
          buttonText="Continue"
          onNext={() => setFeedPhase("transition")}
          audio="victory"
        />
      )}

      {feedPhase === "transition" && (
        <QuestScreen
          type="transition"
          theme="indigo"
          icon="⚔️"
          title="Next Quest Ready"
          subtitle="Spelling Test"
          description="Fill in the missing letters from the words you just learned. No training wheels this time!"
          buttonText="Start Test!"
          onNext={() => setFeedPhase("test_countdown")}
          audio="sword"
        />
      )}

      {feedPhase === "test_countdown" && (
        <CountdownPhase onFinish={() => setFeedPhase("test")} />
      )}
      {feedPhase === "test" && (
        <SpellingTest
          words={sessionWords}
          onFinish={() => setFeedPhase("complete")}
        />
      )}

      {feedPhase === "complete" && (
        <div className="text-center animate-fade-in bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
          <div className="text-6xl mb-6">🏆</div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            Quest Complete!
          </h2>
          <p className="text-gray-500 mb-8 font-medium">
            Amazing job! You passed the test and earned tons of EXP.
          </p>
          <Link
            href="/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all shadow-md inline-block"
          >
            Return to Dashboard
          </Link>
        </div>
      )}
    </main>
  );
}
