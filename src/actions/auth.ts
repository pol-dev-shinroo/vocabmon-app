"use server";

// test

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginUser(
  prevState: { error?: string } | null,
  formData: FormData,
) {
  const username = formData.get("username") as string | null;
  const password = formData.get("password") as string | null;

  if (!username || !password) {
    return { error: "Please fill out both fields." };
  }

  try {
    // 1. Connect to MongoDB
    await connectToDatabase();

    // 2. SMART SEEDING: If the database is completely empty, create Jay's account!
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log("Database is empty! Creating Jay's account...");
      await User.create({
        username: "jay",
        passwordHash: "vocab123", // We will use a simple password for him
        role: "student",
      });
    }

    // 3. Find the user in the database
    const user = await User.findOne({ username });

    // 4. Check if user exists and password matches
    if (!user || user.passwordHash !== password) {
      return { error: "Invalid username or password!" };
    }

    // 5. Success! Set a secure cookie so he stays logged in for 30 days
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

  // Redirect to the home page after successful login
  redirect("/");
}
