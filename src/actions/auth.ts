"use server";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import Progress from "@/models/Progress";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// NEW: Safely get the current logged-in username
export async function getCurrentUsername() {
  const cookieStore = await cookies();
  return cookieStore.get("vocabmon_session")?.value || null;
}

export async function loginUser(
  prevState: { error?: string } | null,
  formData: FormData,
) {
  const username = formData.get("username") as string | null;
  const password = formData.get("password") as string | null;

  if (!username || !password) return { error: "Please fill out both fields." };

  try {
    await connectToDatabase();

    // 1. SMART SEEDING: Auto-create the dev account & MAX OUT PROGRESS
    if (username === "dev") {
      const devExists = await User.findOne({ username: "dev" });
      if (!devExists) {
        console.log("🛠️ Dev account missing! Auto-creating...");
        await User.create({ username: "dev", passwordHash: "dev123", role: "dev" });
      }

      // Force unlock all quests, max level (1500 EXP), and all stickers for dev testing
      await Progress.findOneAndUpdate(
        { username: "dev" },
        {
          $set: {
            exp: 1500,
            currentSet: 0,
            completedQuests: [],
            unlockedStickers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          }
        },
        { upsert: true, new: true }
      );
    }

    // 2. SMART SEEDING: Auto-create Jay's account if empty
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log("Database is empty! Creating Jay's account...");
      await User.create({ username: "jay", passwordHash: "vocab123", role: "student" });
    }

    const user = await User.findOne({ username });

    if (!user || user.passwordHash !== password) {
      return { error: "Invalid username or password!" };
    }

    const cookieStore = await cookies();
    cookieStore.set("vocabmon_session", user.username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
  } catch (error) {
    console.error("Database error:", error);
    return { error: "Database connection failed. Check your console." };
  }

  redirect("/");
}
