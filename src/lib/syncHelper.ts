import { syncProgressToDB } from "@/actions/progress";

export async function triggerSilentSync() {
  // 1. Harvest all the current data from localStorage
  const exp = parseInt(localStorage.getItem("vocabmon_exp") || "0", 10);
  const currentSet = parseInt(
    localStorage.getItem("current_word_set") || "0",
    10,
  );

  // 2. Calculate lifetime EXP and unlock stickers accordingly
  const baseExp = parseInt(localStorage.getItem("lifetime_base_exp") || "0", 10);
  const totalLifetimeExp = baseExp + exp;

  // Determine how many total stickers they should own (1 sticker per 150 EXP)
  const totalEarnedStickers = Math.floor(totalLifetimeExp / 150);
  // Cap it at 10 (the max number of characters)
  const maxStickerId = Math.min(totalEarnedStickers, 10);
  
  // Unlock stickers
  const unlockedStickers: number[] = JSON.parse(
    localStorage.getItem("unlocked_stickers") || "[]",
  );
  
  const newlyUnlocked: number[] = [];
  let changed = false;
  for (let id = 1; id <= maxStickerId; id++) {
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
