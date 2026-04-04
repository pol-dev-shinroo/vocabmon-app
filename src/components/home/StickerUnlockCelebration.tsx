"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export default function StickerUnlockCelebration() {
  const [justUnlocked, setJustUnlocked] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("just_unlocked_stickers");
    if (saved) {
      try {
        const ids = JSON.parse(saved);
        if (Array.isArray(ids) && ids.length > 0) {
          setJustUnlocked(ids);
        }
      } catch (e) {
        console.error("Failed to parse just_unlocked_stickers", e);
      }
    }
  }, []);

  const handleClearAndClose = () => {
    localStorage.removeItem("just_unlocked_stickers");
    setJustUnlocked([]);
  };

  const handleGoToStickers = () => {
    localStorage.removeItem("just_unlocked_stickers");
    router.push("/stickers");
  };

  if (!mounted || justUnlocked.length === 0) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 animate-fade-in p-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-sm w-full overflow-hidden transform transition-all scale-100 border-4 border-amber-400">
        <div className="bg-gradient-to-b from-amber-400 to-amber-500 p-8 text-center relative">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute text-xl animate-bounce"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              >
                ✨
              </div>
            ))}
          </div>
          <div className="text-7xl mb-4 drop-shadow-lg">🏆</div>
          <h2 className="text-3xl font-black text-white leading-tight">
            Level Up!
          </h2>
          <p className="text-amber-100 font-bold mt-2 uppercase tracking-widest text-sm">
            Magic Reward Unlocked
          </p>
        </div>
        
        <div className="p-8 text-center">
          <p className="text-gray-700 font-bold text-lg leading-relaxed mb-8">
            You unlocked <span className="text-amber-600">{justUnlocked.length} new mystery sticker{justUnlocked.length > 1 ? 's' : ''}</span> in your collection!
          </p>
          
          <div className="space-y-4">
            <button
              onClick={handleGoToStickers}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-black py-4 rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 text-lg"
            >
              <span>View Collection</span> 🪄
            </button>
            
            <button
              onClick={handleClearAndClose}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold py-3 rounded-2xl text-sm transition-colors"
            >
              Keep Studying
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
