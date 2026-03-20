import { useState, useEffect, useCallback } from "react";
import { VocabWord } from "@/data/vocab";
import PixelVocabmon from "../shared/PixelVocabmon";
import SandTimer from "../shared/SandTimer";
import TimeoutScreen from "../shared/TimeoutScreen";

// SET YOUR DIFFICULTY HERE
const SECONDS_PER_MATCH = 45; // Generous time for reading definitions

export default function DragDropTest({
  words,
  onFinish,
}: {
  words: VocabWord[];
  onFinish: () => void;
}) {
  const [tableRows, setTableRows] = useState<VocabWord[]>([]);
  const [bankWords, setBankWords] = useState<string[]>([]);
  const [placedWords, setPlacedWords] = useState<{ [key: number]: string }>({});

  const [selectedBankWord, setSelectedBankWord] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<number | null>(null);
  const [feedTrigger, setFeedTrigger] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // --- Game Phase & Timer States ---
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);

  // --- Mistake Tracking (3 Strikes Rule) ---
  const [mistakesThisRound, setMistakesThisRound] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setTableRows([...words].sort(() => Math.random() - 0.5));
      setBankWords(
        [...words].map((w) => w.word).sort(() => Math.random() - 0.5),
      );
    }, 0);
    return () => {
      clearTimeout(timer);
      window.speechSynthesis.cancel();
    };
  }, [words]);

  const playAudio = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // FIX: Force English voice
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleTimeUp = useCallback(() => {
    setHasTimedOut(true);
  }, []);

  // --- Full Quiz Restart (Used for BOTH Timeouts and Game Overs) ---
  const handleRestartQuiz = () => {
    setIsGameOver(false);
    setHasTimedOut(false);
    setMistakesThisRound(0);
    setPlacedWords({});
    setSelectedBankWord(null);
    setErrorId(null);
    setRetryCount((prev) => prev + 1); // Reset timer state
    window.speechSynthesis.cancel();

    // Reshuffle the board completely
    setTableRows([...words].sort(() => Math.random() - 0.5));
    setBankWords([...words].map((w) => w.word).sort(() => Math.random() - 0.5));
  };

  const handlePlacement = useCallback(
    (targetWord: VocabWord, droppedWordString: string) => {
      if (placedWords[targetWord.id] || isSpeaking || hasTimedOut || isGameOver)
        return;

      if (droppedWordString.toLowerCase() === targetWord.word.toLowerCase()) {
        // --- CORRECT PLACEMENT ---
        setMistakesThisRound(0); // Reset mistakes for the next target
        setPlacedWords((prev) => ({
          ...prev,
          [targetWord.id]: targetWord.word,
        }));
        setBankWords((prev) => prev.filter((w) => w !== droppedWordString));
        setSelectedBankWord(null);
        setFeedTrigger((prev) => prev + 1);

        setIsSpeaking(true);
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(targetWord.definition);
        utterance.lang = "en-US"; // FIX: Force English voice
        utterance.rate = 0.85;

        utterance.onend = () => {
          setIsSpeaking(false);
          if (Object.keys(placedWords).length + 1 === words.length) {
            setTimeout(onFinish, 1000);
          }
        };

        window.speechSynthesis.speak(utterance);
      } else {
        // --- INCORRECT PLACEMENT ---
        const newMistakeCount = mistakesThisRound + 1;
        setMistakesThisRound(newMistakeCount);
        setErrorId(targetWord.id);
        setSelectedBankWord(null);

        setTimeout(() => {
          setErrorId(null);
          // Trigger Game Over if they hit 3 mistakes
          if (newMistakeCount >= 3) {
            setIsGameOver(true);
          }
        }, 500);
      }
    },
    [
      placedWords,
      words.length,
      isSpeaking,
      hasTimedOut,
      isGameOver,
      onFinish,
      mistakesThisRound,
    ],
  );

  const handleDragStart = (e: React.DragEvent, wordString: string) => {
    if (isSpeaking || hasTimedOut || isGameOver) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData("text/plain", wordString);
    setSelectedBankWord(wordString);
  };

  const handleDrop = (e: React.DragEvent, targetWord: VocabWord) => {
    e.preventDefault();
    if (isSpeaking || hasTimedOut || isGameOver) return;
    const droppedWordString = e.dataTransfer.getData("text/plain");
    handlePlacement(targetWord, droppedWordString);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

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
            You made 3 wrong drag-and-drop attempts! You have to restart the
            puzzle.
          </p>
          <button
            onClick={handleRestartQuiz}
            className="bg-red-500 hover:bg-red-600 text-white text-xl font-bold py-4 px-10 rounded-2xl shadow-lg hover:scale-105 transition-all active:scale-95"
          >
            Restart Puzzle 🔄
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl animate-fade-in flex flex-col items-center">
      <style>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
        .animate-error-shake { animation: shake 0.3s ease-in-out; }
      `}</style>

      {/* HEADER SECTION */}
      <div className="w-full flex justify-between items-end mb-4 px-4">
        <h2 className="text-4xl font-black text-gray-900">Drag & Drop 🧩</h2>
        <div className="flex gap-3">
          {/* Dynamic visual indicator for mistakes */}
          {mistakesThisRound > 0 && (
            <span className="bg-red-100 text-red-700 font-bold px-4 py-2 rounded-xl animate-pulse">
              {mistakesThisRound} Strike{mistakesThisRound > 1 ? "s" : ""}! ⚠️
            </span>
          )}
          <span className="bg-emerald-100 text-emerald-800 font-bold px-4 py-2 rounded-xl">
            {Object.keys(placedWords).length} / {words.length} Placed
          </span>
        </div>
      </div>

      {/* FULL-WIDTH TIMER SECTION (Spanning the entire container, right under header) */}
      <div className="w-full mb-8">
        <SandTimer
          key={`${Object.keys(placedWords).length}-${retryCount}`}
          duration={SECONDS_PER_MATCH}
          isActive={
            !isSpeaking &&
            !hasTimedOut &&
            Object.keys(placedWords).length < words.length
          }
          onTimeUp={handleTimeUp}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-8 w-full items-start">
        <div className="md:col-span-1 flex flex-col gap-6 sticky top-6">
          <div className="bg-gradient-to-b from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-inner border border-indigo-100/50 w-full flex flex-col items-center relative h-64 justify-end shrink-0">
            {/* CLEANED OUT TIMER FROM HERE */}
            <div className="absolute top-6 w-full px-4 text-center">
              <p className="font-bold text-lg text-indigo-500 transition-colors duration-300">
                {isSpeaking
                  ? "Listen closely! 🎧"
                  : Object.keys(placedWords).length === words.length
                    ? "100% Score! 🏆"
                    : "Match them all!"}
              </p>
            </div>
            <PixelVocabmon feedTrigger={feedTrigger} level={currentLevel} />
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col gap-6">
          <div
            className={`bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden transition-all ${isSpeaking ? "ring-4 ring-emerald-200 pointer-events-none" : ""}`}
          >
            <div className="bg-gray-50 border-b border-gray-100 grid grid-cols-12 gap-4 p-4 font-black text-gray-400 uppercase tracking-widest text-xs">
              <div className="col-span-4 text-center">Missing Word</div>
              <div className="col-span-8">Definition</div>
            </div>

            <div className="flex flex-col">
              {tableRows.map((row, index) => {
                const isPlaced = !!placedWords[row.id];
                const isError = errorId === row.id;

                return (
                  <div
                    key={row.id}
                    className={`grid grid-cols-12 gap-6 p-4 items-center border-b border-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"} ${isPlaced ? "bg-emerald-50/30" : ""}`}
                  >
                    <div className="col-span-4 flex justify-center">
                      <div
                        onDrop={(e) => handleDrop(e, row)}
                        onDragOver={handleDragOver}
                        onClick={() => {
                          if (selectedBankWord && !isSpeaking)
                            handlePlacement(row, selectedBankWord);
                        }}
                        className={`w-full h-14 rounded-xl flex items-center justify-center font-black uppercase tracking-wider transition-all
                          ${
                            isPlaced
                              ? "bg-emerald-500 text-white shadow-md border-2 border-emerald-600"
                              : isError
                                ? "bg-red-50 border-2 border-dashed border-red-400 animate-error-shake"
                                : selectedBankWord
                                  ? "bg-indigo-50 border-2 border-dashed border-indigo-400 cursor-pointer hover:bg-indigo-100 animate-pulse"
                                  : "bg-gray-100 border-2 border-dashed border-gray-300 text-transparent"
                          }
                        `}
                      >
                        {isPlaced ? placedWords[row.id] : "?"}
                      </div>
                    </div>
                    <div className="col-span-8">
                      <p
                        className={`font-medium text-lg leading-snug transition-colors ${isPlaced ? "text-emerald-800" : "text-gray-700"}`}
                      >
                        {row.definition}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={`bg-white rounded-3xl shadow-md border border-gray-100 p-8 flex flex-col items-center min-h-[160px] transition-opacity ${isSpeaking ? "opacity-50 pointer-events-none" : ""}`}
          >
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-6">
              Word Bank
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {bankWords.length === 0 ? (
                <p className="text-emerald-500 font-black text-xl animate-fade-in">
                  Test Complete! 🎉
                </p>
              ) : (
                bankWords.map((word) => {
                  const isSelected = selectedBankWord === word;
                  return (
                    <div
                      key={word}
                      draggable={!isSpeaking}
                      onDragStart={(e) => handleDragStart(e, word)}
                      onClick={() => {
                        if (isSpeaking) return;
                        playAudio(word);
                        setSelectedBankWord(isSelected ? null : word);
                      }}
                      className={`px-5 py-3 rounded-xl font-black text-lg uppercase tracking-wider transition-all cursor-grab active:cursor-grabbing border-2 shadow-sm flex items-center gap-3
                        ${isSelected ? "bg-indigo-500 text-white border-indigo-600 scale-105 shadow-md ring-4 ring-indigo-200" : "bg-white text-gray-800 border-gray-200 hover:border-indigo-400 hover:text-indigo-600"}
                      `}
                    >
                      <span
                        className={`text-xl -mt-1 ${isSelected ? "text-indigo-300" : "text-gray-300"}`}
                      >
                        ⋮⋮
                      </span>
                      {word}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
