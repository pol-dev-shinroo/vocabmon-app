"use client";
import { useState, useEffect } from "react";

export default function DigimonVocabmon({
  className = "",
  feedTrigger = 0,
  attackTrigger = 0,
  specialTrigger = 0,
  level = 1,
}: {
  className?: string;
  feedTrigger?: number;
  attackTrigger?: number;
  specialTrigger?: number;
  level?: number;
}) {
  const [isEating, setIsEating] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);
  const [isSpecial, setIsSpecial] = useState(false);
  const [expPopups, setExpPopups] = useState<{ id: number }[]>([]);

  useEffect(() => {
    if (attackTrigger > 0) {
      setIsAttacking(true);
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.frequency.setValueAtTime(880, ctx.currentTime);
          osc.connect(gain);
          gain.connect(ctx.destination);
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
          osc.start();
          osc.stop(ctx.currentTime + 0.1);
        }
      } catch (e) {}
      const timer = setTimeout(() => setIsAttacking(false), 300);
      return () => clearTimeout(timer);
    }
  }, [attackTrigger]);

  useEffect(() => {
    if (specialTrigger > 0) {
      setIsSpecial(true);
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(220, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
          osc.start();
          osc.stop(ctx.currentTime + 0.6);
        }
      } catch (e) {}
      const timer = setTimeout(() => setIsSpecial(false), 600);
      return () => clearTimeout(timer);
    }
  }, [specialTrigger]);

  useEffect(() => {
    if (feedTrigger > 0) {
      const playExpSound = () => {
        try {
          const AudioContextClass =
            window.AudioContext ||
            (window as any).webkitAudioContext;
          if (!AudioContextClass) return;
          const ctx = new AudioContextClass();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          const now = ctx.currentTime;
          osc.frequency.setValueAtTime(987.77, now);
          osc.frequency.setValueAtTime(1318.51, now + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.1, now + 0.02);
          gain.gain.setValueAtTime(0.1, now + 0.1);
          gain.gain.linearRampToValueAtTime(0, now + 0.2);
          osc.start(now);
          osc.stop(now + 0.2);
        } catch (e) {}
      };
      playExpSound();

      const startTimer = setTimeout(() => {
        setIsEating(true);
        setExpPopups((prev) => [...prev, { id: Date.now() }]);
      }, 0);
      const endTimer = setTimeout(() => setIsEating(false), 600);

      return () => {
        clearTimeout(startTimer);
        clearTimeout(endTimer);
      };
    }
  }, [feedTrigger]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 3500);

    return () => clearInterval(blinkInterval);
  }, []);

  const safeLevel = Math.min(Math.max(level, 1), 10);

  const getAnimationClass = () => {
    if (!isAttacking && !isSpecial) return '';
    let tier = 'egg';
    if (safeLevel >= 2 && safeLevel <= 3) tier = 'baby';
    if (safeLevel >= 4 && safeLevel <= 6) tier = 'dino';
    if (safeLevel === 7) tier = 'skull';
    if (safeLevel >= 8 && safeLevel <= 9) tier = 'mega';
    if (safeLevel === 10) tier = 'omni';
    return isSpecial ? `animate-[spc-${tier}_0.6s_ease-in-out]` : `animate-[atk-${tier}_0.3s_ease-in-out]`;
  };

  const renderEyes = (
    x1: number,
    x2: number,
    y: number,
    color = "#000000",
    glow = false,
  ) => {
    if (isEating || isBlinking) {
      return (
        <>
          <rect x={x1} y={y} width="2" height="1" fill={color} />
          <rect x={x2} y={y} width="2" height="1" fill={color} />
        </>
      );
    }
    return (
      <g className={glow ? "animate-pulse" : ""}>
        <rect x={x1} y={y} width="2" height="2" fill={color} />
        <rect x={x2} y={y} width="2" height="2" fill={color} />
        <rect x={x1} y={y} width="1" height="1" fill="#ffffff" />
        <rect x={x2} y={y} width="1" height="1" fill="#ffffff" />
      </g>
    );
  };

  const renderSprite = () => {
    switch (safeLevel) {
      case 1: // Digi-Egg
        return <g className="animate-float-slow"><rect x="5" y="4" width="6" height="10" fill="#ffffff" /><rect x="4" y="6" width="8" height="6" fill="#ffffff" /><rect x="4" y="7" width="8" height="2" fill="#f97316" /></g>;
      case 2: // Botamon
        return <g className="animate-float-slow"><rect x="4" y="6" width="8" height="8" fill="#171717" /><rect x="3" y="8" width="10" height="4" fill="#171717" />{renderEyes(5, 9, 8, "#facc15", true)}</g>;
      case 3: // Koromon
        return <g className="animate-float-slow"><rect x="4" y="5" width="8" height="8" fill="#f472b6" /><rect x="3" y="7" width="10" height="4" fill="#f472b6" /><rect x="2" y="3" width="2" height="5" fill="#f472b6" /><rect x="12" y="3" width="2" height="5" fill="#f472b6" />{renderEyes(5, 9, 8, "#dc2626")}</g>;
      case 4: // Agumon
        return <g className="animate-float-slow"><rect x="4" y="2" width="8" height="6" fill="#f97316" /><rect x="5" y="8" width="6" height="6" fill="#f97316" /><rect x="3" y="10" width="2" height="2" fill="#f97316" /><rect x="11" y="10" width="2" height="2" fill="#f97316" /><rect x="5" y="14" width="2" height="2" fill="#f97316" /><rect x="9" y="14" width="2" height="2" fill="#f97316" />{renderEyes(5, 9, 4, "#22c55e")}</g>;
      case 5: // Tyrannomon
        return <g className="animate-float-slow"><rect x="4" y="2" width="8" height="12" fill="#dc2626" /><rect x="7" y="0" width="2" height="14" fill="#22c55e" opacity="0.8" /><rect x="2" y="6" width="12" height="6" fill="#dc2626" />{renderEyes(5, 9, 4, "#22c55e")}</g>;
      case 6: // Greymon
        return <g className="animate-float-slow"><rect x="3" y="1" width="10" height="6" fill="#78350f" /><rect x="7" y="-1" width="2" height="2" fill="#e5e5e5" /><rect x="2" y="0" width="2" height="3" fill="#e5e5e5" /><rect x="12" y="0" width="2" height="3" fill="#e5e5e5" /><rect x="4" y="7" width="8" height="7" fill="#f97316" /><rect x="4" y="9" width="8" height="2" fill="#3b82f6" /><rect x="3" y="14" width="3" height="2" fill="#f97316" /><rect x="10" y="14" width="3" height="2" fill="#f97316" />{renderEyes(5, 9, 4, "#ef4444", true)}</g>;
      case 7: // SkullGreymon
        return <g className="animate-float-slow"><rect x="4" y="4" width="8" height="10" fill="#e5e5e5" /><rect x="3" y="6" width="10" height="2" fill="#171717" /><rect x="7" y="0" width="2" height="4" fill="#94a3b8" /><rect x="5" y="2" width="6" height="2" fill="#94a3b8" />{renderEyes(5, 9, 5, "#dc2626", true)}</g>;
      case 8: // MetalGreymon
        return <g className="animate-float-slow"><rect x="-2" y="3" width="4" height="8" fill="#a855f7" /><rect x="14" y="3" width="4" height="8" fill="#a855f7" /><rect x="3" y="1" width="10" height="6" fill="#94a3b8" /><rect x="7" y="-1" width="2" height="2" fill="#94a3b8" /><rect x="4" y="7" width="8" height="7" fill="#f97316" /><rect x="11" y="9" width="5" height="3" fill="#94a3b8" /><rect x="3" y="14" width="3" height="2" fill="#f97316" /><rect x="10" y="14" width="3" height="2" fill="#f97316" />{renderEyes(6, 8, 4, "#ef4444", true)}</g>;
      case 9: // WarGreymon
        return <g className="animate-float-slow"><rect x="4" y="4" width="8" height="10" fill="#e5e5e5" /><rect x="4" y="4" width="8" height="3" fill="#facc15" /><rect x="0" y="5" width="4" height="6" fill="#facc15" /><rect x="12" y="5" width="4" height="6" fill="#facc15" /><rect x="5" y="14" width="2" height="2" fill="#e5e5e5" /><rect x="9" y="14" width="2" height="2" fill="#e5e5e5" />{renderEyes(6, 8, 5, "#22c55e", true)}</g>;
      case 10: // Omnimon
        return <g className="animate-float-slow"><rect x="-1" y="6" width="18" height="8" fill="#ffffff" opacity="0.8" /><rect x="6" y="0" width="4" height="4" fill="#e5e5e5" /><rect x="7" y="-2" width="2" height="2" fill="#facc15" /><rect x="5" y="4" width="6" height="8" fill="#ffffff" /><rect x="2" y="6" width="3" height="5" fill="#ea580c" /><rect x="11" y="6" width="3" height="5" fill="#3b82f6" /><rect x="5" y="12" width="2" height="4" fill="#ffffff" /><rect x="9" y="12" width="2" height="4" fill="#ffffff" />{renderEyes(6, 8, 1, "#3b82f6", true)}</g>;
      default:
        return null;
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-end ${className}`}
    >
      <style>{`
        @keyframes atk-egg { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1) translateY(-10px); } }
        @keyframes spc-egg { 0%, 100% { transform: rotate(0); filter: brightness(1); } 50% { transform: rotate(15deg) scale(1.2); filter: brightness(1.5) drop-shadow(0 0 10px yellow); } }
        @keyframes atk-baby { 0%, 100% { transform: translateX(0); } 40% { transform: translateX(-5px) scaleY(0.8); } 60% { transform: translateX(20px) scaleY(1.1); } }
        @keyframes spc-baby { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-30px) scale(1.3); filter: drop-shadow(0 0 15px pink); } }
        @keyframes atk-dino { 0%, 100% { transform: translateX(0); } 30% { transform: translateX(-10px) rotate(-5deg); } 60% { transform: translateX(40px) rotate(10deg); } }
        @keyframes spc-dino { 0%, 100% { transform: scale(1) translateX(0); } 40% { transform: scale(1.2) translateX(-10px); filter: drop-shadow(0 0 20px orange); } 70% { transform: scale(1.1) translateX(50px); filter: drop-shadow(0 0 30px red); } }
        @keyframes atk-skull { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(20px) rotate(5deg); } 40% { transform: translateX(-5px); } }
        @keyframes spc-skull { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px) scale(1.2); filter: drop-shadow(0 0 30px purple) grayscale(100%); } }
        @keyframes atk-mega { 0%, 100% { transform: translate(0,0); } 30% { transform: translate(20px, -20px) scale(1.1); } 60% { transform: translate(-10px, 10px); } }
        @keyframes spc-mega { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-40px) scale(1.4); filter: drop-shadow(0 0 40px #facc15) brightness(1.5); } }
        @keyframes atk-omni { 0%, 100% { transform: translateX(0); opacity: 1; } 20% { transform: translateX(50px); opacity: 0.5; } 40% { transform: translateX(50px); opacity: 1; } }
        @keyframes spc-omni { 0%, 100% { transform: translateX(0); } 40% { transform: translateX(-20px) scale(1.3); filter: drop-shadow(0 0 50px cyan) brightness(2); } 60% { transform: translateX(10px); filter: drop-shadow(0 0 10px blue); } }
        @keyframes squish-breathe { 0%, 100% { transform: scaleY(1) scaleX(1) translateY(0); } 50% { transform: scaleY(0.9) scaleX(1.05) translateY(6px); } }
        @keyframes happy-jump { 0%, 100% { transform: scaleY(1) scaleX(1) translateY(0); } 25% { transform: scaleY(1.2) scaleX(0.8) translateY(-15px); } 50% { transform: scaleY(0.8) scaleX(1.2) translateY(5px); } 75% { transform: scaleY(1.1) scaleX(0.9) translateY(-5px); } }
        @keyframes float-up { 0% { opacity: 1; transform: translateY(0) scale(1); } 100% { opacity: 0; transform: translateY(-40px) scale(1.2); } }
        @keyframes float-slow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-3px); } }
        .animate-breathe { animation: squish-breathe 2s ease-in-out infinite; }
        .animate-jump { animation: happy-jump 0.6s ease-in-out; }
        .exp-float { animation: float-up 1s ease-out forwards; position: absolute; font-weight: 900; color: #f97316; text-shadow: 0 2px 4px rgba(0,0,0,0.1); z-index: 50; top: -20px; }
        .animate-float-slow { animation: float-slow 3s ease-in-out infinite; }
      `}</style>

      {expPopups.map((popup) => (
        <div key={popup.id} className="exp-float text-xl">
          +15 EXP!
        </div>
      ))}

      <div
        className={`relative z-10 ${isEating ? "animate-jump" : "animate-breathe"}`}
      >
        <svg
          width="140"
          height="140"
          viewBox="-6 -6 28 24"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-xl overflow-visible ${getAnimationClass()}`}
        >
          {renderSprite()}
        </svg>
      </div>
      <div className="absolute bottom-0 w-24 h-3 bg-black/10 rounded-full blur-[2px]"></div>
    </div>
  );
}
