export default function GiftBox({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .animate-wiggle { animation: wiggle 0.5s ease-in-out infinite; }
      `}</style>

      <h1 className="text-3xl font-black text-gray-800 mb-2">Welcome Jay!</h1>
      <p className="text-gray-500 mb-12 font-medium">
        You have a mysterious gift box...
      </p>

      <button
        onClick={onOpen}
        className="animate-wiggle transform hover:scale-110 active:scale-95 transition-all cursor-pointer outline-none"
      >
        <div className="text-9xl drop-shadow-xl">🎁</div>
      </button>

      <p className="text-indigo-400 mt-8 font-bold animate-pulse uppercase tracking-widest text-sm">
        Tap to open
      </p>
    </div>
  );
}
