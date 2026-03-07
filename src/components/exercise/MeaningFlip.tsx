import { useState, useEffect } from "react";
import { VocabWord } from "@/data/vocab";
import PixelVocabmon from "../shared/PixelVocabmon";

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
  const [isSpeaking, setIsSpeaking] = useState(false); // NEW STATE

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

  const activeTarget = targetOrder[currentIndex];

  const handleCardClick = (clickedWord: VocabWord) => {
    // Block clicks if already animating or speaking!
    if (
      activeFlipId !== null ||
      solvedIds.includes(clickedWord.id) ||
      !activeTarget ||
      isSpeaking
    )
      return;

    setActiveFlipId(clickedWord.id);

    if (clickedWord.id === activeTarget.id) {
      setFeedTrigger((prev) => prev + 1);

      // AUDIO LOCK MECHANIC
      setIsSpeaking(true);
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        `${clickedWord.word}. ${activeTarget.definition}`,
      );
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
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(clickedWord.word);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);

      setErrorId(clickedWord.id);
      setTimeout(() => {
        setErrorId(null);
        setActiveFlipId(null);
      }, 1000);
    }
  };

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
        <span className="bg-emerald-100 text-emerald-800 font-bold px-4 py-2 rounded-xl">
          {solvedIds.length} / {words.length} Matched
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-8 w-full items-start">
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="bg-gradient-to-b from-blue-50 to-indigo-50 rounded-3xl p-6 shadow-inner border border-indigo-100/50 w-full flex flex-col items-center relative h-64 justify-end shrink-0">
            <div className="absolute top-6 w-full px-4 text-center">
              <p className="font-bold text-lg text-indigo-500">
                {isSpeaking ? "Listen and remember! 🎧" : "Find the match!"}
              </p>
            </div>
            <PixelVocabmon feedTrigger={feedTrigger} />
          </div>

          <div
            className={`bg-white rounded-3xl shadow-md border border-gray-100 text-center relative overflow-hidden min-h-[16rem] flex flex-col items-center justify-center p-8 shrink-0 transition-all duration-300 ease-in-out ${isSpeaking ? "ring-4 ring-emerald-200" : ""}`}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400"></div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4 shrink-0">
              Target Meaning
            </p>
            <p className="text-xl text-gray-800 font-medium leading-relaxed">
              &quot;{activeTarget.definition}&quot;
            </p>
          </div>
        </div>

        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          {gridWords.map((word) => {
            const isFlipped =
              activeFlipId === word.id || solvedIds.includes(word.id);
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
