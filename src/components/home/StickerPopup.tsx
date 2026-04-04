"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { triggerSilentSync } from "@/lib/syncHelper";

export default function StickerPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hideUntil = localStorage.getItem("hideStickerPopupUntil");
    if (hideUntil) {
      const hideDate = new Date(hideUntil);
      if (hideDate > new Date()) {
        return; // Still hiding
      }
    }
    // If we are here, either no hide flag or it's expired
    setIsVisible(true);
  }, []);

  const handleHideRestOfWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sun) to 6 (Sat)
    
    // We want the next Thursday (4). 
    // If today is Friday(5), Saturday(6), Sun(0), Mon(1), Tue(2), Wed(3), Thu(4)
    // Days to add: 6, 5, 4, 3, 2, 1, 7
    let daysUntilThursday = (4 - dayOfWeek + 7) % 7;
    if (daysUntilThursday === 0) daysUntilThursday = 7;
    
    const nextThursday = new Date(today);
    nextThursday.setDate(today.getDate() + daysUntilThursday);
    nextThursday.setHours(0, 0, 0, 0);

    const isoDate = nextThursday.toISOString();
    localStorage.setItem("hideStickerPopupUntil", isoDate);
    
    setIsVisible(false);
    
    // Sync to DB
    triggerSilentSync();
  };

  if (!mounted || !isVisible) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden transform transition-all scale-100 border-4 border-indigo-400">
        <div className="bg-indigo-500 p-6 text-center relative">
          <div className="text-6xl mb-2">🪄</div>
          <h2 className="text-2xl font-black text-white">Sticker Alert!</h2>
        </div>
        
        <div className="p-8 text-center">
          <p className="text-gray-700 font-bold text-lg leading-relaxed mb-8">
            Level up your Vocabmon to unlock exclusive <span className="text-indigo-600">Harry Potter</span> stickers!
          </p>
          
          <div className="space-y-3">
            <button
              onClick={() => setIsVisible(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-lg transition-transform active:scale-95"
            >
              Awesome!
            </button>
            
            <button
              onClick={handleHideRestOfWeek}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold py-3 rounded-2xl text-sm transition-colors"
            >
              Do not show for the rest of the week
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
