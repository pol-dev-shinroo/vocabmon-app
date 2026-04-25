"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { VocabWord } from '@/data/vocab';
import PixelVocabmon from '../shared/PixelVocabmon';

export default function JumpGame({ words, onGameEnd }: { words: VocabWord[], onGameEnd: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [playerLane, setPlayerLane] = useState(1); // 0: Left, 1: Center, 2: Right
  const [doorStatus, setDoorStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    if (currentIndex >= words.length) {
      setHasWon(true);
      setTimeout(onGameEnd, 3000);
      return;
    }
    const correctWord = words[currentIndex].word;
    const distractors = words.filter(w => w.word !== correctWord).sort(() => 0.5 - Math.random()).slice(0, 2).map(w => w.word);
    
    // If we don't have enough words yet, pad with generic distractors
    while (distractors.length < 2) {
      distractors.push(["abandon", "modify", "derive", "cease"][Math.floor(Math.random() * 4)]);
    }
    
    setOptions([correctWord, ...distractors].sort(() => 0.5 - Math.random()));
    setDoorStatus('idle');
    setPlayerLane(1); // Reset to center
  }, [currentIndex, words, onGameEnd]);

  const handleDoorClick = (laneIndex: number, selectedWord: string) => {
    if (doorStatus !== 'idle') return;
    
    setPlayerLane(laneIndex); // Move player to the lane
    
    if (selectedWord === words[currentIndex].word) {
      setDoorStatus('correct');
      // Play success sound
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          const osc = ctx.createOscillator(); 
          osc.type = 'sine'; 
          osc.frequency.setValueAtTime(600, ctx.currentTime); 
          osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1); 
          osc.connect(ctx.destination); 
          osc.start(); 
          osc.stop(ctx.currentTime + 0.1);
        }
      } catch (e) {}
      
      setTimeout(() => setCurrentIndex(prev => prev + 1), 600); // Move to next word after dash
    } else {
      setDoorStatus('wrong');
      // Play error sound
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          const osc = ctx.createOscillator(); 
          osc.type = 'sawtooth'; 
          osc.frequency.setValueAtTime(150, ctx.currentTime); 
          osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2); 
          osc.connect(ctx.destination); 
          osc.start(); 
          osc.stop(ctx.currentTime + 0.2);
        }
      } catch (e) {}
      
      setTimeout(() => { setDoorStatus('idle'); setPlayerLane(1); }, 800); // Reset after bonk
    }
  };

  if (hasWon) return (
    <div className="absolute inset-0 bg-emerald-500/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white p-8 text-center animate-fade-in">
      <div className="text-7xl mb-4 animate-bounce">🏆</div>
      <h2 className="text-5xl font-black mb-2 uppercase italic">Run Complete!</h2>
      <p className="text-xl font-bold">You cleared all {words.length} doors!</p>
    </div>
  );

  const currentDef = words[currentIndex]?.definition || "";

  return (
    <div className="relative w-full h-[450px] bg-sky-900 overflow-hidden rounded-2xl border-4 border-indigo-900 shadow-inner" style={{ perspective: '800px' }}>
      
      {/* Scrolling Tracks (3D Floor) */}
      <div className="absolute inset-x-0 bottom-0 h-[300px] origin-bottom opacity-80" style={{ transform: 'rotateX(60deg)', background: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.2) 40px, rgba(255,255,255,0.2) 80px), linear-gradient(90deg, #1e3a8a 33%, #1e40af 33%, #1e40af 66%, #1e3a8a 66%)', backgroundSize: '100% 160px', animation: 'scroll-track 0.5s linear infinite' }} />

      {/* Top Meaning Box */}
      <div className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur-md border-4 border-indigo-300 rounded-2xl p-4 shadow-xl z-30 transform transition-transform text-center">
        <span className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-1 block">Meaning {currentIndex + 1} / {words.length}</span>
        <p className="text-indigo-950 font-bold text-sm sm:text-base line-clamp-3">{currentDef}</p>
      </div>

      {/* The 3 Doors */}
      <div className={`absolute top-[45%] left-0 w-full flex justify-center gap-4 px-4 z-20 transition-all duration-500 ${doorStatus === 'correct' ? 'scale-150 opacity-0 translate-y-20' : 'scale-100 opacity-100'}`}>
        {options.map((word, i) => (
          <button key={i} onClick={() => handleDoorClick(i, word)} disabled={doorStatus !== 'idle'} className={`flex-1 relative h-32 rounded-t-full border-4 shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-2 active:scale-95 ${doorStatus === 'wrong' && playerLane === i ? 'bg-red-500 border-red-200 animate-shake' : doorStatus === 'correct' && playerLane === i ? 'bg-emerald-400 border-white' : 'bg-indigo-600/90 border-indigo-300 hover:bg-indigo-500'}`}>
            <div className="absolute inset-0 rounded-t-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            <span className="text-white font-black text-sm shadow-black drop-shadow-md z-10 px-2 break-words text-center">{word}</span>
          </button>
        ))}
      </div>

      {/* Player Character */}
      <div className="absolute bottom-6 left-1/2 w-[80px] h-[80px] z-30 transition-transform duration-300 ease-out" style={{ transform: `translateX(calc(-50% + ${(playerLane - 1) * 110}px))` }}>
        <PixelVocabmon level={6} className={`w-full h-full drop-shadow-2xl ${doorStatus === 'wrong' ? 'filter grayscale brightness-50' : ''}`} />
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scroll-track { from { background-position: 0 0; } to { background-position: 0 160px; } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-10px) rotate(-5deg); } 75% { transform: translateX(10px) rotate(5deg); } }
        .animate-shake { animation: shake 0.4s ease-in-out; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}
