import PixelVocabmon from "@/components/shared/PixelVocabmon"; // <-- Fixed import path!

export default function VocabmonReveal({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <style>{`
        @keyframes pop-up {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-up { animation: pop-up 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>

      <div className="animate-pop-up">
        <PixelVocabmon className="mb-8" />

        <div className="bg-white border-2 border-indigo-100 p-6 rounded-2xl shadow-lg mb-8 relative">
          {/* Little chat bubble tail */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-l-2 border-t-2 border-indigo-100 rotate-45"></div>

          <p className="text-xl font-bold text-gray-800 leading-relaxed">
            "Hi Jay! My name is{" "}
            <span className="text-indigo-600">Vocabmon</span>!<br />
            I'm very small right now, but if you complete your quests, you can
            help me evolve and grow up!"
          </p>
        </div>

        <button
          onClick={onContinue}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all shadow-md transform hover:-translate-y-1"
        >
          I'll help you grow! 🌟
        </button>
      </div>
    </div>
  );
}
