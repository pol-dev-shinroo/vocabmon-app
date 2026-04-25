"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { vocabData, VocabWord } from "@/data/vocab";
import { getStudentProgress } from "@/actions/loadProgress";
import JumpGame from "@/components/game/JumpGame";

export default function GamePage() {
  const [sessionWords, setSessionWords] = useState<VocabWord[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchVocab() {
      const progress = await getStudentProgress();
      const currentSet = progress?.currentSet || 0;
      const endIndex = (currentSet + 1) * 5;
      setSessionWords(vocabData.slice(0, endIndex));
      setIsLoaded(true);
    }
    fetchVocab();
  }, []);

  if (!isLoaded) return <div className="min-h-screen bg-sky-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500"></div></div>;

  return (
    <main className="min-h-screen bg-sky-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
        <Link href="/" className="bg-white/90 backdrop-blur-sm hover:bg-white text-indigo-600 font-black py-3 px-6 rounded-2xl shadow-sm border border-indigo-100 transition-all flex items-center gap-2 group">
          <span className="transition-transform group-hover:-translate-x-1">←</span> Back to Dashboard
        </Link>
        <div className="bg-white/90 backdrop-blur-sm text-indigo-800 font-black py-3 px-6 rounded-2xl shadow-sm border border-indigo-100 flex items-center gap-2">
          🎮 <span className="uppercase tracking-widest text-xs">Mini-Game Mode</span>
        </div>
      </div>
      <div className="w-full max-w-4xl animate-fade-in-up mt-16">
        <JumpGame words={sessionWords} />
      </div>
    </main>
  );
}
