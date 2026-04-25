"use client";
import React, { useState, useEffect, useRef } from "react";
import { VocabWord } from "@/data/vocab";
import PixelVocabmon from "../shared/PixelVocabmon";
import Link from "next/link";

type Obstacle = {
  id: number;
  x: number;
  width: number;
  word: string;
  passed: boolean;
};

export default function JumpGame({ 
  words, 
  onGameEnd 
}: { 
  words: VocabWord[], 
  onGameEnd: () => void 
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);

  const playerRef = useRef<HTMLDivElement>(null);
  const obstaclesRef = useRef<HTMLDivElement>(null);

  const gameLoopId = useRef<number | null>(null);
  const playerY = useRef(280);
  const velocity = useRef(0);
  const obstacles = useRef<Obstacle[]>([]);

  const GRAVITY = 0.6;
  const JUMP_POWER = -12;
  const GAME_SPEED = 5;
  const GROUND_Y = 280;
  const OBSTACLE_WIDTH = 50;
  const OBSTACLE_HEIGHT = 60;
  const PLAYER_X = 50;

  useEffect(() => {
    const savedHighScore = localStorage.getItem("jump_game_high_score");
    if (savedHighScore) setHighScore(parseInt(savedHighScore, 10));

    const savedExp = parseInt(localStorage.getItem("vocabmon_exp") || "0", 10);
    const rawLevel = Math.floor(savedExp / 150) + 1;
    setCurrentLevel(Math.min(rawLevel, 10));

    initObstacles();
  }, [words]);

  const initObstacles = () => {
    obstacles.current = words.map((w, i) => ({
      id: i,
      x: 800 + i * 400,
      width: OBSTACLE_WIDTH,
      word: w.word,
      passed: false
    }));
  };

  const playJumpSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }
    } catch (e) {}
  };

  const handleJump = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.preventDefault();
    
    if (isGameOver || hasWon) {
      resetGame();
      return;
    }

    if (!isPlaying) {
      setIsPlaying(true);
      velocity.current = JUMP_POWER;
      playJumpSound();
      return;
    }

    if (playerY.current >= GROUND_Y) {
      velocity.current = JUMP_POWER;
      playJumpSound();
    }
  };

  const resetGame = () => {
    playerY.current = GROUND_Y;
    velocity.current = 0;
    initObstacles();
    setScore(0);
    setIsGameOver(false);
    setHasWon(false);
    setIsPlaying(true);
  };

  const triggerEnd = (win: boolean) => {
    setIsGameOver(true);
    setIsPlaying(false);
    setHasWon(win);
    if (gameLoopId.current) cancelAnimationFrame(gameLoopId.current);
    onGameEnd();
  };

  const update = () => {
    if (!isPlaying || isGameOver || hasWon) return;

    // Physics
    velocity.current += GRAVITY;
    playerY.current += velocity.current;

    // Floor collision
    if (playerY.current >= GROUND_Y) {
      playerY.current = GROUND_Y;
      velocity.current = 0;
    }

    const playerRect = {
      left: PLAYER_X + 15,
      right: PLAYER_X + 45,
      top: playerY.current + 10,
      bottom: playerY.current + 50
    };

    obstacles.current.forEach((obs) => {
      obs.x -= GAME_SPEED;
      const obsRect = {
        left: obs.x,
        right: obs.x + OBSTACLE_WIDTH,
        top: GROUND_Y + 60 - OBSTACLE_HEIGHT,
        bottom: GROUND_Y + 60
      };

      // Collision detection
      if (
        playerRect.right > obsRect.left &&
        playerRect.left < obsRect.right &&
        playerRect.bottom > obsRect.top &&
        playerRect.top < obsRect.bottom
      ) {
        return triggerEnd(false);
      }

      // Score update
      if (!obs.passed && obs.x + OBSTACLE_WIDTH < PLAYER_X) {
        obs.passed = true;
        setScore((s) => {
          const newScore = s + 1;
          if (newScore === words.length) {
            setTimeout(() => triggerEnd(true), 100);
          }
          return newScore;
        });
      }
    });

    // Direct DOM Updates for performance
    if (playerRef.current) {
      playerRef.current.style.transform = `translateY(${playerY.current}px)`;
    }

    if (obstaclesRef.current) {
      obstaclesRef.current.innerHTML = obstacles.current
        .map(
          (obs) => `
        <div style="position:absolute; left:${obs.x}px; top:${GROUND_Y + 60 - OBSTACLE_HEIGHT}px; width:${OBSTACLE_WIDTH}px; height:${OBSTACLE_HEIGHT}px; background:#ef4444; border:3px solid #7f1d1d; border-radius:8px;">
          <div style="position:absolute; top:-35px; left:50%; transform:translateX(-50%); background:white; padding:4px 10px; border-radius:12px; font-weight:900; font-size:16px; color:#1e1b4b; border:2px solid #e2e8f0; white-space:nowrap; box-shadow:0 4px 6px rgba(0,0,0,0.1);">
            ${obs.word}
          </div>
        </div>
      `
        )
        .join("");
    }

    gameLoopId.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    if (isPlaying && !isGameOver && !hasWon) {
      gameLoopId.current = requestAnimationFrame(update);
    }
    return () => {
      if (gameLoopId.current) cancelAnimationFrame(gameLoopId.current);
    };
  }, [isPlaying, isGameOver, hasWon]);

  return (
    <div 
      className="relative w-full max-w-3xl h-[400px] bg-white rounded-3xl border-4 border-indigo-100 shadow-2xl overflow-hidden cursor-pointer select-none"
      onTouchStart={handleJump}
      onMouseDown={handleJump}
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-sky-50/50 flex items-center justify-center">
        <div className="text-indigo-100 font-black text-9xl rotate-12 opacity-20">JUMP</div>
      </div>
      
      {/* Floor Line */}
      <div className="absolute bottom-[60px] w-full h-2 bg-indigo-100 rounded-full mx-auto left-0 right-0 max-w-[95%]" />
      
      {/* Score UI */}
      <div className="absolute top-6 left-8 z-30">
        <div className="text-indigo-900 font-black text-3xl drop-shadow-sm">
          WORDS: {score} / {words.length}
        </div>
      </div>

      {/* Game Stage */}
      <div className="absolute inset-0">
        {/* Player */}
        <div 
          ref={playerRef}
          style={{ 
            position: "absolute", 
            left: PLAYER_X, 
            top: 0, 
            width: 60, 
            height: 60,
            zIndex: 20,
            transform: `translateY(${playerY.current}px)`
          }}
        >
          <PixelVocabmon level={currentLevel} className="scale-75" />
        </div>

        {/* Obstacles Container */}
        <div ref={obstaclesRef} className="absolute inset-0 z-10"></div>
      </div>

      {/* Overlays */}
      {!isPlaying && !isGameOver && !hasWon && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40 flex flex-col items-center justify-center text-white">
          <div className="text-6xl mb-4 animate-bounce">🦖</div>
          <h2 className="text-4xl font-black mb-2">Dino Jump!</h2>
          <p className="text-xl font-bold opacity-80">Tap to Jump over the words!</p>
        </div>
      )}

      {isGameOver && !hasWon && (
        <div className="absolute inset-0 bg-red-600/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white p-8 text-center animate-fade-in">
          <div className="text-7xl mb-4 animate-bounce">💥</div>
          <h2 className="text-5xl font-black mb-2 uppercase italic tracking-tighter">Oh no!</h2>
          <div className="bg-white/20 rounded-2xl p-6 mb-8 w-full max-w-xs">
            <div className="text-sm font-black uppercase tracking-widest opacity-70">Words Jumped</div>
            <div className="text-6xl font-black mb-2">{score}</div>
          </div>
          <p className="text-2xl font-black animate-pulse">Tap to try your last attempt! 🏃</p>
        </div>
      )}

      {hasWon && (
        <div className="absolute inset-0 bg-emerald-500/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white p-8 text-center animate-fade-in">
          <div className="text-7xl mb-4 animate-bounce">🏆</div>
          <h2 className="text-5xl font-black mb-2 uppercase italic">You Win!</h2>
          <p className="text-xl font-bold mb-8">You passed all {words.length} words!</p>
          <Link href="/" className="bg-white text-emerald-600 font-black py-4 px-8 rounded-xl shadow-lg active:scale-95 transition-all">
            Return Victorious! 👑
          </Link>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
