"use server";

import { connectToDatabase } from "@/lib/mongodb";
import Progress from "@/models/Progress";
import { cookies } from "next/headers";

export async function getStudentProgress() {
  try {
    const cookieStore = await cookies();
    const username = cookieStore.get("vocabmon_session")?.value;

    if (!username) return null;

    await connectToDatabase();

    // Fetch Jay's save file from the database
    const progress = await Progress.findOne({ username }).lean();

    if (!progress) return null;

    // We have to stringify/parse to safely pass MongoDB objects to the frontend
    return JSON.parse(JSON.stringify(progress));
  } catch (error) {
    console.error("Failed to load progress:", error);
    return null;
  }
}
