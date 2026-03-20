import { useState, useEffect, useRef, useCallback } from "react";
import { VocabWord } from "@/data/vocab";
import PixelVocabmon from "../shared/PixelVocabmon";
import SandTimer from "../shared/SandTimer";
import TimeoutScreen from "../shared/TimeoutScreen";

// SET YOUR DIFFICULTY HERE FOR THE SPELLING TEST (e.g., 15 seconds)
const SECONDS_PER_WORD = 15;

export default function SpellingTest({
  words,
  onFinish,
}: {
  words: VocabWord[];
  onFinish: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [feedTrigger, setFeedTrigger] = useState(0);

  const [isError, setIsError] = useState(false);
  const [flashSuccess, setFlashSuccess] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);

  // Timer states
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);

  const activeWord = words[currentIndex];
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch Vocabmon Level so the new Fire theme shows up!
  useEffect(() => {
    const timer = setTimeout(() => {
      const savedExp = parseInt(
        localStorage.getItem("vocabmon_exp") || "0",
        10,
      );
      const rawLevel = Math.floor(savedExp / 150) + 1;
      setCurrentLevel(Math.min(rawLevel, 10));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const playSingleAudio = useCallback((wordToSpeak: string) => {
    setIsListening(true);
    const utterance = new SpeechSynthesisUtterance(wordToSpeak);
    utterance.lang = "en-US"; // FIX: Force English voice
    utterance.rate = 0.85;
    utterance.onend = () => {
      setIsListening(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    };
    window.speechSynthesis.speak(utterance);
  }, []);

  const setupWord = useCallback(() => {
    if (!activeWord) return;
    const letters = activeWord.word.split("");
    const numBlanks =
      letters.length <= 3 ? 1 : Math.floor(Math.random() * 2) + 2;

    const indices: number[] = [];
    while (indices.length < numBlanks) {
      const rand = Math.floor(Math.random() * letters.length);
      if (!indices.includes(rand)) indices.push(rand);
    }

    setHiddenIndices(indices);
    setInputValue("");
    setFlashSuccess(false);
    setIsError(false);
    setHasTimedOut(false);
    playSingleAudio(activeWord.word);
  }, [activeWord, playSingleAudio]);

  useEffect(() => {
    if (!activeWord) return;
    const timer = setTimeout(() => setupWord(), 0);
    return () => {
      clearTimeout(timer);
      window.speechSynthesis.cancel();
    };
  }, [activeWord, setupWord]);

  // Timer callbacks
  const handleTimeUp = useCallback(() => {
    setHasTimedOut(true);
  }, []);

  const handleRetry = () => {
    setHasTimedOut(false);
    setRetryCount((prev) => prev + 1); // Changes the timer's key to reset the bar to 100%
    setupWord();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    const targetWord = activeWord.word.toLowerCase();
    const typedWord = val.toLowerCase().trim();

    if (val.length > 0 && !targetWord.startsWith(typedWord)) setIsError(true);
    else setIsError(false);

    if (typedWord === targetWord) {
      setFeedTrigger((prev) => prev + 1);
      setFlashSuccess(true);
      setHiddenIndices([]);

      setTimeout(() => {
        if (currentIndex + 1 < words.length)
          setCurrentIndex((prev) => prev + 1);
        else onFinish();
      }, 1500);
    }
  };

  const handleHintClick = () => {
    if (hiddenIndices.length > 0) {
      setHiddenIndices((prev) => prev.slice(1));
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  // IF TIME IS UP, SHOW THE GAME OVER SCREEN!
  if (hasTimedOut) {
    return <TimeoutScreen onRetry={handleRetry} />;
  }

  if (!activeWord) return null;

  const displayWord = activeWord.word
    .split("")
    .map((char, index) => (hiddenIndices.includes(index) ? "_" : char))
    .join(" ");

  let inputClasses =
    "w-full text-center text-3xl p-4 border-b-4 outline-none transition-all bg-transparent font-mono font-bold disabled:bg-transparent ";
  if (flashSuccess) inputClasses += "border-green-500 text-green-600";
  else if (isError)
    inputClasses += "border-red-500 text-red-600 focus:border-red-500";
  else inputClasses += "border-gray-200 focus:border-purple-500 text-gray-900";

  return (
    <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-8 animate-fade-in">
      <div className="w-full md:w-1/3 flex flex-col items-center">
        <div className="bg-gradient-to-b from-indigo-50 to-purple-50 rounded-3xl p-8 shadow-inner border border-purple-100/50 w-full flex flex-col items-center relative h-64 justify-end">
          <div className="absolute top-6 w-full px-4 text-center">
            <p
              className={`font-bold text-lg transition-colors duration-300 ${flashSuccess ? "text-green-600" : "text-purple-600"}`}
            >
              {flashSuccess ? "Nailed it! 🌟" : "What's the missing letter?"}
            </p>
          </div>
          <PixelVocabmon feedTrigger={feedTrigger} level={currentLevel} />
        </div>
      </div>

      <div className="w-full md:w-2/3 flex flex-col">
        <div className="flex justify-between items-center mb-4 px-2">
          <span className="text-gray-400 font-bold uppercase tracking-wider text-sm">
            Test {currentIndex + 1} of {words.length}
          </span>
          <span className="bg-purple-100 text-purple-700 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-widest">
            Test Mode
          </span>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-8 text-center border border-gray-100 relative overflow-hidden">
          {/* TIMER COMPONENT */}
          <SandTimer
            key={`${currentIndex}-${retryCount}`}
            duration={SECONDS_PER_WORD}
            isActive={!isListening && !flashSuccess && !hasTimedOut}
            onTimeUp={handleTimeUp}
          />

          {isListening && (
            <div className="absolute top-0 left-0 w-full bg-purple-500 text-white text-xs font-bold py-1 animate-pulse tracking-widest uppercase z-10">
              Listening...
            </div>
          )}

          <h2 className="text-5xl font-mono tracking-widest text-gray-900 mb-2 mt-4 font-black">
            {displayWord.toUpperCase()}
          </h2>
          <p className="text-gray-500 italic mb-4">({activeWord.pos})</p>

          <input
            ref={inputRef}
            type="text"
            autoComplete="off"
            disabled={isListening || flashSuccess || hasTimedOut}
            value={inputValue}
            onChange={handleInputChange}
            placeholder={isListening ? "" : "Type the full word..."}
            className={inputClasses}
          />

          <div className="mt-6 flex justify-end h-10">
            {hiddenIndices.length > 0 && !flashSuccess && (
              <button
                onClick={handleHintClick}
                className="text-sm font-bold text-purple-500 bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-lg transition-colors border border-purple-200"
              >
                💡 Need a hint?
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
