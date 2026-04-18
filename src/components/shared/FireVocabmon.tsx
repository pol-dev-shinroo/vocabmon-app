"use client";
import { useState, useEffect } from "react";

export default function FireVocabmon({
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
      case 1: // Lv1: Ember
        return (
          <>
            <g className="animate-float-slow">
              <rect x="6" y="6" width="4" height="6" fill="#ef4444" />
              <rect x="5" y="8" width="6" height="3" fill="#f97316" />
              <rect
                x="7"
                y="4"
                width="2"
                height="2"
                fill="#facc15"
                className="animate-flicker"
              />
              {renderEyes(6, 8, 7, "#450a0a")}
            </g>
          </>
        );
      case 2: // Lv2: Magma Shell
        return (
          <>
            <rect x="4" y="6" width="8" height="6" fill="#292524" />
            <rect x="3" y="7" width="10" height="4" fill="#44403c" />
            <rect
              x="6"
              y="7"
              width="4"
              height="1"
              fill="#ea580c"
              className="animate-pulse"
            />
            <rect x="5" y="9" width="2" height="1" fill="#ea580c" />
            <rect
              x="7"
              y="4"
              width="2"
              height="2"
              fill="#f97316"
              className="animate-flicker"
            />
            {renderEyes(5, 9, 8, "#facc15", true)}
          </>
        );
      case 3: // Lv3: Flame Fox Fledgling
        return (
          <>
            {/* Flickering Tail */}
            <g
              className="animate-wiggle"
              style={{ transformOrigin: "12px 11px" }}
            >
              <rect x="10" y="9" width="4" height="3" fill="#f97316" />
              <rect
                x="12"
                y="8"
                width="3"
                height="2"
                fill="#facc15"
                className="animate-flicker"
              />
            </g>

            {/* Big Ears */}
            <rect x="3" y="2" width="3" height="4" fill="#b91c1c" />
            <rect x="10" y="2" width="3" height="4" fill="#b91c1c" />
            <rect x="4" y="3" width="1" height="2" fill="#facc15" />
            <rect x="11" y="3" width="1" height="2" fill="#facc15" />

            {/* Head */}
            <rect x="3" y="5" width="10" height="6" fill="#dc2626" />
            <rect x="4" y="8" width="8" height="3" fill="#ef4444" />

            {/* Fluffy Fire Cheeks */}
            <rect x="1" y="7" width="2" height="3" fill="#f97316" />
            <rect x="13" y="7" width="2" height="3" fill="#f97316" />

            {/* Small Body */}
            <rect x="5" y="11" width="6" height="3" fill="#b91c1c" />

            {/* Glowing Core/Belly */}
            <rect x="6" y="11" width="4" height="2" fill="#ea580c" />

            {/* Tiny Paws */}
            <rect x="4" y="14" width="2" height="1" fill="#450a0a" />
            <rect x="10" y="14" width="2" height="1" fill="#450a0a" />

            {/* Bright Eyes */}
            {renderEyes(5, 9, 7, "#fef08a", true)}
          </>
        );
      case 4: // Lv4: Blaze Hound
        return (
          <>
            <rect x="4" y="5" width="8" height="6" fill="#dc2626" />
            <rect x="3" y="6" width="10" height="4" fill="#b91c1c" />
            <g className="animate-flicker">
              <rect x="3" y="2" width="6" height="4" fill="#f97316" />
              <rect x="4" y="1" width="4" height="2" fill="#facc15" />
            </g>
            <rect x="12" y="4" width="2" height="3" fill="#f97316" />
            <rect x="5" y="11" width="2" height="2" fill="#7f1d1d" />
            <rect x="9" y="11" width="2" height="2" fill="#7f1d1d" />
            {renderEyes(5, 9, 6, "#fef08a", true)}
          </>
        );
      case 5: // Lv5: Inferno Brawler
        return (
          <>
            <rect x="3" y="4" width="10" height="8" fill="#b91c1c" />
            <rect x="2" y="5" width="12" height="4" fill="#991b1b" />
            <rect x="6" y="6" width="4" height="4" fill="#ea580c" />
            <rect
              x="7"
              y="7"
              width="2"
              height="2"
              fill="#facc15"
              className="animate-pulse"
            />
            <rect x="1" y="4" width="2" height="6" fill="#7f1d1d" />
            <rect x="13" y="4" width="2" height="6" fill="#7f1d1d" />
            <g className="animate-flicker">
              <rect x="6" y="2" width="4" height="2" fill="#f97316" />
              <rect x="7" y="1" width="2" height="1" fill="#facc15" />
            </g>
            <rect x="4" y="12" width="3" height="2" fill="#450a0a" />
            <rect x="9" y="12" width="3" height="2" fill="#450a0a" />
            {renderEyes(5, 9, 4, "#fef08a", true)}
          </>
        );
      case 6: // Lv6: Molten Giant
        return (
          <>
            <rect x="4" y="2" width="8" height="10" fill="#44403c" />
            <rect x="2" y="3" width="12" height="4" fill="#292524" />
            <rect x="1" y="4" width="2" height="7" fill="#1c1917" />
            <rect x="13" y="4" width="2" height="7" fill="#1c1917" />
            <rect
              x="5"
              y="4"
              width="1"
              height="4"
              fill="#ea580c"
              className="animate-pulse"
            />
            <rect
              x="10"
              y="3"
              width="1"
              height="5"
              fill="#ea580c"
              className="animate-pulse"
            />
            <rect
              x="7"
              y="6"
              width="2"
              height="3"
              fill="#facc15"
              className="animate-pulse"
            />
            <rect
              x="7"
              y="1"
              width="2"
              height="1"
              fill="#f97316"
              className="animate-flicker"
            />
            <rect x="5" y="12" width="2" height="3" fill="#1c1917" />
            <rect x="9" y="12" width="2" height="3" fill="#1c1917" />
            {renderEyes(5, 9, 3, "#facc15", true)}
          </>
        );
      case 7: // Lv7: Phoenix Fledgling
        return (
          <>
            <g className="animate-flap" style={{ transformOrigin: "8px 6px" }}>
              <rect
                x="0"
                y="4"
                width="4"
                height="5"
                fill="#f97316"
                opacity="0.9"
              />
              <rect
                x="12"
                y="4"
                width="4"
                height="5"
                fill="#f97316"
                opacity="0.9"
              />
              <rect x="-1" y="5" width="2" height="3" fill="#facc15" />
              <rect x="15" y="5" width="2" height="3" fill="#facc15" />
            </g>
            <g className="animate-float-slow">
              <rect x="4" y="3" width="8" height="7" fill="#ef4444" />
              <rect x="5" y="2" width="6" height="2" fill="#dc2626" />
              <rect x="6" y="10" width="4" height="3" fill="#f97316" />
              <rect
                x="7"
                y="13"
                width="2"
                height="2"
                fill="#facc15"
                className="animate-flicker"
              />
              <rect
                x="7"
                y="0"
                width="2"
                height="2"
                fill="#facc15"
                className="animate-flicker"
              />
              {renderEyes(5, 9, 4, "#1c1917")}
              <rect x="7" y="5" width="2" height="1" fill="#facc15" />
            </g>
          </>
        );
      case 8: // Lv8: Solar Flare Phoenix
        return (
          <>
            <g className="animate-flap" style={{ transformOrigin: "8px 6px" }}>
              <rect
                x="-3"
                y="1"
                width="6"
                height="10"
                fill="#ea580c"
                opacity="0.8"
              />
              <rect
                x="13"
                y="1"
                width="6"
                height="10"
                fill="#ea580c"
                opacity="0.8"
              />
              <rect
                x="-4"
                y="3"
                width="3"
                height="6"
                fill="#facc15"
                opacity="0.9"
              />
              <rect
                x="17"
                y="3"
                width="3"
                height="6"
                fill="#facc15"
                opacity="0.9"
              />
            </g>
            <g className="animate-float-fast">
              <rect x="4" y="2" width="8" height="8" fill="#b91c1c" />
              <rect x="5" y="1" width="6" height="2" fill="#991b1b" />
              <rect x="6" y="10" width="4" height="4" fill="#ea580c" />
              <rect
                x="7"
                y="14"
                width="2"
                height="3"
                fill="#facc15"
                className="animate-flicker"
              />
              <rect
                x="6"
                y="-2"
                width="4"
                height="3"
                fill="#facc15"
                className="animate-flicker"
              />
              <rect x="7" y="4" width="2" height="2" fill="#facc15" />
              {renderEyes(5, 9, 3, "#ffffff", true)}
            </g>
          </>
        );
      case 9: // Lv9: Supernova Spirit
        return (
          <>
            <g className="animate-float-slow">
              <rect
                x="-2"
                y="5"
                width="2"
                height="6"
                fill="#fde047"
                opacity="0.7"
              />
              <rect
                x="16"
                y="5"
                width="2"
                height="6"
                fill="#fde047"
                opacity="0.7"
              />
              <rect
                x="0"
                y="3"
                width="2"
                height="2"
                fill="#facc15"
                opacity="0.8"
              />
              <rect
                x="14"
                y="3"
                width="2"
                height="2"
                fill="#facc15"
                opacity="0.8"
              />
            </g>
            <g className="animate-float-fast">
              <rect x="2" y="3" width="12" height="10" fill="#ea580c" />
              <rect x="4" y="1" width="8" height="2" fill="#f97316" />
              <rect
                x="6"
                y="-1"
                width="4"
                height="2"
                fill="#facc15"
                className="animate-flicker"
              />
              <rect x="5" y="13" width="6" height="3" fill="#f97316" />
              <rect
                x="7"
                y="16"
                width="2"
                height="2"
                fill="#facc15"
                className="animate-flicker"
              />
              <rect
                x="6"
                y="6"
                width="4"
                height="4"
                fill="#fef08a"
                className="animate-pulse"
              />
              <rect
                x="7"
                y="7"
                width="2"
                height="2"
                fill="#ffffff"
                className="animate-pulse"
              />
              {renderEyes(4, 10, 4, "#ffffff", true)}
            </g>
          </>
        );
      case 10: // Lv10: Obsidian Ifrit
        return (
          <>
            <g className="animate-flap" style={{ transformOrigin: "8px 8px" }}>
              <rect
                x="-5"
                y="-3"
                width="7"
                height="12"
                fill="#b91c1c"
                opacity="0.9"
              />
              <rect
                x="14"
                y="-3"
                width="7"
                height="12"
                fill="#b91c1c"
                opacity="0.9"
              />
              <rect
                x="-3"
                y="-1"
                width="4"
                height="8"
                fill="#ea580c"
                opacity="0.8"
              />
              <rect
                x="15"
                y="-1"
                width="4"
                height="8"
                fill="#ea580c"
                opacity="0.8"
              />
              <rect
                x="-1"
                y="1"
                width="2"
                height="4"
                fill="#facc15"
                opacity="0.9"
              />
              <rect
                x="15"
                y="1"
                width="2"
                height="4"
                fill="#facc15"
                opacity="0.9"
              />
            </g>
            <rect x="2" y="2" width="12" height="11" fill="#1c1917" />
            <rect x="1" y="4" width="14" height="5" fill="#292524" />
            <rect x="5" y="5" width="6" height="5" fill="#44403c" />
            <rect x="6" y="6" width="4" height="3" fill="#ea580c" />
            <rect
              x="7"
              y="7"
              width="2"
              height="1"
              fill="#facc15"
              className="animate-pulse"
            />
            <rect x="3" y="-2" width="2" height="4" fill="#991b1b" />
            <rect x="11" y="-2" width="2" height="4" fill="#991b1b" />
            <rect x="2" y="-4" width="1" height="2" fill="#dc2626" />
            <rect x="13" y="-4" width="1" height="2" fill="#dc2626" />
            <rect x="2" y="13" width="4" height="3" fill="#1c1917" />
            <rect x="10" y="13" width="4" height="3" fill="#1c1917" />
            {renderEyes(4, 10, 3, "#facc15", true)}
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
        .exp-float { animation: float-up 1s ease-out forwards; position: absolute; font-weight: 900; color: #f97316; text-shadow: 0 2px 4px rgba(0,0,0,0.1); z-index: 50; top: -20px; }
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
