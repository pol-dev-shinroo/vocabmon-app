"use client";

import { useState, useEffect } from "react";
import GiftBox from "@/components/home/GiftBox";
import VocabmonReveal from "@/components/home/VocabmonReveal";
import Dashboard from "@/components/home/Dashboard";

export default function Home() {
  const [homePhase, setHomePhase] = useState<
    "loading" | "gift" | "reveal" | "dashboard"
  >("loading");

  useEffect(() => {
    // FIX: Wrapping the localStorage check in a 0ms timeout makes it asynchronous.
    // This perfectly satisfies the React Compiler's cascading render rules.
    const timer = setTimeout(() => {
      const hasUnlocked = localStorage.getItem("vocabmon_unlocked");
      if (hasUnlocked === "true") {
        setHomePhase("dashboard");
      } else {
        setHomePhase("gift");
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleFinishReveal = () => {
    localStorage.setItem("vocabmon_unlocked", "true");
    setHomePhase("dashboard");
  };

  if (homePhase === "loading") {
    return <main className="flex min-h-screen bg-gray-50" />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
      `}</style>

      {homePhase === "gift" && (
        <GiftBox onOpen={() => setHomePhase("reveal")} />
      )}

      {homePhase === "reveal" && (
        <VocabmonReveal onContinue={handleFinishReveal} />
      )}

      {homePhase === "dashboard" && <Dashboard />}
    </main>
  );
}
