import { useState, useEffect, useRef } from "react";

export default function CountdownPhase({ onFinish }: { onFinish: () => void }) {
  const [count, setCount] = useState(3);

  // FIX: Save the AudioContext in a ref so we don't recreate it inside the timeout!
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize the context exactly once when the screen loads
    const AudioContextClass =
      window.AudioContext ||
      (
        window as typeof window & {
          webkitAudioContext?: typeof window.AudioContext;
        }
      ).webkitAudioContext;

    if (AudioContextClass && !audioCtxRef.current) {
      audioCtxRef.current = new AudioContextClass();
    }
  }, []);

  useEffect(() => {
    const playBeep = (type: "short" | "long") => {
      try {
        const audioCtx = audioCtxRef.current;
        if (!audioCtx) return;

        // If iPad paused the context, wake it up!
        if (audioCtx.state === "suspended") {
          audioCtx.resume();
        }

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = "square";
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
