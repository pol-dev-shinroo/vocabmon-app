"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PixelVocabmon from "@/components/shared/PixelVocabmon";
import { getStudentProgress } from "@/actions/loadProgress";

interface HistoryItem {
  weekId: string;
  finalLevel: number;
  totalExp: number;
  completedAt: string;
}

export default function CollectionPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCollection() {
      const progress = await getStudentProgress();
      // If he has a history array in the database, load it in!
      if (progress && progress.history) {
        // Sort it so the newest weeks show up first
        const sortedHistory = [...progress.history].sort(
          (a, b) =>
            new Date(b.completedAt).getTime() -
            new Date(a.completedAt).getTime(),
        );
        setHistory(sortedHistory);
      }
      setIsLoading(false);
    }
    fetchCollection();
  }, []);

  if (isLoading) {
    return (
      <main className="flex min-h-screen bg-gray-50 flex-col items-center justify-center">
        <div className="text-6xl animate-bounce mb-4">🏆</div>
        <h2 className="text-xl font-bold text-gray-500 animate-pulse">
          Opening the vault...
        </h2>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-gray-50 pt-12 pb-24">
      <div className="w-full max-w-4xl animate-fade-in">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 text-center md:text-left">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">
              Hall of Fame 🏆
            </h1>
            <p className="text-gray-500 font-medium">
              Your fully evolved partners from past weeks.
            </p>
          </div>
          <Link
            href="/"
            className="bg-white border-2 border-gray-200 text-gray-600 hover:border-indigo-400 hover:text-indigo-600 font-bold py-3 px-6 rounded-xl transition-all shadow-sm shrink-0"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* The Grid */}
        {history.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-12 text-center flex flex-col items-center">
            <div className="text-6xl mb-4 grayscale opacity-40">🥚</div>
            <h3 className="text-2xl font-black text-gray-400 mb-2">
              No partners here yet!
            </h3>
            <p className="text-gray-400 font-medium max-w-md leading-relaxed">
              When the teacher resets the curriculum for a new week, your
              current Vocabmon will be permanently archived here so you can
              always look back at your hard work!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item, index) => {
              // Format "week_1" into "Week 1"
              const formattedWeek = item.weekId
                .replace("_", " ")
                .replace(/\b\w/g, (l) => l.toUpperCase());

              // Format the date nicely
              const dateString = new Date(item.completedAt).toLocaleDateString(
                undefined,
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                },
              );

              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <div className="bg-gradient-to-b from-indigo-50 to-blue-50 p-6 flex justify-center items-end h-56 relative border-b border-gray-100">
                    <PixelVocabmon
                      level={item.finalLevel}
                      feedTrigger={0}
                      variant={
                        ["Week 1", "Week 2", "Week 3", "week_1", "week_2", "week_3"].includes(item.weekId)
                          ? "fire"
                          : "digimon"
                      }
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-black text-gray-800">
                        {formattedWeek}
                      </h3>
                      <span className="bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-widest">
                        Lv. {item.finalLevel}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm font-medium mb-1 flex justify-between">
                      <span>Total EXP:</span>
                      <span className="text-gray-700 font-black">
                        {item.totalExp} ✨
                      </span>
                    </p>
                    <div className="w-full h-[1px] bg-gray-100 my-3"></div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider text-center">
                      Archived {dateString}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
