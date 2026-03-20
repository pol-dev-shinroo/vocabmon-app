import { useState, useEffect, useRef, useCallback } from "react";
import { VocabWord } from "@/data/vocab";
import PixelVocabmon from "../shared/PixelVocabmon";

// UPDATED: Shortened to match the new 2-repetition limit
const FEEDBACK_MESSAGES = [
  "Listen, then type!",
  "Yummy! One more bite!",
  "Perfect! He's full! 🌟",
];

export default function SpellingPractice({
  words,
  onFinish,
}: {
  words: VocabWord[];
  onFinish: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(true);
  const [typingCount, setTypingCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [feedTrigger, setFeedTrigger] = useState(0);

  const [isError, setIsError] = useState(false);
  const [flashSuccess, setFlashSuccess] = useState(false);

  const [currentLevel, setCurrentLevel] = useState(1);

  const activeWord = words[currentIndex];
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedExp = parseInt(
        localStorage.getItem("vocabmon_exp") || "0",
        10,
      );
      const rawLevel = Math.floor(savedExp / 150) + 1;
      // Updated max level to 10 to match the 50-word campaign
      setCurrentLevel(Math.min(rawLevel, 10));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const playSingleAudio = useCallback((wordToSpeak: string) => {
    setIsListening(true);
    const utterance = new SpeechSynthesisUtterance(wordToSpeak);

    // Force the voice to be English regardless of the phone's language!
    utterance.lang = "en-US";
    utterance.rate = 0.85;

    utterance.onend = () => {
      setIsListening(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    };
    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    if (!activeWord) return;

    const timer = setTimeout(() => {
      setTypingCount(0);
      setInputValue("");
      setFlashSuccess(false);
      setIsError(false);
      playSingleAudio(activeWord.word);
    }, 0);

    return () => {
      clearTimeout(timer);
      window.speechSynthesis.cancel();
    };
  }, [activeWord, playSingleAudio]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    const targetWord = activeWord.word.toLowerCase();
    const typedWord = val.toLowerCase().trim();

    if (val.length > 0 && !targetWord.startsWith(typedWord)) {
      setIsError(true);
    } else {
      setIsError(false);
    }

    if (typedWord === targetWord) {
      setFeedTrigger((prev) => prev + 1);
      setFlashSuccess(true);

      const newCount = typingCount + 1;
      setTypingCount(newCount);

      // UPDATED: Now triggers the next word after 2 successful types instead of 4
      if (newCount >= 2) {
        setTimeout(() => {
          if (currentIndex + 1 < words.length) {
            setCurrentIndex((prev) => prev + 1);
          } else {
            onFinish();
          }
        }, 1500);
      } else {
        setTimeout(() => {
          setInputValue("");
          setFlashSuccess(false);
          playSingleAudio(activeWord.word);
        }, 600);
      }
    }
  };

  if (!activeWord) return null;

  let inputClasses =
    "w-full text-center text-3xl p-4 border-b-4 outline-none transition-all bg-transparent font-mono font-bold disabled:bg-transparent ";

  if (flashSuccess) {
    inputClasses += "border-green-500 text-green-600";
  } else if (isError) {
    inputClasses += "border-red-500 text-red-600 focus:border-red-500";
  } else {
    inputClasses += "border-gray-200 focus:border-indigo-500 text-gray-900";
  }

  return (
    <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-8 animate-fade-in">
      <div className="w-full md:w-1/3 flex flex-col items-center">
        <div className="bg-gradient-to-b from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-inner border border-indigo-100/50 w-full flex flex-col items-center relative h-64 justify-end">
          <div className="absolute top-6 w-full px-4 text-center">
            <p
              className={`font-bold text-lg transition-colors duration-300 ${typingCount > 0 ? "text-green-600" : "text-indigo-500"}`}
            >
              {FEEDBACK_MESSAGES[typingCount]}
            </p>
          </div>
          <PixelVocabmon feedTrigger={feedTrigger} level={currentLevel} />
        </div>
      </div>

      <div className="w-full md:w-2/3 flex flex-col">
        <div className="flex justify-between items-center mb-4 px-2">
          <span className="text-gray-400 font-bold uppercase tracking-wider text-sm">
            Word {currentIndex + 1} of {words.length}
          </span>

          <div className="flex gap-2">
            {/* UPDATED: Only mapping 2 dots [0, 1] instead of 4 */}
            {[0, 1].map((i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full transition-all duration-500 ${i < typingCount ? "bg-green-500 scale-110 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-gray-200"}`}
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-8 text-center border border-gray-100 relative overflow-hidden">
          {isListening && (
            <div className="absolute top-0 left-0 w-full bg-indigo-500 text-white text-xs font-bold py-1 animate-pulse tracking-widest uppercase">
              Listening...
            </div>
          )}

          <h2 className="text-5xl font-black text-gray-900 mb-2 mt-4">
            {activeWord.word}
          </h2>
          <p className="text-gray-500 italic mb-8">({activeWord.pos})</p>

          <input
            ref={inputRef}
            type="text"
            autoComplete="off"
            // UPDATED: Disables the input after 2 successful types
            disabled={isListening || flashSuccess || typingCount >= 2}
            value={inputValue}
            onChange={handleInputChange}
            placeholder={isListening ? "" : "Type the word..."}
            className={inputClasses}
          />
        </div>
      </div>
    </div>
  );
}
