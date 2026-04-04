import { syncProgressToDB } from "@/actions/progress";

export async function triggerSilentSync() {
  // 1. Harvest all the current data from localStorage
  const exp = parseInt(localStorage.getItem("vocabmon_exp") || "0", 10);
  const currentSet = parseInt(
    localStorage.getItem("current_word_set") || "0",
    10,
  );

  // 2. Calculate current level and unlock stickers accordingly
  // Level 1: 0-149 EXP, Level 2: 150-299 EXP, etc.
  const currentLevel = Math.min(Math.floor(exp / 150) + 1, 10);
  
  // Unlock stickers 1 through level - 1
  const unlockedStickers: number[] = JSON.parse(
    localStorage.getItem("unlocked_stickers") || "[]",
  );
  
  const newlyUnlocked: number[] = [];
  let changed = false;
  for (let id = 1; id < currentLevel; id++) {
    if (!unlockedStickers.includes(id)) {
      unlockedStickers.push(id);
      newlyUnlocked.push(id);
      changed = true;
    }
  }
  
  if (changed) {
    unlockedStickers.sort((a, b) => a - b);
    localStorage.setItem("unlocked_stickers", JSON.stringify(unlockedStickers));
    
    // 🚀 NEW: Save the newly unlocked IDs for the celebration popup!
    if (newlyUnlocked.length > 0) {
      localStorage.setItem("just_unlocked_stickers", JSON.stringify(newlyUnlocked));
    }
  }

  // 3. Gather up all the completed quest flags into an array
  const completedQuests: string[] = [];
  const questKeys = [
    "quest_spelling_done",
    "quest_exercise_done",
    "quest_test_done",
    "quest_midterm_done",
    "quest_final1_done",
    "quest_finale_done",
  ];

  questKeys.forEach((key) => {
    if (localStorage.getItem(key) === "true") {
      completedQuests.push(key);
    }
  });

  // 4. Get popup preferences
  const hideUntilStr = localStorage.getItem("hideStickerPopupUntil");
  const hideStickerPopupUntil = hideUntilStr ? new Date(hideUntilStr) : null;

  // 5. Send it silently to the backend
  try {
    await syncProgressToDB(
      exp,
      currentSet,
      completedQuests,
      unlockedStickers,
      hideStickerPopupUntil,
    );
    console.log("💾 Progress silently synced to database!");
  } catch (error) {
    console.error("Failed to sync:", error);
  }
}
