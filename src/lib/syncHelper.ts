import { syncProgressToDB } from "@/actions/progress";

export async function triggerSilentSync() {
  // 1. Harvest all the current data from localStorage
  const exp = parseInt(localStorage.getItem("vocabmon_exp") || "0", 10);
  const currentSet = parseInt(
    localStorage.getItem("current_word_set") || "0",
    10,
  );

  // 2. Gather up all the completed quest flags into an array
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

  // 3. Send it silently to the backend
  try {
    await syncProgressToDB(exp, currentSet, completedQuests);
    console.log("💾 Progress silently synced to database!");
  } catch (error) {
    console.error("Failed to sync:", error);
  }
}
