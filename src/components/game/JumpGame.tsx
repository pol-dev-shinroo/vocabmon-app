"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VocabWord } from '@/data/vocab';
import PixelVocabmon from '../shared/PixelVocabmon';
import SandTimer from '../shared/SandTimer';

export default function JumpGame({ words }: { words: VocabWord[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [playerLane, setPlayerLane] = useState(1);
  const [doorStatus, setDoorStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  
  const [hasWon, setHasWon] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [strikes, setStrikes] = useState(0);
  const [specialTrigger, setSpecialTrigger] = useState(0);
  
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);

  const bgmRef = useRef<HTMLAudioElement | null>(null);

  const startBGM = useCallback(() => {
    if (bgmRef.current) {
      bgmRef.current.pause();
      bgmRef.current.currentTime = 0;
    }
    const audio = new Audio('/exciting.mp3');
    audio.loop = true;
    audio.volume = 0.4;
    bgmRef.current = audio;
    audio.play().catch(e => console.log("Audio play blocked"));
  }, []);

  useEffect(() => {
    const savedExp = parseInt(localStorage.getItem("vocabmon_exp") || "0", 10);
    setCurrentLevel(Math.min(Math.floor(savedExp / 150) + 1, 10));
    setHighScore(parseInt(localStorage.getItem("jump_high_score") || "0", 10));

    startBGM();

    return () => {
      if (bgmRef.current) bgmRef.current.pause();
    };
  }, [startBGM]);

  useEffect(() => {
    if (currentIndex >= words.length) {
      setHasWon(true);
      return;
    }
    const correctWord = words[currentIndex].word;
    const distractors = words.filter(w => w.word !== correctWord).sort(() => 0.5 - Math.random()).slice(0, 2).map(w => w.word);
    while (distractors.length < 2) distractors.push(["abandon", "modify", "derive", "cease"][Math.floor(Math.random() * 4)]);
    
    setOptions([correctWord, ...distractors].sort(() => 0.5 - Math.random()));
    setDoorStatus('idle');
    setPlayerLane(1);
  }, [currentIndex, words]);

  const triggerGameOver = useCallback(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("jump_high_score", score.toString());
    }
    setIsGameOver(true);

    if (bgmCtxRef.current) bgmCtxRef.current.close();
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        const playSadNote = (freq: number, start: number, dur: number) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.value = freq;
          osc.connect(gain);
          gain.connect(ctx.destination);
          gain.gain.setValueAtTime(0.1, ctx.currentTime + start);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
          osc.start(ctx.currentTime + start);
          osc.stop(ctx.currentTime + start + dur);
        };
        // Sad descending arpeggio
        playSadNote(300, 0, 0.4);
        playSadNote(250, 0.3, 0.4);
        playSadNote(200, 0.6, 0.8);
      }
    } catch (e) {}
  }, [score, highScore]);

  const handleDoorClick = (laneIndex: number, selectedWord: string) => {
    if (doorStatus !== 'idle' || isGameOver) return;
    setPlayerLane(laneIndex);
    
    if (selectedWord === words[currentIndex].word) {
      setDoorStatus('correct');
      setScore(prev => prev + 10);
      setSpecialTrigger(prev => prev + 1); 
      
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          const osc = ctx.createOscillator(); osc.type = 'sine'; 
          osc.frequency.setValueAtTime(600, ctx.currentTime); 
          osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1); 
          osc.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.1);
        }
      } catch (e) {}
      setTimeout(() => setCurrentIndex(prev => prev + 1), 600);
    } else {
      setDoorStatus('wrong');
      const newStrikes = strikes + 1;
      setStrikes(newStrikes);
      
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          const osc = ctx.createOscillator(); osc.type = 'sawtooth'; 
          osc.frequency.setValueAtTime(150, ctx.currentTime); 
          osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2); 
          osc.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.2);
        }
      } catch (e) {}
      
      if (newStrikes >= 2) {
        setTimeout(() => triggerGameOver(), 800);
      } else {
        setTimeout(() => { setDoorStatus('idle'); setPlayerLane(1); }, 800);
      }
    }
  };

  const handlePlayAgain = () => {
    setIsGameOver(false);
    setHasWon(false);
    setCurrentIndex(0);
    setScore(0);
    setStrikes(0);
    setDoorStatus('idle');
    setPlayerLane(1);
    startBGM();
  };

  const currentDef = words[currentIndex]?.definition || "";

  return (
    <div className="relative w-full h-[450px] bg-sky-900 overflow-hidden rounded-2xl border-4 border-indigo-900 shadow-inner" style={{ perspective: '800px' }}>
      
      <div className="absolute top-0 left-0 w-full px-6 pt-3 z-40">
        <SandTimer key={`${currentIndex}-${isGameOver}`} duration={15} isActive={doorStatus === 'idle' && !isGameOver && !hasWon} onTimeUp={triggerGameOver} />
      </div>

      {/* Score UI */}
      <div className="absolute top-12 right-4 bg-amber-400 text-amber-950 font-black px-4 py-2 rounded-xl shadow-lg z-40 border-2 border-white flex items-center gap-2 animate-fade-in">
        <span className="text-xl">🪙</span> {score}
      </div>
      
      {/* Lives UI */}
      <div className="absolute top-12 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-xl shadow-md z-40 border-2 border-red-100 flex items-center gap-1 text-xl">
        {strikes === 0 ? "❤️❤️" : strikes === 1 ? "❤️🖤" : "🖤🖤"}
      </div>

      {isGameOver && (
        <div className="absolute inset-0 bg-sky-950/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white p-8 text-center animate-fade-in">
          <div className="text-7xl mb-4 animate-bounce">💥</div>
          <h2 className="text-4xl font-black mb-2 text-red-400">CRASH!</h2>
          <div className="bg-sky-900/50 border-2 border-sky-800 rounded-2xl p-6 mb-8 w-full max-w-sm">
            <p className="text-sky-300 font-bold uppercase tracking-widest text-sm mb-1">Score</p>
            <p className="text-5xl font-black text-amber-400 mb-4">{score}</p>
            <div className="h-px w-full bg-sky-800 mb-4"></div>
            <p className="text-sky-300 font-bold uppercase tracking-widest text-sm mb-1">Top Score</p>
            <p className="text-2xl font-black text-white">{Math.max(score, highScore)}</p>
          </div>
          <button onClick={handlePlayAgain} className="bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 px-8 rounded-xl text-xl transition-transform active:scale-95 shadow-lg border-2 border-emerald-400 w-full max-w-sm">
            Play Again 🔄
          </button>
        </div>
      )}

      {hasWon && (
        <div className="absolute inset-0 bg-emerald-500/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white p-8 text-center animate-fade-in">
          <div className="text-7xl mb-4 animate-bounce">🏆</div>
          <h2 className="text-4xl font-black mb-2 uppercase italic text-yellow-300">Run Complete!</h2>
          <p className="text-xl font-bold mb-8">You cleared all doors!</p>
          <button onClick={handlePlayAgain} className="bg-white hover:bg-gray-100 text-emerald-700 font-black py-4 px-8 rounded-xl text-xl transition-transform active:scale-95 shadow-lg w-full max-w-sm">
            Play Again 🔄
          </button>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 h-[300px] origin-bottom opacity-80" style={{ transform: 'rotateX(60deg)', background: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.2) 40px, rgba(255,255,255,0.2) 80px), linear-gradient(90deg, #1e3a8a 33%, #1e40af 33%, #1e40af 66%, #1e3a8a 66%)', backgroundSize: '100% 160px', animation: 'scroll-track 0.5s linear infinite' }} />

      <div className="absolute top-12 left-[100px] right-[100px] bg-white/95 backdrop-blur-md border-4 border-indigo-300 rounded-2xl p-4 shadow-xl z-30 text-center">
        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block">Meaning {currentIndex + 1}/{words.length}</span>
        <p className="text-indigo-950 font-bold text-sm line-clamp-3">{currentDef}</p>
      </div>

      <div className={`absolute top-[45%] left-0 w-full flex justify-center gap-4 px-4 z-20 transition-all duration-500 ${doorStatus === 'correct' ? 'scale-150 opacity-0 translate-y-20' : 'scale-100 opacity-100'}`}>
        {options.map((word, i) => (
          <button key={i} onClick={() => handleDoorClick(i, word)} disabled={doorStatus !== 'idle'} className={`flex-1 relative h-32 rounded-t-full border-4 shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-2 active:scale-95 ${doorStatus === 'wrong' && playerLane === i ? 'bg-red-500 border-red-200 animate-shake' : doorStatus === 'correct' && playerLane === i ? 'bg-emerald-400 border-white' : 'bg-indigo-600/90 border-indigo-300 hover:bg-indigo-500'}`}>
            <div className="absolute inset-0 rounded-t-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            <span className="text-white font-black text-sm shadow-black drop-shadow-md z-10 px-2 break-words text-center">{word}</span>
          </button>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 w-[80px] h-[80px] z-30 transition-transform duration-300 ease-out" style={{ transform: `translateX(calc(-50% + ${(playerLane - 1) * 110}px))` }}>
        <PixelVocabmon level={currentLevel} specialTrigger={specialTrigger} className={`w-full h-full drop-shadow-2xl ${doorStatus === 'wrong' ? 'filter grayscale brightness-50' : ''}`} />
      </div>

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
