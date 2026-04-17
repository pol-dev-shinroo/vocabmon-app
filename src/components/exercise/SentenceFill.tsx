"use client";
import { useState, useEffect, useCallback } from "react";
import { VocabWord } from "@/data/vocab";
import PixelVocabmon from "../shared/PixelVocabmon";
import SandTimer from "../shared/SandTimer";

export default function SentenceFill({
  words,
  onFinish,
}: {
  words: VocabWord[];
  onFinish: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedTrigger, setFeedTrigger] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [correctId, setCorrectId] = useState<number | null>(null);
  const [errorId, setErrorId] = useState<number | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<VocabWord[]>([]);

  // Fetch Vocabmon Level
  useEffect(() => {
    const savedExp = parseInt(localStorage.getItem("vocabmon_exp") || "0", 10);
    const rawLevel = Math.floor(savedExp / 150) + 1;
    setCurrentLevel(Math.min(rawLevel, 10));
  }, []);

  // Shuffle options for the buttons
  useEffect(() => {
    setShuffledOptions([...words].sort(() => Math.random() - 0.5));
  }, [words]);

  const activeWord = words[currentIndex];

  const handleTimeUp = useCallback(() => {
    setIsGameOver(true);
  }, []);

  const handleRestart = () => {
    setCurrentIndex(0);
    setMistakes(0);
    setIsGameOver(false);
    setCorrectId(null);
    setErrorId(null);
  };

  const handleChoice = (word: VocabWord) => {
    if (correctId !== null || errorId !== null || isGameOver) return;

    if (word.id === activeWord.id) {
      setCorrectId(word.id);
      setFeedTrigger((prev) => prev + 1);
      setTimeout(() => {
        setCorrectId(null);
        if (currentIndex + 1 < words.length) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          onFinish();
        }
      }, 1000);
    } else {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      setErrorId(word.id);
      setTimeout(() => {
        setErrorId(null);
        if (newMistakes >= 3) {
          setIsGameOver(true);
        }
      }, 1000);
    }
  };

  if (isGameOver) {
    return (
      <div className="w-full max-w-2xl animate-fade-in mx-auto mt-12">
        <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-10 text-center shadow-xl flex flex-col items-center">
          <div className="text-6xl mb-4">💥</div>
          <h2 className="text-4xl font-black text-red-600 mb-4">Game Over!</h2>
          <p className="text-xl text-red-900/80 font-medium mb-8">
            Too many mistakes! You have to restart the exercise.
          </p>
          <button
            onClick={handleRestart}
            className="bg-red-500 hover:bg-red-600 text-white text-xl font-bold py-4 px-10 rounded-2xl shadow-lg hover:scale-105 transition-all active:scale-95"
          >
            Restart 🔄
          </button>
        </div>
      </div>
    );
  }

  // Smart Blanking
  const getBlankedSentence = (sentence: string, target: string) => {
    const root = target.slice(0, 4);
    const regex = new RegExp(`\\b${root}[a-z]*\\b`, "gi");
    return sentence.replace(regex, "__________");
  };

  if (!activeWord) return null;

  return (
    <div className="w-full max-w-4xl animate-fade-in flex flex-col items-center">
      <style>{`
        @keyframes error-shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
        .animate-error-shake { animation: error-shake 0.3s ease-in-out; }
      `}</style>

      <div className="w-full flex justify-between items-end mb-6 px-4">
        <h2 className="text-4xl font-black text-gray-900">Sentence Fill 📝</h2>
        <div className="flex gap-3">
          {mistakes > 0 && (
            <span className="bg-red-100 text-red-700 font-bold px-4 py-2 rounded-xl animate-pulse">
              {mistakes} Strike{mistakes > 1 ? "s" : ""}! ⚠️
            </span>
          )}
          <span className="bg-emerald-100 text-emerald-800 font-bold px-4 py-2 rounded-xl">
            {currentIndex + 1} / {words.length}
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 w-full">
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="bg-gradient-to-b from-blue-50 to-indigo-50 rounded-3xl p-6 shadow-inner border border-indigo-100/50 w-full flex flex-col items-center relative h-64 justify-end">
            <PixelVocabmon feedTrigger={feedTrigger} level={currentLevel} />
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
            <SandTimer
              key={currentIndex}
              duration={30}
              isActive={!isGameOver && correctId === null}
              onTimeUp={handleTimeUp}
            />
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-10 shadow-xl border-4 border-indigo-50 min-h-[12rem] flex items-center justify-center">
            <p className="text-2xl text-gray-800 font-medium leading-relaxed text-center italic">
              &quot;{getBlankedSentence(activeWord.sentence || "", activeWord.word)}&quot;
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {shuffledOptions.map((word) => (
              <button
                key={word.id}
                onClick={() => handleChoice(word)}
                className={`py-4 px-6 rounded-2xl text-xl font-bold transition-all transform active:scale-95 border-b-4 ${
                  correctId === word.id
                    ? "bg-emerald-500 border-emerald-700 text-white scale-105"
                    : errorId === word.id
                    ? "bg-red-500 border-red-700 text-white animate-error-shake"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-indigo-50 hover:border-indigo-200"
                }`}
              >
                {word.word}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
