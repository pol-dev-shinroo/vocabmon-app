"use client";
import { useState, useEffect } from "react";

interface SandTimerProps {
  duration: number; // Total seconds
  isActive: boolean; // Is it counting down?
  onTimeUp: () => void; // What happens when it hits 0?
}

export default function SandTimer({
  duration,
  isActive,
  onTimeUp,
}: SandTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft, onTimeUp]);

  // Calculate colors based on time remaining
  const percentage = (timeLeft / duration) * 100;
  let barColor = "bg-green-500";
  if (percentage < 50) barColor = "bg-amber-400";
  if (percentage < 20) barColor = "bg-red-500 animate-pulse";

  return (
    <div className="w-full flex flex-col items-center gap-1 mb-4">
      <div className="w-full flex justify-between text-xs font-black uppercase tracking-widest text-gray-400 px-1">
        <span>⏳ Time Remaining</span>
        <span className={percentage < 20 ? "text-red-500" : ""}>
          {timeLeft}s
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
