import { useState, useEffect, useCallback } from "react";
import { VocabWord } from "@/data/vocab";
import PixelVocabmon from "../shared/PixelVocabmon";

export default function MeaningPractice({
  words,
  onFinish,
}: {
  words: VocabWord[];
  onFinish: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedTrigger, setFeedTrigger] = useState(0);
  const [flashSuccess, setFlashSuccess] = useState(false);

  const [placedCount, setPlacedCount] = useState(0);
  const [shuffledBank, setShuffledBank] = useState<string[]>([]);
  const [errorId, setErrorId] = useState<string | null>(null);
  const [activeKeywords, setActiveKeywords] = useState<string[]>([]);

  const activeWord = words[currentIndex];

  useEffect(() => {
    if (!activeWord) return;

    setPlacedCount(0);
    setFlashSuccess(false);
    setErrorId(null);

    window.speechSynthesis.cancel();
    const welcomeUtterance = new SpeechSynthesisUtterance(activeWord.word);

    // FIX: Force English pronunciation!
    welcomeUtterance.lang = "en-US";
    welcomeUtterance.rate = 0.9;
    window.speechSynthesis.speak(welcomeUtterance);

    let targetWords = activeWord.keywords || [];

    if (targetWords.length === 0) {
      const wordRegex = /[a-zA-Z]+/g;
      const allWords = activeWord.definition.match(wordRegex) || [];
      const validWords = allWords.filter((w) => w.length > 4);

      const uniqueValidWords = Array.from(
        new Set(validWords.map((w) => w.toLowerCase())),
      );
      const targetCount = Math.min(Math.max(uniqueValidWords.length, 2), 3);
      const chosenLowerWords = [...uniqueValidWords]
        .sort(() => 0.5 - Math.random())
        .slice(0, targetCount);

      if (chosenLowerWords.length < 2 && allWords.length >= 2) {
        const fallback = Array.from(
          new Set(allWords.map((w) => w.toLowerCase())),
        );
        targetWords = fallback.slice(0, 2);
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
        if (uniqueKWords.includes(part.toLowerCase())) {
          answersInOrder.push(part.toLowerCase());
        }
      });
    }

    setActiveKeywords(answersInOrder);

    if (answersInOrder.length > 0) {
      const shuffled = [...answersInOrder].sort(() => Math.random() - 0.5);
      setShuffledBank(shuffled);
    }
  }, [activeWord]);

  const handleWordComplete = useCallback(() => {
    setFlashSuccess(true);
    const utterance = new SpeechSynthesisUtterance(activeWord.definition);

    // FIX: Force English pronunciation!
    utterance.lang = "en-US";
    utterance.rate = 0.85;

    utterance.onend = () => {
      setTimeout(() => {
        if (currentIndex + 1 < words.length) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          onFinish();
        }
      }, 600);
    };
    window.speechSynthesis.speak(utterance);
  }, [activeWord, currentIndex, words.length, onFinish]);

  const handleBankClick = (clickedWord: string, index: number) => {
    if (flashSuccess) return;

    const expectedWord = activeKeywords[placedCount];

    if (clickedWord.toLowerCase() === expectedWord.toLowerCase()) {
      const newCount = placedCount + 1;
      setPlacedCount(newCount);
      setFeedTrigger((prev) => prev + 1);

      if (newCount === activeKeywords.length) {
        handleWordComplete();
      }
    } else {
      setErrorId(`${clickedWord}-${index}`);
      setTimeout(() => setErrorId(null), 400);
    }
  };

  const renderDefinition = () => {
    if (activeKeywords.length === 0)
      return (
        <p className="text-2xl text-gray-700 leading-relaxed font-medium">
          {activeWord.definition}
        </p>
      );

    const uniqueKWords = Array.from(
      new Set(activeKeywords.map((k) => k.toLowerCase())),
    );
    const escapeRegExp = (string: string) =>
      string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const safeKWords = uniqueKWords.map(escapeRegExp);
    const regex = new RegExp(`\\b(${safeKWords.join("|")})\\b`, "gi");

    const parts = activeWord.definition.split(regex);
    let keywordIndexTracker = 0;

    return (
      <p className="text-xl text-gray-700 leading-loose font-medium">
        {parts.map((part, i) => {
          const isKeyword = uniqueKWords.includes(part.toLowerCase());
          if (isKeyword) {
            const myKeywordIndex = keywordIndexTracker;
            keywordIndexTracker++;
            if (myKeywordIndex < placedCount) {
              return (
                <span
                  key={i}
                  className="inline-block bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-lg shadow-sm border border-emerald-200 mx-1 transition-all animate-fade-in"
                >
                  {part}
                </span>
              );
            } else {
              return (
                <span
                  key={i}
                  className="inline-block border-b-4 border-dashed border-gray-300 w-32 mx-1 h-6 translate-y-2"
                ></span>
              );
            }
          }
          return <span key={i}>{part}</span>;
        })}
      </p>
    );
  };

  if (!activeWord) return null;

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

  return (
    <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-8 animate-fade-in">
      <style>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        .animate-error-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>
      <div className="w-full md:w-1/3 flex flex-col items-center">
        <div className="bg-gradient-to-b from-green-50 to-emerald-50 rounded-3xl p-8 shadow-inner border border-emerald-100/50 w-full flex flex-col items-center relative h-64 justify-end">
          <div className="absolute top-6 w-full px-4 text-center">
            <p
              className={`font-bold text-lg transition-colors duration-300 ${flashSuccess ? "text-green-600" : "text-emerald-600"}`}
            >
              {flashSuccess ? "Perfect Meaning! 🧠" : "Rebuild the meaning!"}
            </p>
          </div>
          <PixelVocabmon feedTrigger={feedTrigger} />
        </div>
      </div>
      <div className="w-full md:w-2/3 flex flex-col">
        <div className="flex justify-between items-center mb-4 px-2">
          <span className="text-gray-400 font-bold uppercase tracking-wider text-sm">
            Learning {currentIndex + 1} of {words.length}
          </span>
          <span className="bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-widest">
            Meaning Focus
          </span>
        </div>
        <div className="bg-white rounded-3xl shadow-md p-8 text-center border border-gray-100 relative overflow-hidden flex flex-col items-center">
          {activeWord.imageUrl && (
            <div className="w-full h-48 bg-gray-100 rounded-2xl mb-6 overflow-hidden shadow-inner border border-gray-200">
              <img
                src={activeWord.imageUrl}
                alt={activeWord.word}
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          )}
          <h2 className="text-4xl font-black text-gray-900 mb-2">
            {activeWord.word}
          </h2>
          <p className="text-gray-400 italic mb-6">({activeWord.pos})</p>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8 w-full min-h-[120px] flex items-center justify-center">
            {renderDefinition()}
          </div>
          <div className="flex flex-wrap gap-3 justify-center w-full min-h-[50px]">
            {getRemainingBank().map((word, i) => {
              const uniqueKey = `${word}-${i}`;
              const isError = errorId === uniqueKey;
              return (
                <button
                  key={uniqueKey}
                  onClick={() => handleBankClick(word, i)}
                  disabled={flashSuccess}
                  className={`px-6 py-3 rounded-xl font-bold text-lg transition-all shadow-sm border-2 ${isError ? "bg-red-50 text-red-600 border-red-400 animate-error-shake" : "bg-white text-gray-700 border-gray-200 hover:border-emerald-400 hover:text-emerald-600 hover:shadow-md transform hover:-translate-y-1"} ${flashSuccess ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {word}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
