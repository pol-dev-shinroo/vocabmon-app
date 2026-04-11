"use client";

import { useState, useEffect } from "react";
import GiftBox from "@/components/home/GiftBox";
import VocabmonReveal from "@/components/home/VocabmonReveal";
import Dashboard from "@/components/home/Dashboard";
import { getStudentProgress } from "@/actions/loadProgress";

export default function Home() {
  const [homePhase, setHomePhase] = useState<
    "loading" | "gift" | "reveal" | "dashboard"
  >("loading");

  useEffect(() => {
    async function loadDataAndStart() {
      try {
        // 1. FETCH DATA FROM MONGODB
        const dbProgress = await getStudentProgress();

        if (dbProgress) {
          // 2. INJECT DB DATA INTO LOCAL STORAGE (Overwriting any local mismatches)
          localStorage.setItem("vocabmon_exp", dbProgress.exp.toString());
          localStorage.setItem(
            "current_word_set",
            dbProgress.currentSet.toString(),
          );
          localStorage.setItem("active_week_id", dbProgress.activeWeekId);

          const historyExp = dbProgress.history?.reduce((sum: number, week: any) => sum + week.totalExp, 0) || 0;
          localStorage.setItem("lifetime_base_exp", historyExp.toString());

          // Clear old quest flags
          const questKeys = [
            "quest_spelling_done",
            "quest_exercise_done",
            "quest_test_done",
            "quest_midterm_done",
            "quest_final1_done",
            "quest_finale_done",
          ];
          questKeys.forEach((key) => localStorage.removeItem(key));

          // Re-apply completed flags from the database
          if (dbProgress.completedQuests) {
            dbProgress.completedQuests.forEach((quest: string) => {
              localStorage.setItem(quest, "true");
            });
          }

          // Inject stickers and popup preferences
          localStorage.setItem(
            "unlocked_stickers",
            JSON.stringify(dbProgress.unlockedStickers || []),
          );
          if (dbProgress.hideStickerPopupUntil) {
            localStorage.setItem(
              "hideStickerPopupUntil",
              dbProgress.hideStickerPopupUntil,
            );
          } else {
            localStorage.removeItem("hideStickerPopupUntil");
          }

          console.log("☁️ Cloud save downloaded and applied!");
        }

        // 3. DECIDE WHICH SCREEN TO SHOW
        const hasUnlocked = localStorage.getItem("vocabmon_unlocked");
        if (hasUnlocked === "true" || (dbProgress && dbProgress.exp > 0)) {
          // If he has EXP in the DB, he definitely already opened the gift!
          localStorage.setItem("vocabmon_unlocked", "true");
          setHomePhase("dashboard");
        } else {
          setHomePhase("gift");
        }
      } catch (error) {
        console.error("Failed to sync from cloud:", error);
        // Fallback: If offline, just use whatever is currently in localStorage
        const hasUnlocked = localStorage.getItem("vocabmon_unlocked");
        setHomePhase(hasUnlocked === "true" ? "dashboard" : "gift");
      }
    }

    loadDataAndStart();
  }, []);

  const handleFinishReveal = () => {
    localStorage.setItem("vocabmon_unlocked", "true");
    setHomePhase("dashboard");
  };

  if (homePhase === "loading") {
    // A fun loading screen so he knows it's fetching his save file!
    return (
      <main className="flex min-h-screen bg-gray-50 flex-col items-center justify-center">
        <div className="text-6xl animate-bounce mb-4">☁️</div>
        <h2 className="text-xl font-bold text-gray-500 animate-pulse">
          Syncing with server...
        </h2>
      </main>
    );
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
