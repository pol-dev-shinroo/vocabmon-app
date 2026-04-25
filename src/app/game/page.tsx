"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { vocabData, VocabWord } from "@/data/vocab";
import { getStudentProgress } from "@/actions/loadProgress";
import JumpGame from "@/components/game/JumpGame";

export default function GamePage() {
  const [sessionWords, setSessionWords] = useState<VocabWord[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [attempts, setAttempts] = useState(2);

  useEffect(() => {
    async function fetchVocab() {
      const progress = await getStudentProgress();
      const currentSet = progress?.currentSet || 0;

      // Slice the vocabulary to include all words learned so far this week
      const endIndex = (currentSet + 1) * 5;
      setSessionWords(vocabData.slice(0, endIndex));

      const savedAttempts = localStorage.getItem("game_attempts");
      if (savedAttempts !== null) setAttempts(parseInt(savedAttempts, 10));

      setIsLoaded(true);
    }
    fetchVocab();
  }, []);

  const handleGameEnd = () => {
    const newAttempts = Math.max(0, attempts - 1);
    setAttempts(newAttempts);
    localStorage.setItem("game_attempts", newAttempts.toString());
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-sky-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-sky-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Header UI */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
        <Link
          href="/"
          className="bg-white/90 backdrop-blur-sm hover:bg-white text-indigo-600 font-black py-3 px-6 rounded-2xl shadow-sm border border-indigo-100 transition-all flex items-center gap-2 group"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span> 
          Back to Dashboard
        </Link>
        <div className="bg-white/90 backdrop-blur-sm text-indigo-800 font-black py-3 px-6 rounded-2xl shadow-sm border border-indigo-100 flex items-center gap-2">
          🎮 <span className="uppercase tracking-widest text-xs">Mini-Game Mode</span>
        </div>
      </div>

      <div className="w-full max-w-4xl animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-indigo-950 mb-2 uppercase italic tracking-tighter">Dino Jump: Vocab Edition</h1>
          <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs">Jump over your weekly words to survive!</p>
        </div>
        
        {attempts <= 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center shadow-xl border border-red-100 max-w-md mx-auto">
            <div className="text-6xl mb-4">🔋</div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Out of Attempts!</h2>
            <p className="text-gray-500 font-medium mb-8">You used all your mini-game energy. Complete a quest on your Dashboard to recharge!</p>
            <Link href="/" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md inline-block">Return to Dashboard</Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-4"><span className="bg-indigo-100 text-indigo-800 font-bold px-4 py-2 rounded-full shadow-sm">Attempts Left: {attempts}/2</span></div>
            <JumpGame words={sessionWords} onGameEnd={handleGameEnd} />
          </>
        )}
        
        <div className="mt-8 grid grid-cols-2 gap-4 max-w-md mx-auto">
          <div className="bg-white/50 rounded-2xl p-4 border border-white/50 text-center">
            <div className="text-xs font-black text-indigo-300 uppercase mb-1">Controls</div>
            <div className="text-indigo-900 font-bold">Tap / Click to Jump</div>
          </div>
          <div className="bg-white/50 rounded-2xl p-4 border border-white/50 text-center">
            <div className="text-xs font-black text-indigo-300 uppercase mb-1">Objective</div>
            <div className="text-indigo-900 font-bold">Don&apos;t hit the words!</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
