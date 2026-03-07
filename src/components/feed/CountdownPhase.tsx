import { useState, useEffect } from "react";

export default function CountdownPhase({ onFinish }: { onFinish: () => void }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    // Classic Arcade Beep Generator embedded in the effect
    const playBeep = (type: "short" | "long") => {
      try {
        // FIX: Replaced `any` with a proper TypeScript intersection type
        const AudioContextClass =
          window.AudioContext ||
          (
            window as typeof window & {
              webkitAudioContext?: typeof window.AudioContext;
            }
          ).webkitAudioContext;

        if (!AudioContextClass) return;

        const audioCtx = new AudioContextClass();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = "square"; // Retro 8-bit sound
        // Low pitch for 3-2-1, High pitch for GO
        oscillator.frequency.setValueAtTime(
          type === "short" ? 440 : 880,
          audioCtx.currentTime,
        );

        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + (type === "short" ? 0.15 : 0.4));
      } catch (e) {
        console.log("Audio API blocked or not supported", e);
      }
    };

    // Trigger the appropriate sound based on the current count
    if (count > 0) {
      playBeep("short");
    } else if (count === 0) {
      playBeep("long");
    }

    if (count < 0) {
      onFinish();
      return;
    }

    const timer = setTimeout(() => setCount((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, onFinish]);

  return (
    <div className="w-full max-w-md text-center flex flex-col items-center justify-center min-h-[50vh]">
      <style>{`
        @keyframes pop-in {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop { animation: pop-in 0.4s ease-out forwards; }
      `}</style>
      <h2 className="text-3xl font-bold text-gray-800 mb-8 tracking-wide">
        Get Ready!
      </h2>
      <div
        key={count}
        className={`font-black text-indigo-600 animate-pop ${count > 0 ? "text-9xl" : "text-7xl"}`}
      >
        {count > 0 ? count : "Begin!"}
      </div>
    </div>
  );
}
