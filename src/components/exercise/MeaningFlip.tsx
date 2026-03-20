import { useState, useEffect, useCallback } from "react";
import { VocabWord } from "@/data/vocab";
import PixelVocabmon from "../shared/PixelVocabmon";
import SandTimer from "../shared/SandTimer";
import TimeoutScreen from "../shared/TimeoutScreen";

// SET YOUR DIFFICULTIES HERE
const SECONDS_MEMORIZE = 7; // How long they get to look at the open board
const SECONDS_PER_MATCH = 10; // How long they have to find each individual match

export default function MeaningFlip({
  words,
  onFinish,
}: {
  words: VocabWord[];
  onFinish: () => void;
}) {
  const [targetOrder, setTargetOrder] = useState<VocabWord[]>([]);
  const [gridWords, setGridWords] = useState<VocabWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [solvedIds, setSolvedIds] = useState<number[]>([]);
  const [activeFlipId, setActiveFlipId] = useState<number | null>(null);
  const [errorId, setErrorId] = useState<number | null>(null);
  const [feedTrigger, setFeedTrigger] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // --- Game Phase & Timer States ---
  const [gamePhase, setGamePhase] = useState<"memorize" | "playing">(
    "memorize",
  );
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

  // Initial Shuffle
  useEffect(() => {
    const timer = setTimeout(() => {
      setTargetOrder([...words].sort(() => Math.random() - 0.5));
      setGridWords([...words].sort(() => Math.random() - 0.5));
    }, 0);
    return () => {
      clearTimeout(timer);
      window.speechSynthesis.cancel();
    };
  }, [words]);

  // Handle Memory Phase Ending
  const handleMemorizeTimeUp = useCallback(() => {
    setGamePhase("playing");
  }, []);

  // Handle Playing Phase Timeout
  const handlePlayTimeUp = useCallback(() => {
    setHasTimedOut(true);
  }, []);

  // --- Full Quiz Restart (Used for BOTH Timeouts and Game Overs) ---
  const handleRestartQuiz = () => {
    setIsGameOver(false);
    setHasTimedOut(false);
    setMistakesThisRound(0);
    setCurrentIndex(0);
    setSolvedIds([]);
    setActiveFlipId(null);
    setErrorId(null);
    setGamePhase("memorize");
    setRetryCount((prev) => prev + 1); // Reset play timer state
    window.speechSynthesis.cancel();

    // Reshuffle the board completely
    setTargetOrder([...words].sort(() => Math.random() - 0.5));
    setGridWords([...words].sort(() => Math.random() - 0.5));
  };

  const activeTarget = targetOrder[currentIndex];

  const handleCardClick = (clickedWord: VocabWord) => {
    // Block clicks if they are still memorizing, a card is flipping, time is up, or game is over
    if (
      gamePhase === "memorize" ||
      activeFlipId !== null ||
      solvedIds.includes(clickedWord.id) ||
      !activeTarget ||
      isSpeaking ||
      hasTimedOut ||
      isGameOver // Prevent clicks if they just lost
    )
      return;

    setActiveFlipId(clickedWord.id);

    if (clickedWord.id === activeTarget.id) {
      // --- CORRECT MATCH ---
      setMistakesThisRound(0); // Reset mistakes for the next target
      setFeedTrigger((prev) => prev + 1);
      setIsSpeaking(true);
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        `${clickedWord.word}. ${activeTarget.definition}`,
      );
      utterance.lang = "en-US";
      utterance.rate = 0.85;

      utterance.onend = () => {
        setSolvedIds((prev) => [...prev, clickedWord.id]);
        setActiveFlipId(null);
        setIsSpeaking(false);
        if (currentIndex + 1 < targetOrder.length) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          setTimeout(onFinish, 1000);
        }
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // --- INCORRECT MATCH ---
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(clickedWord.word);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);

      const newMistakeCount = mistakesThisRound + 1;
      setMistakesThisRound(newMistakeCount);
      setErrorId(clickedWord.id);

      setTimeout(() => {
        setErrorId(null);
        setActiveFlipId(null);

        // Trigger Game Over if they hit 3 mistakes
        if (newMistakeCount >= 3) {
          setIsGameOver(true);
        }
      }, 1000);
    }
  };

  // IF TIME IS UP, SHOW THE TIMEOUT SCREEN! (Now triggers a full restart)
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
            You made 3 wrong guesses on a single word. You have to restart the
            quiz!
          </p>
          <button
            onClick={handleRestartQuiz}
            className="bg-red-500 hover:bg-red-600 text-white text-xl font-bold py-4 px-10 rounded-2xl shadow-lg hover:scale-105 transition-all active:scale-95"
          >
            Restart Quiz 🔄
          </button>
        </div>
      </div>
    );
  }

  if (!activeTarget) return null;

  return (
    <div className="w-full max-w-5xl animate-fade-in flex flex-col items-center">
      <style>{`
        .perspective { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        @keyframes error-shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
        .animate-error-shake { animation: error-shake 0.3s ease-in-out; }
      `}</style>

      <div className="w-full flex justify-between items-end mb-6 px-4">
        <h2 className="text-4xl font-black text-gray-900">Tile Flip 🃏</h2>
        <div className="flex gap-3">
          {/* Dynamic visual indicator for mistakes */}
          {mistakesThisRound > 0 && (
            <span className="bg-red-100 text-red-700 font-bold px-4 py-2 rounded-xl animate-pulse">
              {mistakesThisRound} Strike{mistakesThisRound > 1 ? "s" : ""}! ⚠️
            </span>
          )}
          <span className="bg-emerald-100 text-emerald-800 font-bold px-4 py-2 rounded-xl">
            {solvedIds.length} / {words.length} Matched
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 w-full items-start">
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="bg-gradient-to-b from-blue-50 to-indigo-50 rounded-3xl p-6 shadow-inner border border-indigo-100/50 w-full flex flex-col items-center relative h-64 justify-end shrink-0">
            <div className="absolute top-6 w-full px-4 text-center">
              <p className="font-bold text-lg text-indigo-500">
                {gamePhase === "memorize"
                  ? "Memorize the board! 👀"
                  : isSpeaking
                    ? "Listen and remember! 🎧"
                    : "Find the match!"}
              </p>
            </div>
            <PixelVocabmon feedTrigger={feedTrigger} level={currentLevel} />
          </div>

          <div
            className={`bg-white rounded-3xl shadow-md border border-gray-100 text-center relative overflow-hidden min-h-[16rem] flex flex-col items-center justify-center p-8 shrink-0 transition-all duration-300 ease-in-out ${isSpeaking ? "ring-4 ring-emerald-200" : ""}`}
          >
            {/* CONDITIONAL TIMER RENDER based on the Game Phase */}
            <div className="absolute top-0 left-0 w-full px-6 pt-3">
              {gamePhase === "memorize" ? (
                <SandTimer
                  key="memorize-timer"
                  duration={SECONDS_MEMORIZE}
                  isActive={true}
                  onTimeUp={handleMemorizeTimeUp}
                />
              ) : (
                <SandTimer
                  key={`${currentIndex}-${retryCount}`}
                  duration={SECONDS_PER_MATCH}
                  isActive={!isSpeaking && !hasTimedOut}
                  onTimeUp={handlePlayTimeUp}
                />
              )}
            </div>

            {gamePhase === "memorize" ? (
              <div className="mt-8 flex flex-col items-center animate-pulse">
                <div className="text-5xl mb-4">🧠</div>
                <h3 className="text-xl font-black text-indigo-600">
                  MEMORIZE!
                </h3>
              </div>
            ) : (
              <>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4 shrink-0 mt-8">
                  Target Meaning
                </p>
                <p className="text-xl text-gray-800 font-medium leading-relaxed">
                  &quot;{activeTarget.definition}&quot;
                </p>
              </>
            )}
          </div>
        </div>

        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          {gridWords.map((word) => {
            const isFlipped =
              gamePhase === "memorize" ||
              activeFlipId === word.id ||
              solvedIds.includes(word.id);

            const isSolved = solvedIds.includes(word.id);
            const isError = errorId === word.id;

            return (
              <div
                key={word.id}
                className={`perspective h-48 cursor-pointer group ${isError ? "animate-error-shake" : ""} ${isSpeaking && !isFlipped ? "opacity-50 pointer-events-none" : ""}`}
                onClick={() => handleCardClick(word)}
              >
                <div
                  className={`relative w-full h-full preserve-3d transition-transform duration-500 ease-out shadow-sm rounded-2xl ${isFlipped ? "rotate-y-180" : "group-hover:scale-[1.02]"}`}
                >
                  <div className="absolute inset-0 backface-hidden bg-white border-2 border-gray-200 rounded-2xl overflow-hidden flex flex-col items-center justify-center">
                    {word.imageUrl ? (
                      <img
                        src={word.imageUrl}
                        alt="Vocab Image"
                        className="w-full h-full object-cover opacity-90"
                      />
                    ) : (
                      <div className="w-full h-full bg-emerald-50 flex items-center justify-center border-4 border-white">
                        <span className="text-6xl opacity-20">?</span>
                      </div>
                    )}
                  </div>
                  <div
                    className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl flex items-center justify-center border-4 transition-colors ${isSolved ? "bg-emerald-500 border-emerald-600 text-white shadow-lg" : isError ? "bg-red-50 border-red-500 text-red-600 shadow-[0_0_15px_rgba(239,68,68,0.5)]" : "bg-white border-indigo-200 text-indigo-900"}`}
                  >
                    <span className="text-3xl font-black tracking-wider uppercase">
                      {word.word}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
