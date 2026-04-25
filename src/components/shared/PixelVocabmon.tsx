import FireVocabmon from "./FireVocabmon";
import DigimonVocabmon from "./DigimonVocabmon";

export default function PixelVocabmon({
  className = "",
  feedTrigger = 0,
  attackTrigger = 0,
  specialTrigger = 0,
  level = 1,
  variant = "digimon",
}: {
  className?: string;
  feedTrigger?: number;
  attackTrigger?: number;
  specialTrigger?: number;
  level?: number;
  variant?: "fire" | "digimon";
}) {
  if (variant === "fire") {
    return (
      <FireVocabmon
        className={className}
        feedTrigger={feedTrigger}
        attackTrigger={attackTrigger}
        specialTrigger={specialTrigger}
        level={level}
      />
    );
  }
  return (
    <DigimonVocabmon
      className={className}
      feedTrigger={feedTrigger}
      attackTrigger={attackTrigger}
      specialTrigger={specialTrigger}
      level={level}
    />
  );
}
