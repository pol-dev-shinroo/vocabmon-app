"use server";

import { connectToDatabase } from "@/lib/mongodb";
import Progress from "@/models/Progress";
import { cookies } from "next/headers";

// This function silently saves the current state to the database
export async function syncProgressToDB(
  exp: number,
  currentSet: number,
  completedQuests: string[],
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
