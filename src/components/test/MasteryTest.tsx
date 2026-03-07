import { useState, useEffect, useRef } from "react";
import { VocabWord } from "@/data/vocab";
import PixelVocabmon from "../shared/PixelVocabmon";

export default function MasteryTest({
  words,
  onFinish,
}: {
  words: VocabWord[];
  onFinish: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedTrigger, setFeedTrigger] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Meaning State
  const [placedCount, setPlacedCount] = useState(0);
  const [shuffledBank, setShuffledBank] = useState<string[]>([]);
  const [errorId, setErrorId] = useState<string | null>(null);
  const [activeKeywords, setActiveKeywords] = useState<string[]>([]);

  // Spelling State
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const activeWord = words[currentIndex];

  useEffect(() => {
    if (!activeWord) return;
    setPlacedCount(0);
    setInputValue("");
    setErrorId(null);
    setIsSpeaking(false);

    let targetWords = activeWord.keywords || [];
    if (targetWords.length === 0) {
      const allWords = activeWord.definition.match(/[a-zA-Z]+/g) || [];
      const validWords = allWords.filter((w) => w.length > 4);
      const uniqueValidWords = Array.from(
        new Set(validWords.map((w) => w.toLowerCase())),
      );
      const targetCount = Math.min(Math.max(uniqueValidWords.length, 2), 3);
      const chosenLowerWords = [...uniqueValidWords]
        .sort(() => 0.5 - Math.random())
        .slice(0, targetCount);

      if (chosenLowerWords.length < 2 && allWords.length >= 2) {
        targetWords = Array.from(
          new Set(allWords.map((w) => w.toLowerCase())),
        ).slice(0, 2);
      } else if (chosenLowerWords.length === 0 && allWords.length > 0) {
        // FIX: Added the TypeScript safety check here!
        const firstWord = allWords[0];
        targetWords = firstWord ? [firstWord.toLowerCase()] : [];
      } else {
        targetWords = chosenLowerWords;
      }
    }

    const uniqueKWords = Array.from(
      new Set(targetWords.map((k) => k.toLowerCase())),
    );
    const escapeRegExp = (string: string) =>
      string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const safeKWords = uniqueKWords.map(escapeRegExp);

    const answersInOrder: string[] = [];
    if (safeKWords.length > 0) {
      const regex = new RegExp(`\\b(${safeKWords.join("|")})\\b`, "gi");
      const parts = activeWord.definition.split(regex);
      parts.forEach((part) => {
        if (uniqueKWords.includes(part.toLowerCase()))
          answersInOrder.push(part.toLowerCase());
      });
    }

    setActiveKeywords(answersInOrder);
    if (answersInOrder.length > 0) {
      setShuffledBank([...answersInOrder].sort(() => Math.random() - 0.5));
    }
  }, [activeWord]);

  // Focus input automatically when meaning is complete
  const isMeaningComplete =
    placedCount > 0 && placedCount === activeKeywords.length;
  useEffect(() => {
    if (isMeaningComplete && !isSpeaking) {
      inputRef.current?.focus();
    }
  }, [isMeaningComplete, isSpeaking]);

  const handleBankClick = (clickedWord: string, index: number) => {
    if (isMeaningComplete || isSpeaking) return;
    const expectedWord = activeKeywords[placedCount];

    if (clickedWord.toLowerCase() === expectedWord.toLowerCase()) {
      setPlacedCount((prev) => prev + 1);
      setFeedTrigger((prev) => prev + 1);
    } else {
      setErrorId(`${clickedWord}-${index}`);
      setTimeout(() => setErrorId(null), 400);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase().trim();
    if (isSpeaking) return;
    setInputValue(val);

    if (val === activeWord.word.toLowerCase()) {
      setFeedTrigger((prev) => prev + 1);
      setIsSpeaking(true);
      window.speechSynthesis.cancel();
      // First pronounce word, then read definition
      const utterance = new SpeechSynthesisUtterance(
        `${activeWord.word}. ${activeWord.definition}`,
      );
      utterance.rate = 0.85;

      utterance.onend = () => {
        setIsSpeaking(false);
        if (currentIndex + 1 < words.length) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          onFinish();
        }
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!activeWord) return null;

  const isError =
    inputValue.length > 0 &&
    !activeWord.word.toLowerCase().startsWith(inputValue);
  const isCurrentCorrect =
    inputValue.toLowerCase() === activeWord.word.toLowerCase();

  let inputClasses =
    "w-full text-center text-3xl p-4 border-b-4 outline-none transition-all bg-transparent font-mono font-bold uppercase tracking-[0.5em] disabled:bg-gray-50 disabled:opacity-50 ";
  if (isCurrentCorrect) inputClasses += "border-emerald-500 text-emerald-600";
  else if (isError)
    inputClasses += "border-red-500 text-red-600 focus:border-red-500";
  else
    inputClasses += "border-indigo-400 focus:border-indigo-500 text-gray-900";

  const getRemainingBank = () => {
    const placedWords = activeKeywords.slice(0, placedCount);
    const availableBank = [...shuffledBank];
    placedWords.forEach((pw) => {
      const idx = availableBank.findIndex(
        (b) => b.toLowerCase() === pw.toLowerCase(),
      );
      if (idx > -1) availableBank.splice(idx, 1);
    });
    return availableBank;
  };

  const renderDefinition = () => {
    if (activeKeywords.length === 0)
      return <span>{activeWord.definition}</span>;
    const uniqueKWords = Array.from(
      new Set(activeKeywords.map((k) => k.toLowerCase())),
    );
    const escapeRegExp = (string: string) =>
      string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const safeKWords = uniqueKWords.map(escapeRegExp);
    const regex = new RegExp(`\\b(${safeKWords.join("|")})\\b`, "gi");
    const parts = activeWord.definition.split(regex);
    let keywordIndexTracker = 0;

    return parts.map((part, i) => {
      if (uniqueKWords.includes(part.toLowerCase())) {
        const myKeywordIndex = keywordIndexTracker++;
        if (myKeywordIndex < placedCount) {
          return (
            <span
              key={i}
              className="inline-block bg-indigo-100 text-indigo-800 font-bold px-3 py-1 rounded-lg shadow-sm border border-indigo-200 mx-1"
            >
              {part}
            </span>
          );
        } else {
          return (
            <span
              key={i}
              className="inline-block border-b-4 border-dashed border-gray-300 w-24 mx-1 h-6 translate-y-2"
            ></span>
          );
        }
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-8 animate-fade-in">
      <style>{`@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } } .animate-error-shake { animation: shake 0.2s ease-in-out 0s 2; }`}</style>

      {/* LEFT: Vocabmon */}
      <div className="w-full md:w-1/3 flex flex-col items-center">
        <div className="bg-gradient-to-b from-indigo-50 to-blue-50 rounded-3xl p-8 shadow-inner border border-indigo-100/50 w-full flex flex-col items-center relative h-64 justify-end">
          <div className="absolute top-6 w-full px-4 text-center">
            <p
              className={`font-bold text-lg transition-colors duration-300 ${isSpeaking ? "text-emerald-500 animate-pulse" : isCurrentCorrect ? "text-emerald-600" : "text-indigo-600"}`}
            >
              {isSpeaking
                ? "Listen closely! 🎧"
                : isCurrentCorrect
                  ? "Mastered! 🏆"
                  : isMeaningComplete
                    ? "Now spell it!"
                    : "Solve meaning first!"}
            </p>
          </div>
          <PixelVocabmon feedTrigger={feedTrigger} />
        </div>
      </div>

      {/* RIGHT: Combo UI */}
      <div className="w-full md:w-2/3 flex flex-col gap-6">
        <div className="flex justify-between items-center px-2">
          <span className="text-gray-400 font-bold uppercase tracking-wider text-sm">
            Final Boss {currentIndex + 1} of {words.length}
          </span>
          <span className="bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-widest">
            Mastery
          </span>
        </div>

        {/* Part 1: Meaning Completion */}
        <div
          className={`bg-white rounded-3xl shadow-md p-8 text-center border transition-all ${isMeaningComplete ? "border-emerald-200 bg-emerald-50/20 opacity-80" : "border-indigo-100 ring-4 ring-indigo-50"}`}
        >
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">
            Step 1: Complete Meaning
          </p>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-6 text-xl text-gray-700 leading-loose font-medium">
            {renderDefinition()}
          </div>
          {!isMeaningComplete && (
            <div className="flex flex-wrap gap-3 justify-center w-full min-h-[50px]">
              {getRemainingBank().map((word, i) => {
                const uniqueKey = `${word}-${i}`;
                const isError = errorId === uniqueKey;
                return (
                  <button
                    key={uniqueKey}
                    onClick={() => handleBankClick(word, i)}
                    className={`px-5 py-2 rounded-xl font-bold text-lg transition-all shadow-sm border-2 ${isError ? "bg-red-50 text-red-600 border-red-400 animate-error-shake" : "bg-white text-gray-700 border-gray-200 hover:border-indigo-400 hover:text-indigo-600 hover:-translate-y-1"}`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Part 2: Spelling Input */}
        <div
          className={`bg-white rounded-3xl shadow-md p-8 text-center border transition-all ${isMeaningComplete ? "border-indigo-100 ring-4 ring-indigo-50" : "border-gray-100 opacity-50 pointer-events-none"}`}
        >
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">
            Step 2: Spell the Word
          </p>
          <input
            ref={inputRef}
            type="text"
            value={isCurrentCorrect ? activeWord.word : inputValue}
            onChange={handleInputChange}
            disabled={!isMeaningComplete || isCurrentCorrect || isSpeaking}
            className={inputClasses}
            placeholder={
              !isMeaningComplete
                ? "LOCKED 🔒"
                : isSpeaking
                  ? "LISTENING..."
                  : "TYPE THE WORD"
            }
          />
        </div>
      </div>
    </div>
  );
}
