"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CHARACTERS = [
  { id: 1, name: "Harry Potter", hint: "The Boy Who Lived." },
  { id: 2, name: "Hermione Granger", hint: "The brightest witch of her age." },
  { id: 3, name: "Ron Weasley", hint: "Harry's loyal best friend and chess master." },
  { id: 4, name: "Albus Dumbledore", hint: "The greatest Headmaster of Hogwarts." },
  { id: 5, name: "Rubeus Hagrid", hint: "Keeper of Keys and Grounds at Hogwarts." },
  { id: 6, name: "Severus Snape", hint: "The Half-Blood Prince and Potions Master." },
  { id: 7, name: "Dobby", hint: "A free elf." },
  { id: 8, name: "Draco Malfoy", hint: "Harry's rival from House Slytherin." },
  { id: 9, name: "Tom Riddle", hint: "The boy who would become the Dark Lord." },
  { id: 10, name: "The Basilisk", hint: "The ancient, giant serpent hidden deep within the Chamber of Secrets." },
];

export default function StickersPage() {
  const [unlocked, setUnlocked] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("unlocked_stickers");
    if (saved) {
      setUnlocked(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-4 text-center md:text-left w-full">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">
              Sticker Collection ✨
            </h1>
            <p className="text-gray-500 font-medium">
              Level up your Vocabmon to unlock the magic!
            </p>
          </div>
          <Link
            href="/"
            className="bg-white border-2 border-gray-200 text-gray-600 hover:border-indigo-400 hover:text-indigo-600 font-bold py-3 px-6 rounded-xl transition-all shadow-sm shrink-0"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-12">
          {CHARACTERS.map((char) => {
            const isUnlocked = unlocked.includes(char.id);
            return (
              <div
                key={char.id}
                className={`bg-white rounded-3xl p-4 shadow-sm border-2 transition-all ${
                  isUnlocked ? "border-indigo-400 scale-100" : "border-gray-200 opacity-60 grayscale"
                }`}
              >
                <div className="aspect-square relative mb-4 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
                  {isUnlocked ? (
                    <img
                      src={`/stickers/${char.id}.jpg`}
                      alt={char.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-6xl filter blur-md select-none">👤</div>
                  )}
                </div>
                
                <h3 className={`font-black text-center mb-1 ${isUnlocked ? "text-indigo-900" : "text-gray-400"}`}>
                  {isUnlocked ? char.name : "Mystery Character"}
                </h3>
                
                {!isUnlocked && (
                  <p className="text-[10px] text-center text-gray-400 font-bold italic px-2">
                    Hint: {char.hint}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
