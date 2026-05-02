"use server";

import { connectToDatabase } from "@/lib/mongodb";
import Progress from "@/models/Progress";
import { cookies } from "next/headers";

// This function silently saves the current state to the database
export async function syncProgressToDB(
  exp: number,
  currentSet: number,
  completedQuests: string[],
  unlockedStickers: number[] = [],
  hideStickerPopupUntil: Date | null = null,
) {
  try {
    // 1. Figure out who is logged in
    const cookieStore = await cookies();
    const username = cookieStore.get("vocabmon_session")?.value;

    if (!username) return { success: false, error: "Not logged in" };

    // 2. Connect to the database
    await connectToDatabase();

    // 3. Update their progress file (using $set so we don't accidentally erase his history!)
    await Progress.findOneAndUpdate(
      { username }, // Find Jay
      {
        $set: {
          exp,
          currentSet,
          completedQuests,
          unlockedStickers,
          hideStickerPopupUntil,
        },
      },
      { upsert: true, new: true }, // If he doesn't have a save file yet, make one!
    );

    return { success: true };
  } catch (error) {
    console.error("Failed to sync progress:", error);
    return { success: false, error: "Database sync failed" };
  }
}

// NEW: This function archives the current week into the History array and resets stats
export async function archiveWeekProgress(weekId: string) {
  try {
    // 1. Authenticate the user
    const cookieStore = await cookies();
    const username = cookieStore.get("vocabmon_session")?.value;

    if (!username) return { success: false, error: "Not logged in" };

    // 2. Connect to the database
    await connectToDatabase();

    // 3. Find the user's current progress
    const progress = await Progress.findOne({ username });
    if (!progress) return { success: false, error: "No progress found to archive" };

    // 4. Calculate their final level (matching the frontend logic: 150 EXP per level, max 10)
    const rawLevel = Math.floor(progress.exp / 150) + 1;
    const finalLevel = Math.min(rawLevel, 10);

    // 5. Push the new snapshot into the history array
    progress.history.push({
      weekId,
      finalLevel,
      totalExp: progress.exp,
      completedAt: new Date(),
    });

    // 6. Reset their active stats for the next week
    progress.exp = 0;
    progress.currentSet = 0;
    progress.completedQuests = [];
    // Optional: We could also update progress.activeWeekId if we wanted to increment it here

    // 7. Save the updated document
    await progress.save();

    return { success: true };
  } catch (error) {
    console.error("Failed to archive week progress:", error);
    return { success: false, error: "Database archive failed" };
  }
}

export async function startNewWeek(username: string, newWeekId: string) {
  try {
    await connectToDatabase();
    const progress = await Progress.findOne({ username });
    if (!progress) return { success: false, error: "No progress found" };

    // Archive the current week
    const finalLevel = Math.min(Math.floor(progress.exp / 150) + 1, 10);
    progress.history.push({
      weekId: progress.activeWeekId,
      finalLevel,
      totalExp: progress.exp,
      completedAt: new Date(),
    });

    // Reset the state for the new week (Including EXP!)
    progress.activeWeekId = newWeekId;
    progress.currentSet = 0;
    progress.completedQuests = [];
    progress.exp = 0; // CRITICAL FIX: Reset EXP to 0 for the new egg!

    await progress.save();
    return { success: true };
  } catch (error) {
    console.error("Failed to start new week:", error);
    return { success: false, error: "Failed to start new week" };
  }
}

export async function executeInAppRollover(newWeekId: string) {
  try {
    const cookieStore = await cookies();
    const username = cookieStore.get("vocabmon_session")?.value;
    if (!username) return { success: false, error: "Not logged in" };

    await connectToDatabase();
    const progress = await Progress.findOne({ username });
    if (!progress) return { success: false, error: "No progress found" };

    // 1. Calculate final level based on the MOST RECENT synced EXP
    const rawLevel = Math.floor(progress.exp / 150) + 1;
    const finalLevel = Math.min(rawLevel, 10);

    // 2. Archive the current state into the Hall of Fame
    progress.history.push({
      weekId: progress.activeWeekId,
      finalLevel,
      totalExp: progress.exp,
      completedAt: new Date(),
    });

    // 3. Reset the DB for the new week
    progress.activeWeekId = newWeekId;
    progress.exp = 0;
    progress.currentSet = 0;
    progress.completedQuests = [];

    await progress.save();
    return { success: true };
  } catch (error) {
    console.error("Rollover failed:", error);
    return { success: false, error: "Database error during rollover" };
  }
}
