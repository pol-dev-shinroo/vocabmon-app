"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import PixelVocabmon from "../shared/PixelVocabmon";

// 🚀 CHANGE THIS STRING NEXT TIME YOU WANT TO FORCE A RESET FOR A NEW LIST!
const APP_VERSION = "v2.1_50words";

export default function Dashboard() {
  const [exp, setExp] = useState(0);
  const [spellingDone, setSpellingDone] = useState(false);
  const [exerciseDone, setExerciseDone] = useState(false);
  const [testDone, setTestDone] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [currentSet, setCurrentSet] = useState(0);
  const totalSets = 10; // 10 sets (50 words)

  // Boss Fight Trackers
  const [midtermDone, setMidtermDone] = useState(false);
  const [final1Done, setFinal1Done] = useState(false);
  const [finaleDone, setFinaleDone] = useState(false);

  const activeQuestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initTimer = setTimeout(() => {
      // --- NEW: VERSION CHECK & HARD RESET LOGIC ---
      const savedVersion = localStorage.getItem("app_version");

      if (savedVersion !== APP_VERSION) {
        console.log("New update detected! Wiping all old data to start fresh.");

        // 💥 THE NUCLEAR OPTION: This destroys EVERYTHING saved in the browser!
        // This includes EXP, Quest progress, AND the "has seen gift" flag.
        localStorage.clear();

        // Save the new version immediately so it doesn't wipe their progress tomorrow!
        localStorage.setItem("app_version", APP_VERSION);
      }
      // ----------------------------------------------

      const savedExp = parseInt(
        localStorage.getItem("vocabmon_exp") || "0",
        10,
      );
      const isSpellDone =
        localStorage.getItem("quest_spelling_done") === "true";
      const isExDone = localStorage.getItem("quest_exercise_done") === "true";
      const isTestDone = localStorage.getItem("quest_test_done") === "true";
      const triggerFX = localStorage.getItem("trigger_fireworks") === "true";
      const savedSet = parseInt(
        localStorage.getItem("current_word_set") || "0",
        10,
      );

      setSpellingDone(isSpellDone);
      setExerciseDone(isExDone);
      setTestDone(isTestDone);
      setCurrentSet(savedSet);

      setMidtermDone(localStorage.getItem("quest_midterm_done") === "true");
      setFinal1Done(localStorage.getItem("quest_final1_done") === "true");
      setFinaleDone(localStorage.getItem("quest_finale_done") === "true");

      setIsLoaded(true);

      if (triggerFX) {
        setShowFireworks(true);
        setExp(Math.max(0, savedExp - 50));
        setTimeout(() => setExp(savedExp), 600);

        try {
          const AudioContextClass =
            window.AudioContext ||
            (
              window as Window & {
                webkitAudioContext?: typeof window.AudioContext;
              }
            ).webkitAudioContext;
          if (AudioContextClass) {
            const ctx = new AudioContextClass();
            const playNote = (
              freq: number,
              startTime: number,
              duration: number,
            ) => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = "sine";
              osc.frequency.value = freq;
              osc.connect(gain);
              gain.connect(ctx.destination);
              gain.gain.setValueAtTime(0, startTime);
              gain.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
              gain.gain.setValueAtTime(0.1, startTime + duration - 0.1);
              gain.gain.linearRampToValueAtTime(0, startTime + duration);
              osc.start(startTime);
              osc.stop(startTime + duration);
            };
            const now = ctx.currentTime;
            playNote(523.25, now, 0.15);
            playNote(659.25, now + 0.15, 0.15);
            playNote(783.99, now + 0.3, 0.15);
            playNote(1046.5, now + 0.45, 0.4);
          }
        } catch (e) {}

        localStorage.removeItem("trigger_fireworks");
        setTimeout(() => setShowFireworks(false), 4000);
      } else {
        setExp(savedExp);
      }
    }, 0);
    return () => clearTimeout(initTimer);
  }, []);

  useEffect(() => {
    if (isLoaded && activeQuestRef.current) {
      setTimeout(() => {
        activeQuestRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300);
    }
  }, [isLoaded]);

  const calculateLevelInfo = (totalExp: number) => {
    const rawLevel = Math.floor(totalExp / 150) + 1;
    const currentLevel = Math.min(rawLevel, 10);
    const expIntoCurrentLevel = totalExp % 150;
    const targetExpForLevel = 150;

    if (totalExp >= 1500) {
      return {
        level: 10,
        currentExpInLevel: 150,
        targetExpForLevel: 150,
        percentage: 100,
      };
    }
    const progressPercentage = (expIntoCurrentLevel / targetExpForLevel) * 100;
    return {
      level: currentLevel,
      currentExpInLevel: expIntoCurrentLevel,
      targetExpForLevel,
      percentage: progressPercentage,
    };
  };

  const levelStats = calculateLevelInfo(exp);

  const advanceToNextSet = () => {
    const nextSet = currentSet + 1;
    if (nextSet < totalSets) {
      localStorage.setItem("current_word_set", nextSet.toString());
      localStorage.removeItem("quest_spelling_done");
      localStorage.removeItem("quest_exercise_done");
      localStorage.removeItem("quest_test_done");

      setCurrentSet(nextSet);
      setSpellingDone(false);
      setExerciseDone(false);
      setTestDone(false);

      try {
        const AudioContextClass =
          window.AudioContext ||
          (
            window as Window & {
              webkitAudioContext?: typeof window.AudioContext;
            }
          ).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          const osc = ctx.createOscillator();
          osc.frequency.setValueAtTime(880, ctx.currentTime);
          osc.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.1);
        }
      } catch (e) {}

      setTimeout(() => {
        activeQuestRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  };

  if (!isLoaded) return <div className="w-full max-w-md min-h-[50vh]"></div>;

  const isSetComplete = spellingDone && exerciseDone && testDone;

  return (
    <div className="w-full max-w-md min-h-screen flex flex-col mx-auto bg-gray-50 relative animate-fade-in pb-16">
      <style>{`
        @keyframes firework { 0% { transform: translate(0, 0) scale(0); opacity: 1; } 50% { opacity: 1; } 100% { transform: translate(var(--tx), var(--ty)) scale(1.5); opacity: 0; } }
        .fw-particle { position: absolute; font-size: 2rem; animation: firework 1.5s ease-out forwards; }
        @keyframes quest-ready { 0%, 100% { transform: translateY(0) scale(1); box-shadow: 0 4px 6px -1px var(--tw-shadow-color); } 50% { transform: translateY(-5px) scale(1.02); box-shadow: 0 15px 25px -5px var(--tw-shadow-color); } }
        .animate-ready-indigo { --tw-shadow-color: rgba(99, 102, 241, 0.4); animation: quest-ready 2s ease-in-out infinite; }
        .animate-ready-green { --tw-shadow-color: rgba(34, 197, 94, 0.4); animation: quest-ready 2s ease-in-out infinite; }
        .animate-ready-blue { --tw-shadow-color: rgba(59, 130, 246, 0.4); animation: quest-ready 2s ease-in-out infinite; }
        .animate-ready-purple { --tw-shadow-color: rgba(168, 85, 247, 0.4); animation: quest-ready 2s ease-in-out infinite; }
        .animate-ready-amber { --tw-shadow-color: rgba(245, 158, 11, 0.4); animation: quest-ready 2s ease-in-out infinite; }
        .animate-ready-red { --tw-shadow-color: rgba(239, 68, 68, 0.4); animation: quest-ready 2s ease-in-out infinite; }
        @keyframes glow { 0%, 100% { filter: drop-shadow(0 0 10px rgba(52, 211, 153, 0.5)); } 50% { filter: drop-shadow(0 0 20px rgba(52, 211, 153, 0.9)); } }
        .animate-evo-glow { animation: glow 2s infinite alternate; }
      `}</style>

      {showFireworks && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="fw-particle"
              style={
                {
                  "--tx": `${Math.cos(i * 30 * (Math.PI / 180)) * 150}px`,
                  "--ty": `${Math.sin(i * 30 * (Math.PI / 180)) * 150}px`,
                } as React.CSSProperties
              }
            >
              {i % 2 === 0 ? "🌟" : "🎉"}
            </div>
          ))}
        </div>
      )}

      {/* Header & Stats */}
      <div className="p-6 pb-2 z-20">
        <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-gray-800">
              Jay&apos;s Partner
            </h2>
            <span className="bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-full text-sm">
              Lv. {levelStats.level}
            </span>
          </div>

          <div className="bg-gradient-to-b from-blue-50 to-indigo-50 rounded-2xl p-6 flex justify-center mb-6 border border-indigo-100/50 relative overflow-visible">
            <PixelVocabmon
              feedTrigger={showFireworks ? 1 : 0}
              level={levelStats.level}
              className={
                isSetComplete && currentSet < totalSets - 1
                  ? "animate-evo-glow"
                  : ""
              }
            />
          </div>

          <div>
            <div className="flex justify-between text-sm font-bold text-gray-500 mb-2">
              <span>
                {levelStats.level === 10
                  ? "MAX LEVEL"
                  : `EXP to Level ${levelStats.level + 1}`}
              </span>
              <span>
                {levelStats.currentExpInLevel} / {levelStats.targetExpForLevel}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden relative">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${levelStats.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quest List */}
      <div className="px-6 pb-12 pt-4 relative z-10">
        <h3 className="text-2xl font-black text-gray-800 mb-6 px-2">
          Campaign Map
        </h3>

        <div className="space-y-10">
          {[...Array(totalSets)].map((_, setIndex) => {
            const isPastSet = setIndex < currentSet;
            const isActiveSet = setIndex === currentSet;
            const isFutureSet = setIndex > currentSet;

            const isQ1Done = isPastSet || (isActiveSet && spellingDone);
            const isQ2Done = isPastSet || (isActiveSet && exerciseDone);
            const isQ3Done = isPastSet || (isActiveSet && testDone);

            const isQ1Locked = isFutureSet;
            const isQ2Locked = isFutureSet || (isActiveSet && !spellingDone);
            const isQ3Locked = isFutureSet || (isActiveSet && !exerciseDone);

            const isQ1Active = isActiveSet && !spellingDone;
            const isQ2Active = isActiveSet && spellingDone && !exerciseDone;
            const isQ3Active = isActiveSet && exerciseDone && !testDone;

            const q1Num = setIndex * 3 + 1;
            const q2Num = setIndex * 3 + 2;
            const q3Num = setIndex * 3 + 3;

            return (
              <div
                key={setIndex}
                className={`relative ${isFutureSet ? "opacity-60" : ""}`}
              >
                <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3 ml-2 flex items-center gap-2">
                  Set {setIndex + 1}{" "}
                  <span className="text-xs font-bold text-gray-300">
                    (Words {1 + setIndex * 5} - {5 + setIndex * 5})
                  </span>
                </h4>

                <div className="space-y-4">
                  {/* Quest 1 */}
                  <div
                    ref={isQ1Active ? activeQuestRef : null}
                    className="relative"
                  >
                    {isQ1Active && (
                      <div className="absolute -top-3 left-4 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full z-20 shadow-md">
                        📍 Current Quest
                      </div>
                    )}
                    <Link
                      href={isQ1Done || isQ1Locked ? "#" : "/feed"}
                      className={`block p-5 rounded-2xl transition-all relative overflow-hidden group ${isQ1Active ? "bg-white border-2 border-indigo-400 ring-4 ring-indigo-100 scale-[1.02] shadow-lg animate-ready-indigo" : isQ1Done ? "bg-white border-2 border-gray-100 cursor-default shadow-sm opacity-70" : isQ1Locked ? "bg-gray-50 border-2 border-dashed border-gray-200 cursor-default" : "bg-white border-2 border-indigo-400 hover:border-indigo-500 shadow-md"}`}
                    >
                      <div className="flex items-center justify-between relative z-10">
                        <div>
                          <h4
                            className={`font-bold text-lg ${isQ1Done || isQ1Locked ? "text-gray-500" : "text-indigo-900 group-hover:text-indigo-600"}`}
                          >
                            {q1Num}. Feed Vocabmon
                          </h4>
                          <p
                            className={`text-sm font-medium mt-1 ${isQ1Done ? "text-emerald-500" : "text-indigo-400"}`}
                          >
                            {isQ1Done ? "Completed! ✅" : "Reward: +50 EXP"}
                          </p>
                        </div>
                        <div
                          className={`w-10 h-10 flex items-center justify-center rounded-full font-black transition-colors ${isQ1Done ? "bg-green-100 text-green-600" : isQ1Locked ? "text-2xl text-gray-300" : "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white"}`}
                        >
                          {isQ1Done ? "✓" : isQ1Locked ? "🔒" : "→"}
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Quest 2 */}
                  <div
                    ref={isQ2Active ? activeQuestRef : null}
                    className="relative"
                  >
                    {isQ2Active && (
                      <div className="absolute -top-3 left-4 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full z-20 shadow-md">
                        📍 Current Quest
                      </div>
                    )}
                    <Link
                      href={isQ2Done || isQ2Locked ? "#" : "/exercise"}
                      className={`block p-5 rounded-2xl transition-all relative overflow-hidden group ${isQ2Active ? "bg-white border-2 border-green-400 ring-4 ring-green-100 scale-[1.02] shadow-lg animate-ready-green" : isQ2Done ? "bg-white border-2 border-gray-100 cursor-default shadow-sm opacity-70" : isQ2Locked ? "bg-gray-50 border-2 border-dashed border-gray-200 cursor-default" : "bg-white border-2 border-green-400 hover:border-green-500 shadow-md cursor-pointer"}`}
                    >
                      <div className="flex items-center justify-between relative z-10">
                        <div>
                          <h4
                            className={`font-bold text-lg ${isQ2Done || isQ2Locked ? "text-gray-500" : "text-green-900 group-hover:text-green-600"}`}
                          >
                            {q2Num}. Exercise Vocabmon
                          </h4>
                          <p
                            className={`text-sm font-medium mt-1 ${isQ2Done ? "text-emerald-500" : isQ2Locked ? "text-gray-400" : "text-green-500"}`}
                          >
                            {isQ2Done
                              ? "Completed! ✅"
                              : isQ2Locked
                                ? "Locked"
                                : "Reward: +50 EXP"}
                          </p>
                        </div>
                        <div
                          className={`w-10 h-10 flex items-center justify-center rounded-full font-black transition-colors ${isQ2Done ? "bg-green-100 text-green-600" : isQ2Locked ? "text-2xl text-gray-300" : "bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white"}`}
                        >
                          {isQ2Done ? "✓" : isQ2Locked ? "🔒" : "→"}
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Quest 3 */}
                  <div
                    ref={isQ3Active ? activeQuestRef : null}
                    className="relative"
                  >
                    {isQ3Active && (
                      <div className="absolute -top-3 left-4 bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full z-20 shadow-md">
                        📍 Current Quest
                      </div>
                    )}
                    <Link
                      href={isQ3Done || isQ3Locked ? "#" : "/test"}
                      className={`block p-5 rounded-2xl transition-all relative overflow-hidden group ${isQ3Active ? "bg-white border-2 border-blue-400 ring-4 ring-blue-100 scale-[1.02] shadow-lg animate-ready-blue" : isQ3Done ? "bg-white border-2 border-gray-100 cursor-default shadow-sm opacity-70" : isQ3Locked ? "bg-gray-50 border-2 border-dashed border-gray-200 cursor-default" : "bg-white border-2 border-blue-400 hover:border-blue-500 shadow-md cursor-pointer"}`}
                    >
                      <div className="flex items-center justify-between relative z-10">
                        <div>
                          <h4
                            className={`font-bold text-lg ${isQ3Done || isQ3Locked ? "text-gray-500" : "text-blue-900 group-hover:text-blue-600"}`}
                          >
                            {q3Num}. Final Exam
                          </h4>
                          <p
                            className={`text-sm font-medium mt-1 ${isQ3Done ? "text-emerald-500" : isQ3Locked ? "text-gray-400" : "text-blue-500"}`}
                          >
                            {isQ3Done
                              ? "Completed! ✅"
                              : isQ3Locked
                                ? "Locked"
                                : "Reward: +50 EXP"}
                          </p>
                        </div>
                        <div
                          className={`w-10 h-10 flex items-center justify-center rounded-full font-black transition-colors ${isQ3Done ? "bg-green-100 text-green-600" : isQ3Locked ? "text-2xl text-gray-300" : "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"}`}
                        >
                          {isQ3Done ? "✓" : isQ3Locked ? "🔒" : "→"}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* SPECIAL BOSS: Midterm (Inject after Set 5 / Index 4) */}
                {setIndex === 4 && (
                  <div
                    className={`mt-10 pt-10 border-t-2 border-dashed border-gray-200 relative ${isFutureSet || (!isQ3Done && isActiveSet) ? "opacity-60" : ""}`}
                  >
                    <h4 className="text-sm font-black text-purple-500 uppercase tracking-widest mb-4 ml-2 flex items-center gap-2">
                      🌟 Midterm Exam{" "}
                      <span className="text-xs font-bold text-purple-300">
                        (Words 1 - 25)
                      </span>
                    </h4>

                    {(() => {
                      const isMidtermActive =
                        isQ3Done && !midtermDone && isActiveSet;
                      const isMidtermLocked = !isQ3Done;

                      return (
                        <div
                          ref={isMidtermActive ? activeQuestRef : null}
                          className="relative"
                        >
                          {isMidtermActive && (
                            <div className="absolute -top-3 left-4 bg-purple-500 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full z-20 shadow-md">
                              📍 Current Boss
                            </div>
                          )}
                          <Link
                            href={
                              midtermDone || isMidtermLocked
                                ? "#"
                                : "/review?type=midterm"
                            }
                            className={`block p-5 rounded-2xl transition-all relative overflow-hidden group ${isMidtermActive ? "bg-white border-2 border-purple-400 ring-4 ring-purple-100 scale-[1.02] shadow-lg animate-ready-purple" : midtermDone ? "bg-white border-2 border-gray-100 cursor-default shadow-sm opacity-70" : "bg-gray-50 border-2 border-dashed border-gray-200 cursor-default"}`}
                          >
                            <div className="flex items-center justify-between relative z-10">
                              <div>
                                <h4
                                  className={`font-bold text-lg ${midtermDone || isMidtermLocked ? "text-gray-500" : "text-purple-900 group-hover:text-purple-600"}`}
                                >
                                  Midterm Review Boss
                                </h4>
                                <p
                                  className={`text-sm font-medium mt-1 ${midtermDone ? "text-emerald-500" : isMidtermLocked ? "text-gray-400" : "text-purple-500"}`}
                                >
                                  {midtermDone
                                    ? "Completed! ✅"
                                    : isMidtermLocked
                                      ? "Locked"
                                      : "Reward: Midterm Badge 🏅"}
                                </p>
                              </div>
                              <div
                                className={`w-10 h-10 flex items-center justify-center rounded-full font-black transition-colors ${midtermDone ? "bg-green-100 text-green-600" : isMidtermLocked ? "text-2xl text-gray-300" : "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white"}`}
                              >
                                {midtermDone
                                  ? "✓"
                                  : isMidtermLocked
                                    ? "🔒"
                                    : "→"}
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })()}

                    {/* Show Evolve button ONLY if midterm is done */}
                    {isActiveSet && midtermDone && (
                      <div className="mt-8 bg-emerald-50 border-4 border-emerald-400 rounded-3xl p-6 text-center animate-fade-in shadow-xl">
                        <div className="text-4xl mb-2 animate-bounce">✨</div>
                        <h3 className="text-2xl font-black text-emerald-800 mb-2">
                          Vocabmon Evolved!
                        </h3>
                        <p className="text-emerald-700 font-bold mb-6">
                          Congratulations! You reached Level {levelStats.level}{" "}
                          and unlocked the next 5 words.
                        </p>
                        <button
                          onClick={advanceToNextSet}
                          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 px-4 rounded-xl text-xl transition-all shadow-md transform hover:scale-105"
                        >
                          Enter Set 6 🚀
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Normal Evolve Button (For Sets 1-4, and Sets 6-9) */}
                {isActiveSet &&
                  isQ3Done &&
                  setIndex !== 4 &&
                  setIndex < totalSets - 1 && (
                    <div className="mt-8 bg-emerald-50 border-4 border-emerald-400 rounded-3xl p-6 text-center animate-fade-in shadow-xl">
                      <div className="text-4xl mb-2 animate-bounce">✨</div>
                      <h3 className="text-2xl font-black text-emerald-800 mb-2">
                        Vocabmon Evolved!
                      </h3>
                      <p className="text-emerald-700 font-bold mb-6">
                        Congratulations! You reached Level {levelStats.level}{" "}
                        and unlocked the next 5 words.
                      </p>
                      <button
                        onClick={advanceToNextSet}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 px-4 rounded-xl text-xl transition-all shadow-md transform hover:scale-105"
                      >
                        Enter Set {setIndex + 2} 🚀
                      </button>
                    </div>
                  )}

                {/* SPECIAL BOSSES: Finals (Inject after Set 10 / Index 9) */}
                {setIndex === 9 && (
                  <div
                    className={`mt-10 pt-10 border-t-2 border-dashed border-gray-200 relative ${!isQ3Done ? "opacity-60" : ""}`}
                  >
                    {/* Final 1 */}
                    <h4 className="text-sm font-black text-amber-500 uppercase tracking-widest mb-4 ml-2 flex items-center gap-2">
                      🔥 Final Part 1{" "}
                      <span className="text-xs font-bold text-amber-300">
                        (Words 26 - 50)
                      </span>
                    </h4>
                    {(() => {
                      const isF1Active = isQ3Done && !final1Done;
                      const isF1Locked = !isQ3Done;

                      return (
                        <div
                          ref={isF1Active ? activeQuestRef : null}
                          className="relative mb-10"
                        >
                          {isF1Active && (
                            <div className="absolute -top-3 left-4 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full z-20 shadow-md">
                              📍 Current Boss
                            </div>
                          )}
                          <Link
                            href={
                              final1Done || isF1Locked
                                ? "#"
                                : "/review?type=final1"
                            }
                            className={`block p-5 rounded-2xl transition-all relative overflow-hidden group ${isF1Active ? "bg-white border-2 border-amber-400 ring-4 ring-amber-100 scale-[1.02] shadow-lg animate-ready-amber" : final1Done ? "bg-white border-2 border-gray-100 cursor-default shadow-sm opacity-70" : "bg-gray-50 border-2 border-dashed border-gray-200 cursor-default"}`}
                          >
                            <div className="flex items-center justify-between relative z-10">
                              <div>
                                <h4
                                  className={`font-bold text-lg ${final1Done || isF1Locked ? "text-gray-500" : "text-amber-900 group-hover:text-amber-600"}`}
                                >
                                  Final Review: Part 1
                                </h4>
                                <p
                                  className={`text-sm font-medium mt-1 ${final1Done ? "text-emerald-500" : isF1Locked ? "text-gray-400" : "text-amber-500"}`}
                                >
                                  {final1Done
                                    ? "Completed! ✅"
                                    : isF1Locked
                                      ? "Locked"
                                      : "Reward: Fire Badge 🏅"}
                                </p>
                              </div>
                              <div
                                className={`w-10 h-10 flex items-center justify-center rounded-full font-black transition-colors ${final1Done ? "bg-green-100 text-green-600" : isF1Locked ? "text-2xl text-gray-300" : "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white"}`}
                              >
                                {final1Done ? "✓" : isF1Locked ? "🔒" : "→"}
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })()}

                    {/* Finale */}
                    <div
                      className={`relative ${!final1Done ? "opacity-60" : ""}`}
                    >
                      <h4 className="text-sm font-black text-red-500 uppercase tracking-widest mb-4 ml-2 flex items-center gap-2">
                        👑 Grand Finale{" "}
                        <span className="text-xs font-bold text-red-300">
                          (All 50 Words)
                        </span>
                      </h4>
                      {(() => {
                        const isFinaleActive = final1Done && !finaleDone;
                        const isFinaleLocked = !final1Done;

                        return (
                          <div
                            ref={isFinaleActive ? activeQuestRef : null}
                            className="relative"
                          >
                            {isFinaleActive && (
                              <div className="absolute -top-3 left-4 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full z-20 shadow-md">
                                📍 Current Boss
                              </div>
                            )}
                            <Link
                              href={
                                finaleDone || isFinaleLocked
                                  ? "#"
                                  : "/review?type=finale"
                              }
                              className={`block p-5 rounded-2xl transition-all relative overflow-hidden group ${isFinaleActive ? "bg-white border-2 border-red-400 ring-4 ring-red-100 scale-[1.02] shadow-lg animate-ready-red" : finaleDone ? "bg-white border-2 border-gray-100 cursor-default shadow-sm opacity-70" : "bg-gray-50 border-2 border-dashed border-gray-200 cursor-default"}`}
                            >
                              <div className="flex items-center justify-between relative z-10">
                                <div>
                                  <h4
                                    className={`font-bold text-lg ${finaleDone || isFinaleLocked ? "text-gray-500" : "text-red-900 group-hover:text-red-600"}`}
                                  >
                                    The Ultimate Test
                                  </h4>
                                  <p
                                    className={`text-sm font-medium mt-1 ${finaleDone ? "text-emerald-500" : isFinaleLocked ? "text-gray-400" : "text-red-500"}`}
                                  >
                                    {finaleDone
                                      ? "Completed! ✅"
                                      : isFinaleLocked
                                        ? "Locked"
                                        : "Reward: True Master Crown 👑"}
                                  </p>
                                </div>
                                <div
                                  className={`w-10 h-10 flex items-center justify-center rounded-full font-black transition-colors ${finaleDone ? "bg-green-100 text-green-600" : isFinaleLocked ? "text-2xl text-gray-300" : "bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white"}`}
                                >
                                  {finaleDone
                                    ? "✓"
                                    : isFinaleLocked
                                      ? "🔒"
                                      : "→"}
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      })()}
                    </div>

                    {finaleDone && (
                      <div className="bg-indigo-50 border-4 border-indigo-500 rounded-3xl p-8 text-center mt-12 animate-fade-in shadow-2xl">
                        <div className="text-6xl mb-4 animate-bounce">🐉</div>
                        <h3 className="text-3xl font-black text-indigo-900 mb-2">
                          MAX LEVEL REACHED!
                        </h3>
                        <p className="text-indigo-700 font-bold text-lg leading-relaxed">
                          Vocabmon has achieved its ultimate form! You
                          successfully mastered all 50 words and passed the
                          Grand Finale. Incredible job!
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
