"use client";
import { useState, useEffect } from "react";

export default function PixelVocabmon({
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

  // --- AUDIO & EATING ANIMATION ---
  useEffect(() => {
    if (feedTrigger > 0) {
      const playExpSound = () => {
        try {
          const AudioContextClass =
            window.AudioContext ||
            (
              window as Window & {
                webkitAudioContext?: typeof window.AudioContext;
              }
            ).webkitAudioContext;
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

  // --- RANDOMIZED BLINKING ANIMATION ---
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 3500);

    return () => clearInterval(blinkInterval);
  }, []);

  const safeLevel = Math.min(Math.max(level, 1), 8);

  const renderEyes = (
    x1: number,
    x2: number,
    y: number,
    color = "#0f172a",
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
      case 1: // Lv1: Baby Slime
        return (
          <>
            <rect x="5" y="8" width="6" height="4" fill="#10B981" />
            <rect x="4" y="9" width="8" height="3" fill="#10B981" />
            <rect x="6" y="7" width="4" height="1" fill="#34d399" />
            {renderEyes(5, 9, 9)}
          </>
        );
      case 2: // Lv2: Earth Sprout
        return (
          <>
            <rect x="5" y="7" width="6" height="5" fill="#10B981" />
            <rect x="4" y="8" width="8" height="4" fill="#047857" />
            <g
              className="animate-wiggle"
              style={{ transformOrigin: "8px 5px" }}
            >
              <rect x="7" y="4" width="2" height="3" fill="#064e3b" />
              <rect x="8" y="3" width="2" height="2" fill="#34d399" />
            </g>
            {renderEyes(5, 9, 8)}
          </>
        );
      case 3: // Lv3: Swamp Biped
        return (
          <>
            <rect x="4" y="6" width="8" height="6" fill="#10B981" />
            <rect x="3" y="7" width="10" height="4" fill="#047857" />
            <rect x="6" y="8" width="4" height="4" fill="#34d399" />
            <rect
              x="1"
              y="4"
              width="2"
              height="2"
              fill="#6ee7b7"
              className="animate-float-fast"
            />
            <rect
              x="13"
              y="6"
              width="1"
              height="1"
              fill="#6ee7b7"
              className="animate-float-slow"
            />
            <rect x="4" y="12" width="2" height="2" fill="#064e3b" />
            <rect x="10" y="12" width="2" height="2" fill="#064e3b" />
            {renderEyes(4, 10, 8)}
          </>
        );
      case 4: // Lv4: Forest Wolf
        return (
          <>
            <rect x="4" y="5" width="8" height="7" fill="#10B981" />
            <rect x="3" y="6" width="11" height="5" fill="#047857" />
            <rect x="12" y="7" width="2" height="3" fill="#34d399" />
            <rect x="4" y="3" width="2" height="2" fill="#064e3b" />
            <rect x="10" y="3" width="2" height="2" fill="#064e3b" />
            <g className="animate-flicker">
              <rect x="0" y="7" width="3" height="3" fill="#34d399" />
              <rect x="0" y="5" width="2" height="2" fill="#6ee7b7" />
            </g>
            <rect x="5" y="12" width="2" height="2" fill="#064e3b" />
            <rect x="9" y="12" width="2" height="2" fill="#064e3b" />
            {renderEyes(5, 9, 6)}
          </>
        );
      case 5: // Lv5: Armored Forest Beetle
        return (
          <>
            <rect x="3" y="4" width="10" height="8" fill="#10B981" />
            <rect x="2" y="5" width="12" height="6" fill="#047857" />
            <rect x="6" y="2" width="4" height="2" fill="#064e3b" />
            <rect x="7" y="1" width="2" height="1" fill="#064e3b" />
            <rect x="1" y="6" width="2" height="4" fill="#064e3b" />
            <rect x="13" y="6" width="2" height="4" fill="#064e3b" />
            <rect x="4" y="12" width="3" height="2" fill="#064e3b" />
            <rect x="9" y="12" width="3" height="2" fill="#064e3b" />
            {renderEyes(5, 9, 7)}
          </>
        );
      case 6: // Lv6: Vine Golem
        return (
          <>
            <rect x="4" y="2" width="8" height="10" fill="#10B981" />
            <rect x="2" y="4" width="12" height="5" fill="#047857" />
            <rect x="1" y="5" width="3" height="8" fill="#064e3b" />
            <rect x="12" y="5" width="3" height="8" fill="#064e3b" />
            <rect
              x="2"
              y="7"
              width="2"
              height="1"
              fill="#6ee7b7"
              className="animate-pulse"
            />
            <rect
              x="1"
              y="10"
              width="2"
              height="1"
              fill="#6ee7b7"
              className="animate-pulse"
            />
            <rect
              x="12"
              y="8"
              width="2"
              height="1"
              fill="#6ee7b7"
              className="animate-pulse"
            />
            <rect
              x="13"
              y="11"
              width="2"
              height="1"
              fill="#6ee7b7"
              className="animate-pulse"
            />
            <rect x="6" y="3" width="4" height="1" fill="#34d399" />
            <rect x="5" y="12" width="2" height="3" fill="#064e3b" />
            <rect x="9" y="12" width="2" height="3" fill="#064e3b" />
            {renderEyes(5, 9, 6)}
          </>
        );
      case 7: // Lv7: Verdant Guardian (NEW: Proto-Dragon)
        return (
          <>
            {/* Proto-Wings / Mantle */}
            <g className="animate-float-slow">
              <rect x="0" y="3" width="3" height="7" fill="#34d399" />
              <rect x="13" y="3" width="3" height="7" fill="#34d399" />
              <rect x="-1" y="4" width="2" height="4" fill="#6ee7b7" />
              <rect x="15" y="4" width="2" height="4" fill="#6ee7b7" />
            </g>

            {/* Massive Sweeping Horns */}
            <rect x="3" y="0" width="2" height="3" fill="#064e3b" />
            <rect x="11" y="0" width="2" height="3" fill="#064e3b" />
            <rect x="2" y="-1" width="2" height="2" fill="#064e3b" />
            <rect x="12" y="-1" width="2" height="2" fill="#064e3b" />

            {/* Main Beast Body */}
            <rect x="3" y="3" width="10" height="9" fill="#10B981" />
            <rect x="2" y="5" width="12" height="6" fill="#047857" />

            {/* Glowing Chest Core */}
            <rect
              x="7"
              y="9"
              width="2"
              height="2"
              fill="#6ee7b7"
              className="animate-pulse"
            />

            {/* Strong Legs */}
            <rect x="3" y="12" width="3" height="3" fill="#064e3b" />
            <rect x="10" y="12" width="3" height="3" fill="#064e3b" />

            {/* Fierce Yellow Eyes */}
            {renderEyes(5, 9, 5, "#facc15", true)}
          </>
        );
      case 8: // Lv8: Emerald Dragon
        return (
          <>
            <g className="animate-flap" style={{ transformOrigin: "8px 8px" }}>
              <rect
                x="-2"
                y="0"
                width="5"
                height="10"
                fill="#6ee7b7"
                opacity="0.8"
              />
              <rect
                x="13"
                y="0"
                width="5"
                height="10"
                fill="#6ee7b7"
                opacity="0.8"
              />
            </g>
            <rect x="5" y="0" width="1" height="2" fill="#064e3b" />
            <rect x="7" y="0" width="2" height="2" fill="#064e3b" />
            <rect x="10" y="0" width="1" height="2" fill="#064e3b" />
            <rect x="5" y="2" width="6" height="1" fill="#047857" />
            <rect x="4" y="3" width="8" height="9" fill="#10B981" />
            <rect x="3" y="5" width="10" height="6" fill="#047857" />
            <rect x="6" y="8" width="4" height="4" fill="#34d399" />
            <rect x="4" y="12" width="3" height="3" fill="#064e3b" />
            <rect x="9" y="12" width="3" height="3" fill="#064e3b" />
            {renderEyes(4, 10, 5, "#ef4444", true)}
          </>
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
        @keyframes float-fast { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }
        @keyframes flicker { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(0.9) translateY(-1px); } }
        @keyframes flap { 0%, 100% { transform: scaleX(1); } 50% { transform: scaleX(0.3); } }
        @keyframes wiggle { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-10deg); } 75% { transform: rotate(10deg); } }

        .animate-breathe { animation: squish-breathe 2s ease-in-out infinite; }
        .animate-jump { animation: happy-jump 0.6s ease-in-out; }
        .exp-float { animation: float-up 1s ease-out forwards; position: absolute; font-weight: 900; color: #10B981; text-shadow: 0 2px 4px rgba(0,0,0,0.1); z-index: 50; top: -20px; }
        
        .animate-float-slow { animation: float-slow 3s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 1.5s ease-in-out infinite; }
        .animate-flicker { animation: flicker 0.2s ease-in-out infinite; }
        .animate-flap { animation: flap 1s ease-in-out infinite; }
        .animate-wiggle { animation: wiggle 2s ease-in-out infinite; }
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
          viewBox="-3 -2 22 20"
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
