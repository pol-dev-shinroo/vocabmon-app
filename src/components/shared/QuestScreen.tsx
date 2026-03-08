import { useEffect, useState } from "react";
import Link from "next/link";
import PixelVocabmon from "./PixelVocabmon";

type Theme = "indigo" | "emerald" | "blue";
type AudioType = "victory" | "sword" | "none";

interface QuestScreenProps {
  type: "intro" | "transition" | "encouragement";
  theme?: Theme;
  icon?: "vocabmon" | string;
  title: string;
  subtitle?: string; // Used specifically for the transition box
  description: React.ReactNode;
  buttonText: string;
  onNext: () => void;
  showCancel?: boolean;
  audio?: AudioType;
}

const themeColors = {
  indigo: {
    border: "border-indigo-100",
    text: "text-indigo-600",
    textDark: "text-indigo-800",
    bgLight: "bg-indigo-50",
    button: "bg-indigo-600 hover:bg-indigo-700",
  },
  emerald: {
    border: "border-emerald-100",
    text: "text-emerald-600",
    textDark: "text-emerald-800",
    bgLight: "bg-emerald-50",
    button: "bg-emerald-500 hover:bg-emerald-600",
  },
  blue: {
    border: "border-blue-100",
    text: "text-blue-600",
    textDark: "text-blue-800",
    bgLight: "bg-blue-50",
    button: "bg-blue-500 hover:bg-blue-600",
  },
};

export default function QuestScreen({
  type,
  theme = "indigo",
  icon,
  title,
  subtitle,
  description,
  buttonText,
  onNext,
  showCancel = false,
  audio = "none",
}: QuestScreenProps) {
  const colors = themeColors[theme];

  const [currentLevel, setCurrentLevel] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedExp = parseInt(
        localStorage.getItem("vocabmon_exp") || "0",
        10,
      );
      const rawLevel = Math.floor(savedExp / 150) + 1;
      setCurrentLevel(Math.min(rawLevel, 8));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (audio === "none") return;

    try {
      const AudioContextClass =
        window.AudioContext ||
        (
          window as typeof window & {
            webkitAudioContext?: typeof window.AudioContext;
          }
        ).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      if (audio === "victory") {
        const playNote = (
          freq: number,
          startTime: number,
          duration: number,
        ) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.value = freq;
          osc.connect(gain);
          gain.connect(ctx.destination);
          gain.gain.setValueAtTime(0, startTime);
          gain.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
          gain.gain.setValueAtTime(0.1, startTime + duration - 0.1);
          gain.gain.linearRampToValueAtTime(0, startTime + duration);
          osc.start(startTime);
          osc.stop(startTime + duration);
        };
        playNote(523.25, now, 0.15); // C5
        playNote(659.25, now + 0.15, 0.15); // E5
        playNote(783.99, now + 0.3, 0.15); // G5
        playNote(1046.5, now + 0.45, 0.4); // C6
      } else if (audio === "sword") {
        const freqs = [1200, 2043, 3102, 4500];
        freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.value = freq;
          osc.connect(gain);
          gain.connect(ctx.destination);
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.03, now + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
          osc.start(now);
          osc.stop(now + 0.5);
        });

        const bufferSize = ctx.sampleRate * 0.1;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = "highpass";
        noiseFilter.frequency.value = 4000;
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0, now);
        noiseGain.gain.linearRampToValueAtTime(0.04, now + 0.01);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start(now);
      }
    } catch (e) {
      console.log("Audio API blocked", e);
    }
  }, [audio]);

  // --- NEW: THE MAGIC iOS AUDIO UNLOCKER ---
  const handleNextClick = () => {
    // 1. Unlock the Speech Synthesis Engine (Robot Voice)
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const silentUtterance = new SpeechSynthesisUtterance("");
      silentUtterance.volume = 0; // 100% silent
      window.speechSynthesis.speak(silentUtterance);
    }

    // 2. Unlock the Web Audio API Engine (Sound effects/beeps)
    try {
      const AudioContextClass =
        window.AudioContext ||
        (
          window as typeof window & {
            webkitAudioContext?: typeof window.AudioContext;
          }
        ).webkitAudioContext;

      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        gain.gain.value = 0; // 100% silent
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(0);
        osc.stop(ctx.currentTime + 0.1);
      }
    } catch (e) {
      console.log("Could not unlock audio", e);
    }

    // Now proceed to the next screen! The iPad will allow auto-play from here on out.
    onNext();
  };

  return (
    <div
      className={`w-full max-w-md text-center bg-white p-8 rounded-3xl shadow-sm border ${colors.border} animate-fade-in flex flex-col items-center`}
    >
      <div
        className={`${icon === "vocabmon" ? "mb-6" : "text-7xl mb-6 animate-bounce"}`}
      >
        {icon === "vocabmon" ? <PixelVocabmon level={currentLevel} /> : icon}
      </div>

      <h1 className="text-3xl font-black text-gray-900 mb-2">{title}</h1>

      {type === "transition" ? (
        <div
          className={`${colors.bgLight} border ${colors.border} rounded-xl p-6 mb-8 w-full`}
        >
          <h3 className={`text-xl font-bold ${colors.textDark} mb-2`}>
            {subtitle}
          </h3>
          <p className={`${colors.text} font-medium leading-relaxed`}>
            {description}
          </p>
        </div>
      ) : (
        <p className="text-gray-500 mb-8 font-medium leading-relaxed">
          {description}
        </p>
      )}

      {/* Attach the unlocker to the button! */}
      <button
        onClick={handleNextClick}
        className={`w-full ${colors.button} text-white font-bold py-4 px-4 rounded-xl text-xl transition-all shadow-md transform hover:scale-105`}
      >
        {buttonText}
      </button>

      {showCancel && (
        <Link
          href="/"
          className="inline-block mt-6 text-gray-400 hover:text-gray-600 underline font-medium"
        >
          Cancel
        </Link>
      )}
    </div>
  );
}
