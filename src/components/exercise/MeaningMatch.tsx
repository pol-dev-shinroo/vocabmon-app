import { useState, useEffect, useRef, useCallback } from "react";
import { VocabWord } from "@/data/vocab";
import PixelVocabmon from "../shared/PixelVocabmon";
import SandTimer from "../shared/SandTimer";
import TimeoutScreen from "../shared/TimeoutScreen";

type LineData = { id: number; x1: number; y1: number; x2: number; y2: number };
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// SET YOUR DIFFICULTY HERE (30 seconds per correct match)
const SECONDS_PER_MATCH = 30;

export default function MeaningMatch({
  words,
  onFinish,
}: {
  words: VocabWord[];
  onFinish: () => void;
}) {
  const [leftWords, setLeftWords] = useState<VocabWord[]>([]);
  const [rightMeanings, setRightMeanings] = useState<VocabWord[]>([]);

  const [selectedWordId, setSelectedWordId] = useState<number | null>(null);
  const [matchedIds, setMatchedIds] = useState<number[]>([]);
  const [errorId, setErrorId] = useState<number | null>(null);
  const [feedTrigger, setFeedTrigger] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Timer & Level States
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);

  // --- Mistake Tracking (2 Strikes Rule) ---
  const [mistakesThisRound, setMistakesThisRound] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const leftNodeRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const rightNodeRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [lines, setLines] = useState<LineData[]>([]);

  // Fetch Vocabmon Level
  useEffect(() => {
    const timer = setTimeout(() => {
      const savedExp = parseInt(
        localStorage.getItem("vocabmon_exp") || "0",
        10,
      );
      const rawLevel = Math.floor(savedExp / 150) + 1;
      setCurrentLevel(Math.min(rawLevel, 10));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLeftWords(shuffleArray(words));
      setRightMeanings(shuffleArray(words));
    }, 0);
    return () => {
      clearTimeout(timer);
      window.speechSynthesis.cancel();
    };
  }, [words]);

  const drawLines = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newLines = matchedIds
      .map((id) => {
        const leftNode = leftNodeRefs.current[id];
        const rightNode = rightNodeRefs.current[id];
        if (!leftNode || !rightNode) return null;
        const lRect = leftNode.getBoundingClientRect();
        const rRect = rightNode.getBoundingClientRect();
        return {
          id,
          x1: lRect.left + lRect.width / 2 - containerRect.left,
          y1: lRect.top + lRect.height / 2 - containerRect.top,
          x2: rRect.left + rRect.width / 2 - containerRect.left,
          y2: rRect.top + rRect.height / 2 - containerRect.top,
        };
      })
      .filter((line): line is LineData => line !== null);
    setLines(newLines);
  }, [matchedIds]);

  useEffect(() => {
    const timer = setTimeout(drawLines, 50);
    window.addEventListener("resize", drawLines);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", drawLines);
    };
  }, [drawLines]);

  const handleTimeUp = useCallback(() => {
    setHasTimedOut(true);
  }, []);

  // --- Full Quiz Restart (Used for BOTH Timeouts and Game Overs) ---
  const handleRestartQuiz = () => {
    setIsGameOver(false);
    setHasTimedOut(false);
    setMistakesThisRound(0);
    setMatchedIds([]);
    setSelectedWordId(null);
    setLines([]);
    setRetryCount((prev) => prev + 1); // Reset timer

    // Reshuffle the board completely
    setLeftWords(shuffleArray(words));
    setRightMeanings(shuffleArray(words));
  };

  const handleWordClick = (word: VocabWord) => {
    if (matchedIds.includes(word.id) || isSpeaking || hasTimedOut || isGameOver)
      return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.lang = "en-US"; // FIX: Force English voice
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
    setSelectedWordId(word.id);
  };

  const handleMeaningClick = (meaning: VocabWord) => {
    if (
      matchedIds.includes(meaning.id) ||
      isSpeaking ||
      hasTimedOut ||
      isGameOver
    )
      return;

    if (selectedWordId === null) {
      // If they click a meaning without picking a word first, just show an error flash (doesn't count as a strike)
      setErrorId(meaning.id);
      setTimeout(() => setErrorId(null), 400);
      return;
    }

    if (meaning.id === selectedWordId) {
      // --- CORRECT MATCH ---
      setMistakesThisRound(0); // Reset strikes for the next attempt
      const newMatched = [...matchedIds, meaning.id];
      setMatchedIds(newMatched);
      setSelectedWordId(null);
      setFeedTrigger((prev) => prev + 1);

      setIsSpeaking(true);
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(meaning.definition);
      utterance.lang = "en-US"; // FIX: Force English voice
      utterance.rate = 0.85;

      utterance.onend = () => {
        setIsSpeaking(false);
        if (newMatched.length === words.length) {
          setTimeout(onFinish, 1000);
        }
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // --- INCORRECT MATCH ---
      const newMistakes = mistakesThisRound + 1;
      setMistakesThisRound(newMistakes);
      setErrorId(meaning.id);

      setTimeout(() => {
        setErrorId(null);
        // Trigger Game Over if they hit 2 mistakes
        if (newMistakes >= 2) {
          setIsGameOver(true);
        }
      }, 400); // Wait for the error shake animation to finish
    }
  };

  // IF TIME IS UP, SHOW THE TIMEOUT SCREEN! (Now triggers a full restart)
  if (hasTimedOut) {
    return <TimeoutScreen onRetry={handleRestartQuiz} />;
  }

  // IF GAME OVER (2 Mistakes), SHOW RESTART SCREEN
  if (isGameOver) {
    return (
      <div className="w-full max-w-2xl animate-fade-in mx-auto mt-12">
        <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-10 text-center shadow-xl flex flex-col items-center">
          <div className="text-6xl mb-4">💥</div>
          <h2 className="text-4xl font-black text-red-600 mb-4">Game Over!</h2>
          <p className="text-xl text-red-900/80 font-medium mb-8">
            You made 2 wrong connection attempts. You have to restart the
            puzzle!
          </p>
          <button
            onClick={handleRestartQuiz}
            className="bg-red-500 hover:bg-red-600 text-white text-xl font-bold py-4 px-10 rounded-2xl shadow-lg hover:scale-105 transition-all active:scale-95"
          >
            Restart Puzzle 🔄
          </button>
        </div>
      </div>
    );
  }

  let instructionText = "Step 1: Click a word on the left.";
  if (isSpeaking) instructionText = "Listen closely! 🎧";
  else if (selectedWordId !== null)
    instructionText = "Step 2: Now click its exact meaning on the right!";
  else if (matchedIds.length === words.length)
    instructionText = "Perfect! You connected them all! 🎉";

  return (
    <div className="w-full max-w-6xl animate-fade-in flex flex-col items-center">
      <style>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        .animate-error-shake { animation: shake 0.3s ease-in-out; }
      `}</style>

      <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-6 shadow-sm border border-indigo-100/50 flex items-center justify-between mb-8 relative overflow-hidden h-32">
        <div className="z-10 flex flex-col justify-center h-full">
          <h2 className="text-3xl font-black text-indigo-900 mb-1">
            Meaning Match 🔗
          </h2>
          <p
            className={`font-bold transition-colors duration-300 ${isSpeaking ? "text-emerald-500 animate-pulse" : selectedWordId !== null ? "text-emerald-600" : "text-indigo-500"}`}
          >
            {instructionText}
          </p>
        </div>
        <div className="flex items-center gap-6 z-10 h-full">
          {/* Dynamic visual indicator for mistakes next to Link count */}
          <div className="text-right flex items-center gap-3">
            {mistakesThisRound > 0 && (
              <span className="bg-red-100 text-red-700 font-bold px-4 py-2 rounded-xl shadow-sm border border-red-200 animate-pulse">
                {mistakesThisRound} Strike{mistakesThisRound > 1 ? "s" : ""}! ⚠️
              </span>
            )}
            <span className="bg-white/80 text-indigo-800 font-bold px-4 py-2 rounded-xl shadow-sm border border-indigo-100">
              {matchedIds.length} / {words.length} Linked
            </span>
          </div>
          <div className="w-24 h-full flex items-end justify-center pb-2">
            <PixelVocabmon
              feedTrigger={feedTrigger}
              level={currentLevel}
              className="transform scale-[0.7] origin-bottom"
            />
          </div>
        </div>
      </div>

      <div
        className="relative w-full bg-white p-10 pt-14 rounded-3xl shadow-lg border border-gray-100"
        ref={containerRef}
      >
        {/* TIMER COMPONENT - Absolutely positioned so it doesn't shift the buttons/lines */}
        <div className="absolute top-0 left-0 w-full px-10 pt-4 z-30">
          <SandTimer
            key={`${matchedIds.length}-${retryCount}`}
            duration={SECONDS_PER_MATCH}
            isActive={
              !isSpeaking && !hasTimedOut && matchedIds.length < words.length
            }
            onTimeUp={handleTimeUp}
          />
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {lines.map((line) => (
            <path
              key={line.id}
              d={`M ${line.x1} ${line.y1} C ${line.x1 + 100} ${line.y1}, ${line.x2 - 100} ${line.y2}, ${line.x2} ${line.y2}`}
              fill="none"
              stroke="#10b981"
              strokeWidth="5"
              strokeLinecap="round"
              className="animate-fade-in drop-shadow-sm"
              style={{
                strokeDasharray: 1000,
                strokeDashoffset: 0,
                animation: "draw 0.6s ease-out forwards",
              }}
            />
          ))}
        </svg>
        <style>{`@keyframes draw { from { stroke-dashoffset: 1000; } to { stroke-dashoffset: 0; } }`}</style>

        <div className="grid grid-cols-2 gap-32 w-full relative z-20">
          <div className="flex flex-col gap-6">
            {leftWords.map((word) => {
              const isSelected = selectedWordId === word.id;
              const isMatched = matchedIds.includes(word.id);
              return (
                <div
                  key={word.id}
                  className="relative flex items-center justify-end w-full"
                >
                  <button
                    onClick={() => handleWordClick(word)}
                    disabled={isMatched || isSpeaking}
                    className={`w-full p-6 rounded-2xl text-2xl font-black uppercase tracking-wider transition-all border-2 shadow-sm text-center relative z-10 ${isMatched ? "bg-emerald-50 border-emerald-500 text-emerald-600 opacity-60" : isSelected ? "bg-indigo-50 border-indigo-500 text-indigo-600 transform scale-[1.02] ring-4 ring-indigo-100" : "bg-gray-50 border-gray-200 text-gray-800 hover:border-indigo-300 hover:shadow-md hover:bg-white"} ${isSpeaking && !isMatched ? "opacity-50" : ""}`}
                  >
                    {word.word}
                  </button>
                  <div
                    ref={(el) => {
                      leftNodeRefs.current[word.id] = el;
                    }}
                    className={`absolute -right-3 w-6 h-6 rounded-full border-4 z-20 transition-colors duration-300 ${isMatched ? "bg-emerald-500 border-white" : isSelected ? "bg-indigo-500 border-indigo-100 animate-pulse" : "bg-gray-300 border-white"}`}
                  ></div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-6">
            {rightMeanings.map((meaning) => {
              const isMatched = matchedIds.includes(meaning.id);
              const isError = errorId === meaning.id;
              return (
                <div
                  key={meaning.id}
                  className="relative flex items-center justify-start w-full"
                >
                  <div
                    ref={(el) => {
                      rightNodeRefs.current[meaning.id] = el;
                    }}
                    className={`absolute -left-3 w-6 h-6 rounded-full border-4 z-20 transition-colors duration-300 ${isMatched ? "bg-emerald-500 border-white" : "bg-gray-300 border-white"} ${isError ? "bg-red-500 border-red-100" : ""}`}
                  ></div>
                  <button
                    onClick={() => handleMeaningClick(meaning)}
                    disabled={isMatched || isSpeaking}
                    className={`w-full p-6 pl-8 rounded-2xl text-left transition-all border-2 shadow-sm relative z-10 ${isMatched ? "bg-emerald-50 border-emerald-500 text-emerald-700 opacity-60" : isError ? "bg-red-50 border-red-500 text-red-600 animate-error-shake" : "bg-gray-50 border-gray-200 text-gray-700 hover:border-emerald-300 hover:shadow-md hover:bg-white"} ${isSpeaking && !isMatched && meaning.id !== matchedIds[matchedIds.length - 1] ? "opacity-50" : ""}`}
                  >
                    <p className="font-medium text-lg leading-relaxed">
                      {meaning.definition}
                    </p>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
