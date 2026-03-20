"use client";
import Link from "next/link";
import PixelVocabmon from "./PixelVocabmon";

interface TimeoutScreenProps {
  onRetry: () => void;
}

export default function TimeoutScreen({ onRetry }: TimeoutScreenProps) {
  return (
    <div className="w-full max-w-md text-center bg-white p-8 rounded-3xl shadow-sm border border-red-100 animate-fade-in flex flex-col items-center">
      <div className="text-7xl mb-6 animate-bounce">⏰</div>

      <h1 className="text-3xl font-black text-red-600 mb-2">Time&apos;s Up!</h1>

      <div className="bg-red-50 border border-red-100 rounded-xl p-6 mb-8 w-full">
        <h3 className="text-xl font-bold text-red-800 mb-2">
          Vocabmon got hungry!
        </h3>
        <p className="text-red-600 font-medium leading-relaxed">
          You took a little too long on that one. Stay focused and try typing a
          bit faster!
        </p>
      </div>

      <button
        onClick={onRetry}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-4 rounded-xl text-xl transition-all shadow-md transform hover:scale-105"
      >
        Try Again 🔄
      </button>

      <Link
        href="/"
        className="inline-block mt-6 text-gray-400 hover:text-gray-600 underline font-medium"
      >
        Flee to Dashboard
      </Link>
    </div>
  );
}
