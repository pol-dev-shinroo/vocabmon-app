import { useState, useEffect, useRef, useCallback } from "react";
import { VocabWord } from "@/data/vocab";
import PixelVocabmon from "../shared/PixelVocabmon";
import SandTimer from "../shared/SandTimer";
import TimeoutScreen from "../shared/TimeoutScreen";

// SET YOUR DIFFICULTY HERE (30 seconds per puzzle clue)
const SECONDS_PER_WORD = 30;

export default function MeaningPuzzle({
  words,
  onFinish,
}: {
  words: VocabWord[];
  onFinish: () => void;
}) {
  const [selectedWordIndex, setSelectedWordIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(words.map(() => ""));
  const [completedIndices, setCompletedIndices] = useState<number[]>([]);
  const [hintIndices, setHintIndices] = useState<{ [key: number]: number[] }>(
    {},
  );
  const [feedTrigger, setFeedTrigger] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Timer & Level States
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);

  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeWord = words[selectedWordIndex];

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
    if (!isSpeaking && !hasTimedOut) inputRef.current?.focus();
    if (itemRefs.current[selectedWordIndex]) {
      itemRefs.current[selectedWordIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedWordIndex, isSpeaking, hasTimedOut]);

  const handleTimeUp = useCallback(() => {
    setHasTimedOut(true);
  }, []);

  const handleRetry = () => {
    setHasTimedOut(false);
    setRetryCount((prev) => prev + 1); // Resets the timer

    // Clear the current typed attempt so they start fresh
    const newAnswers = [...answers];
    newAnswers[selectedWordIndex] = "";
    setAnswers(newAnswers);

    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase().trim();
    if (
      completedIndices.includes(selectedWordIndex) ||
      isSpeaking ||
      hasTimedOut
    )
      return;

    const newAnswers = [...answers];
    newAnswers[selectedWordIndex] = val;
    setAnswers(newAnswers);

    if (val === activeWord.word.toLowerCase()) {
      const newCompleted = [...completedIndices, selectedWordIndex];
      setCompletedIndices(newCompleted);
      setFeedTrigger((prev) => prev + 1);

      setIsSpeaking(true);
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        `${activeWord.word}. ${activeWord.definition}`,
      );
      utterance.lang = "en-US"; // FIX: Force English voice
      utterance.rate = 0.9;

      utterance.onend = () => {
        setIsSpeaking(false);
        if (newCompleted.length === words.length) {
          setTimeout(onFinish, 1000);
        } else {
          const nextIdx = words.findIndex((_, i) => !newCompleted.includes(i));
          if (nextIdx !== -1) setSelectedWordIndex(nextIdx);
        }
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  const giveHint = () => {
    const currentHints = hintIndices[selectedWordIndex] || [];
    if (currentHints.length >= activeWord.word.length) return;
    let rand;
    do {
      rand = Math.floor(Math.random() * activeWord.word.length);
    } while (currentHints.includes(rand));
    setHintIndices({
      ...hintIndices,
      [selectedWordIndex]: [...currentHints, rand],
    });
    inputRef.current?.focus();
  };

  // IF TIME IS UP, SHOW THE GAME OVER SCREEN!
  if (hasTimedOut) {
    return <TimeoutScreen onRetry={handleRetry} />;
  }

  const isCurrentCorrect = completedIndices.includes(selectedWordIndex);
  const currentVal = answers[selectedWordIndex];
  const isError =
    currentVal.length > 0 &&
    !activeWord.word.toLowerCase().startsWith(currentVal);

  let inputClasses =
    "w-full text-center text-3xl p-4 border-b-4 outline-none transition-all bg-transparent font-mono font-bold uppercase tracking-[0.5em] disabled:bg-transparent mt-4";
  if (isCurrentCorrect) inputClasses += " border-emerald-500 text-emerald-600";
  else if (isError)
    inputClasses += " border-red-500 text-red-600 focus:border-red-500";
  else
    inputClasses += " border-indigo-400 focus:border-indigo-500 text-gray-900";

  return (
    <div className="w-full max-w-6xl animate-fade-in flex flex-col items-center">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="w-full flex justify-between items-end mb-8 px-4">
        <h2 className="text-4xl font-black text-gray-900">Meaning Puzzle 🧩</h2>
        <span className="bg-emerald-100 text-emerald-800 font-bold px-4 py-2 rounded-xl">
          {completedIndices.length} / {words.length} Solved
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full items-start">
        {/* LEFT COLUMN: Vocabmon & Clue List */}
        <div className="flex flex-col gap-6 w-full overflow-hidden">
          <div className="bg-gradient-to-b from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-inner border border-indigo-100/50 w-full flex flex-col items-center relative h-64 justify-end shrink-0">
            <div className="absolute top-6 w-full px-4 text-center">
              <p className="font-bold text-lg text-indigo-500 transition-colors duration-300">
                {isSpeaking
                  ? "Listen closely! 🎧"
                  : isCurrentCorrect
                    ? "Yummy puzzle! 🧩"
                    : "Solve a clue to feed him!"}
              </p>
            </div>
            <PixelVocabmon feedTrigger={feedTrigger} level={currentLevel} />
          </div>

          <div className="max-h-[380px] overflow-y-auto overflow-x-hidden no-scrollbar rounded-xl w-full p-1 relative flex flex-col gap-4">
            {words.map((w, i) => (
              <div
                key={w.id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={`w-full text-left p-5 rounded-2xl transition-all border-2 flex gap-4 items-start shrink-0 ${selectedWordIndex === i ? "border-emerald-500 bg-emerald-50 shadow-md ring-4 ring-emerald-100" : "border-gray-200 bg-white"} ${completedIndices.includes(i) ? "opacity-50 border-emerald-200 bg-gray-50" : ""}`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm transition-colors ${completedIndices.includes(i) ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-600"} ${selectedWordIndex === i && !completedIndices.includes(i) ? "bg-emerald-200 text-emerald-800" : ""}`}
                >
                  {completedIndices.includes(i) ? "✓" : i + 1}
                </div>
                <p
                  className={`flex-1 break-words whitespace-normal font-medium leading-snug mt-1 transition-colors ${completedIndices.includes(i) ? "text-emerald-700" : "text-gray-700"}`}
                >
                  {w.definition}
                </p>
              </div>
            ))}
            <div className="h-[380px] w-full shrink-0 pointer-events-none"></div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Input Area */}
        <div className="flex flex-col items-center justify-start bg-white p-10 rounded-3xl shadow-lg border border-gray-100 sticky top-6 min-h-[400px]">
          {/* TIMER COMPONENT - Moved to the very top and given full width */}
          <div className="w-full mb-8">
            <SandTimer
              key={`${selectedWordIndex}-${retryCount}`}
              duration={SECONDS_PER_WORD}
              isActive={!isSpeaking && !isCurrentCorrect && !hasTimedOut}
              onTimeUp={handleTimeUp}
            />
          </div>

          <div className="w-full text-center flex-1 flex flex-col justify-center">
            <p className="text-emerald-500 font-black mb-6 uppercase text-sm tracking-widest bg-emerald-50 py-2 rounded-lg inline-block px-6 border border-emerald-100">
              Solving Clue #{selectedWordIndex + 1}
            </p>

            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {activeWord.word.split("").map((char, i) => {
                const isHinted = (
                  hintIndices[selectedWordIndex] || []
                ).includes(i);
                const isCorrect = completedIndices.includes(selectedWordIndex);
                return (
                  <div
                    key={i}
                    className={`w-12 h-14 flex items-center justify-center border-2 rounded-xl font-mono text-3xl font-black transition-all shadow-sm ${isCorrect ? "bg-emerald-500 border-emerald-600 text-white shadow-emerald-200 transform scale-105" : "bg-gray-50 border-gray-200 text-gray-800"} ${isHinted && !isCorrect ? "text-emerald-600 border-emerald-400 bg-emerald-50" : ""}`}
                  >
                    {isCorrect
                      ? char.toUpperCase()
                      : isHinted
                        ? char.toUpperCase()
                        : ""}
                  </div>
                );
              })}
            </div>

            <input
              ref={inputRef}
              type="text"
              value={
                isCurrentCorrect ? activeWord.word : answers[selectedWordIndex]
              }
              onChange={handleInputChange}
              disabled={isCurrentCorrect || isSpeaking || hasTimedOut}
              className={inputClasses}
              placeholder={isSpeaking ? "LISTENING..." : "TYPE HERE"}
            />
          </div>

          <div className="flex w-full justify-center items-center mt-8">
            <button
              onClick={giveHint}
              disabled={isCurrentCorrect || isSpeaking || hasTimedOut}
              className="flex items-center gap-2 text-emerald-600 font-bold hover:bg-emerald-50 px-6 py-3 rounded-xl transition-all border border-emerald-100 disabled:opacity-50 hover:shadow-sm"
            >
              💡 Reveal Letter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
