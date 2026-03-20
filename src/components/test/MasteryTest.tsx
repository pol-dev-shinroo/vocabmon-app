import { useState, useEffect, useRef, useCallback } from "react";
import { VocabWord } from "@/data/vocab";
import PixelVocabmon from "../shared/PixelVocabmon";
import SandTimer from "../shared/SandTimer";
import TimeoutScreen from "../shared/TimeoutScreen";

// SET YOUR DIFFICULTY HERE
const SECONDS_PER_MATCH = 45; // Time allowed per full word mastery (meaning + spelling)

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

  const [placedCount, setPlacedCount] = useState(0);
  const [shuffledBank, setShuffledBank] = useState<string[]>([]);
  const [errorId, setErrorId] = useState<string | null>(null);
  const [activeKeywords, setActiveKeywords] = useState<string[]>([]);

  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // --- Game Phase & Timer States ---
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);

  // --- Mistake Tracking (3 Strikes Rule) ---
  const [mistakesThisRound, setMistakesThisRound] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const activeWord = words[currentIndex];

  // Fetch Vocabmon Level
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

  // Set up the current word
  useEffect(() => {
    if (!activeWord) return;
    setPlacedCount(0);
    setInputValue("");
    setErrorId(null);
    setIsSpeaking(false);
    setMistakesThisRound(0); // Reset strikes for each new word

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

  const isMeaningComplete =
    placedCount > 0 && placedCount === activeKeywords.length;

  useEffect(() => {
    if (isMeaningComplete && !isSpeaking && !hasTimedOut && !isGameOver) {
      inputRef.current?.focus();
    }
  }, [isMeaningComplete, isSpeaking, hasTimedOut, isGameOver]);

  const handleTimeUp = useCallback(() => {
    setHasTimedOut(true);
  }, []);

  // --- Full Quiz Restart ---
  const handleRestartQuiz = () => {
    setIsGameOver(false);
    setHasTimedOut(false);
    setMistakesThisRound(0);
    setCurrentIndex(0); // Go all the way back to the first word
    setPlacedCount(0);
    setInputValue("");
    setErrorId(null);
    setRetryCount((prev) => prev + 1); // Trigger timer reset
    window.speechSynthesis.cancel();
  };

  const handleBankClick = (clickedWord: string, index: number) => {
    if (isMeaningComplete || isSpeaking || hasTimedOut || isGameOver) return;
    const expectedWord = activeKeywords[placedCount];

    if (clickedWord.toLowerCase() === expectedWord.toLowerCase()) {
      // Correct click
      setPlacedCount((prev) => prev + 1);
      setFeedTrigger((prev) => prev + 1);
    } else {
      // INCORRECT CLICK - Strike!
      const newMistakeCount = mistakesThisRound + 1;
      setMistakesThisRound(newMistakeCount);
      setErrorId(`${clickedWord}-${index}`);
      setTimeout(() => {
        setErrorId(null);
        if (newMistakeCount >= 3) {
          setIsGameOver(true);
        }
      }, 400);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isSpeaking || hasTimedOut || isGameOver) return;
    const val = e.target.value.toLowerCase().trim();
    setInputValue(val);

    // Mistake Check: Typed a wrong letter
    if (val.length > 0 && !activeWord.word.toLowerCase().startsWith(val)) {
      const newMistakeCount = mistakesThisRound + 1;
      setMistakesThisRound(newMistakeCount);

      setTimeout(() => {
        setInputValue(""); // Wipe input on mistake
        if (newMistakeCount >= 3) {
          setIsGameOver(true);
        }
      }, 400);
      return;
    }

    // Success Check: Fully spelled word
    if (val === activeWord.word.toLowerCase()) {
      setFeedTrigger((prev) => prev + 1);
      setIsSpeaking(true);
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        `${activeWord.word}. ${activeWord.definition}`,
      );
      utterance.lang = "en-US";
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

  // IF TIME IS UP, SHOW THE TIMEOUT SCREEN!
  if (hasTimedOut) {
    return <TimeoutScreen onRetry={handleRestartQuiz} />;
  }

  // --- IF GAME OVER (3 Mistakes), SHOW RESTART SCREEN ---
  if (isGameOver) {
    return (
      <div className="w-full max-w-2xl animate-fade-in mx-auto mt-12">
        <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-10 text-center shadow-xl flex flex-col items-center">
          <div className="text-6xl mb-4">💥</div>
          <h2 className="text-4xl font-black text-red-600 mb-4">Game Over!</h2>
          <p className="text-xl text-red-900/80 font-medium mb-8">
            You made 3 mistakes! The Mastery boss defeated you. Restart and try
            again!
          </p>
          <button
            onClick={handleRestartQuiz}
            className="bg-red-500 hover:bg-red-600 text-white text-xl font-bold py-4 px-10 rounded-2xl shadow-lg hover:scale-105 transition-all active:scale-95"
          >
            Restart Boss Fight 🔄
          </button>
        </div>
      </div>
    );
  }

  const isErrorInput =
    inputValue.length > 0 &&
    !activeWord.word.toLowerCase().startsWith(inputValue);
  const isCurrentCorrect =
    inputValue.toLowerCase() === activeWord.word.toLowerCase();

  let inputClasses =
    "w-full text-center text-3xl p-4 border-b-4 outline-none transition-all bg-transparent font-mono font-bold uppercase tracking-[0.5em] disabled:bg-gray-50 disabled:opacity-50 ";
  if (isCurrentCorrect) inputClasses += "border-emerald-500 text-emerald-600";
  else if (isErrorInput)
    inputClasses +=
      "border-red-500 text-red-600 focus:border-red-500 animate-error-shake";
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
    <div className="w-full max-w-6xl flex flex-col items-center gap-4 animate-fade-in">
      <style>{`@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } } .animate-error-shake { animation: shake 0.2s ease-in-out 0s 2; }`}</style>

      {/* HEADER SECTION */}
      <div className="w-full flex justify-between items-end mb-4 px-4">
        <h2 className="text-4xl font-black text-gray-900">Mastery Boss ⚔️</h2>
        <div className="flex gap-3 items-center">
          {/* Dynamic visual indicator for mistakes */}
          {mistakesThisRound > 0 && (
            <span className="bg-red-100 text-red-700 font-bold px-4 py-2 rounded-xl animate-pulse">
              {mistakesThisRound} Strike{mistakesThisRound > 1 ? "s" : ""}! ⚠️
            </span>
          )}
          <span className="bg-indigo-100 text-indigo-700 font-bold px-4 py-2 rounded-xl uppercase tracking-widest text-sm">
            Word {currentIndex + 1} / {words.length}
          </span>
        </div>
      </div>

      {/* FULL-WIDTH TIMER SECTION */}
      <div className="w-full mb-8">
        <SandTimer
          key={`${currentIndex}-${retryCount}`}
          duration={SECONDS_PER_MATCH}
          isActive={!isSpeaking && !hasTimedOut && !isGameOver}
          onTimeUp={handleTimeUp}
        />
      </div>

      {/* MAIN CONTENT SPLIT */}
      <div className="w-full flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/3 flex flex-col items-center sticky top-6">
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
            <PixelVocabmon feedTrigger={feedTrigger} level={currentLevel} />
          </div>
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-6">
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
    </div>
  );
}
