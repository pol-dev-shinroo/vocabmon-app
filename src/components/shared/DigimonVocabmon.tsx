"use client";
import { useState, useEffect } from "react";

export default function DigimonVocabmon({
  className = "",
  feedTrigger = 0,
  level = 1,
}: {
  className?: string;
  feedTrigger?: number;
  level?: number;
}) {
  const [isEating, setIsEating] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [expPopups, setExpPopups] = useState<{ id: number }[]>([]);

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
      case 1: // Lv1: Digi-Egg
        return (
          <g className="animate-float-slow">
            <rect x="5" y="4" width="6" height="10" fill="#f8fafc" />
            <rect x="4" y="6" width="8" height="6" fill="#f8fafc" />
            <rect x="6" y="7" width="2" height="2" fill="#3b82f6" />
            <rect x="8" y="9" width="2" height="2" fill="#3b82f6" />
          </g>
        );
      case 2: // Lv2: Botamon
        return (
          <g className="animate-float-slow">
            <rect x="4" y="8" width="8" height="6" fill="#1e293b" />
            <rect x="3" y="10" width="10" height="4" fill="#1e293b" />
            {renderEyes(5, 9, 10, "#fb7185", true)}
          </g>
        );
      case 3: // Lv3: Koromon
        return (
          <g className="animate-float-slow">
            <rect x="4" y="6" width="8" height="8" fill="#fda4af" />
            <rect x="3" y="8" width="10" height="4" fill="#fda4af" />
            <rect x="2" y="4" width="2" height="4" fill="#fda4af" />
            <rect x="12" y="4" width="2" height="4" fill="#fda4af" />
            {renderEyes(5, 9, 8, "#000000")}
          </g>
        );
      case 4: // Lv4: Agumon
        return (
          <g className="animate-float-slow">
            <rect x="5" y="4" width="6" height="6" fill="#f97316" />
            <rect x="4" y="10" width="8" height="4" fill="#f97316" />
            <rect x="3" y="12" width="2" height="2" fill="#f97316" />
            <rect x="11" y="12" width="2" height="2" fill="#f97316" />
            <rect x="6" y="8" width="4" height="2" fill="#fff7ed" />
            {renderEyes(5, 9, 6, "#000000")}
          </g>
        );
      case 5: // Lv5: Greymon
        return (
          <g className="animate-float-slow">
            <rect x="4" y="10" width="10" height="4" fill="#f97316" />
            <rect x="6" y="4" width="6" height="6" fill="#78350f" />
            <rect x="5" y="6" width="8" height="3" fill="#78350f" />
            <rect x="8" y="2" width="2" height="2" fill="#78350f" />
            <rect x="3" y="12" width="2" height="2" fill="#78350f" />
            {renderEyes(6, 10, 7, "#ef4444", true)}
          </g>
        );
      case 6: // Lv6: MetalGreymon
        return (
          <g className="animate-float-slow">
            <rect x="4" y="10" width="10" height="4" fill="#f97316" />
            <rect x="6" y="4" width="6" height="6" fill="#94a3b8" />
            <rect x="1" y="6" width="4" height="4" fill="#a855f7" />
            <rect x="13" y="6" width="4" height="4" fill="#a855f7" />
            {renderEyes(6, 10, 7, "#ef4444", true)}
          </g>
        );
      case 7: // Lv7: WarGreymon
        return (
          <g className="animate-float-slow">
            <rect x="6" y="4" width="4" height="4" fill="#facc15" />
            <rect x="4" y="8" width="8" height="6" fill="#facc15" />
            <rect x="3" y="9" width="2" height="4" fill="#94a3b8" />
            <rect x="11" y="9" width="2" height="4" fill="#94a3b8" />
            <rect x="5" y="2" width="6" height="2" fill="#94a3b8" />
            {renderEyes(6, 8, 5, "#ef4444", true)}
          </g>
        );
      case 8: // Lv8: Omnimon
        return (
          <g className="animate-float-slow">
            <rect x="6" y="4" width="4" height="4" fill="#ffffff" />
            <rect x="5" y="8" width="6" height="6" fill="#ffffff" />
            <rect x="2" y="6" width="3" height="6" fill="#f97316" />
            <rect x="11" y="6" width="3" height="6" fill="#3b82f6" />
            <rect x="4" y="2" width="8" height="2" fill="#475569" />
            {renderEyes(6, 8, 5, "#3b82f6", true)}
          </g>
        );
      case 9: // Lv9: Imperialdramon
        return (
          <g className="animate-float-slow">
            <rect x="4" y="8" width="8" height="6" fill="#1e3a8a" />
            <rect x="3" y="6" width="10" height="4" fill="#1e3a8a" />
            <rect x="1" y="4" width="4" height="4" fill="#000000" />
            <rect x="11" y="4" width="4" height="4" fill="#000000" />
            <rect x="6" y="2" width="4" height="4" fill="#ef4444" />
            {renderEyes(5, 9, 7, "#facc15", true)}
          </g>
        );
      case 10: // Lv10: Gallantmon
        return (
          <g className="animate-float-slow">
            <rect x="5" y="4" width="6" height="6" fill="#ffffff" />
            <rect x="4" y="10" width="8" height="6" fill="#dc2626" />
            <rect x="2" y="8" width="3" height="4" fill="#ffffff" />
            <rect x="11" y="8" width="3" height="4" fill="#facc15" />
            <rect x="7" y="0" width="2" height="4" fill="#dc2626" />
            {renderEyes(6, 8, 6, "#facc15", true)}
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-end ${className}`}
    >
      <style>{`
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
          className="drop-shadow-xl overflow-visible"
        >
          {renderSprite()}
        </svg>
      </div>
      <div className="absolute bottom-0 w-24 h-3 bg-black/10 rounded-full blur-[2px]"></div>
    </div>
  );
}
