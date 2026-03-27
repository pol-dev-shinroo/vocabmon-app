"use client";

import { useActionState } from "react";
import { loginUser } from "@/actions/auth";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🐉</div>
          <h1 className="text-3xl font-black text-gray-800">Vocabmon</h1>
          <p className="text-gray-500 font-medium mt-2">
            Welcome back, Partner!
          </p>
        </div>

        <form action={formAction} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Trainer ID
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your ID..."
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none font-medium text-gray-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Secret Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password..."
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none font-medium text-gray-900"
              required
            />
          </div>

          {state?.error && (
            <div className="bg-red-50 text-red-600 font-bold p-3 rounded-xl text-center text-sm border border-red-200 animate-pulse">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 px-4 rounded-xl text-lg transition-all shadow-md ${isPending ? "opacity-70 cursor-not-allowed" : "transform hover:scale-[1.02]"}`}
          >
            {isPending ? "Connecting..." : "Enter World 🚀"}
          </button>
        </form>
      </div>
    </main>
  );
}
