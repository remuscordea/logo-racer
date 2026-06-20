import type { MascotState } from "../lib/exercises";

interface Props {
  state: MascotState;
  size?: number;
}

export function Mascot({ state, size = 80 }: Props) {
  const bodyColor =
    state === "happy" ? "#a8e6a3" : state === "sad" ? "#f4a3a3" : "#e0d4f7";
  const eyeColor = state === "sad" ? "#c0392b" : "#2c3e50";
  const mouthPath =
    state === "happy"
      ? "M 32 54 Q 40 62 48 54"   // smile
      : state === "sad"
      ? "M 32 60 Q 40 52 48 60"   // frown
      : "M 32 56 L 48 56";        // neutral line

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 90"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`Mascot is ${state}`}
    >
      {/* Left ear */}
      <ellipse cx="22" cy="18" rx="9" ry="18" fill={bodyColor} />
      <ellipse cx="22" cy="18" rx="5" ry="13" fill="#f9c9d4" />
      {/* Right ear */}
      <ellipse cx="58" cy="18" rx="9" ry="18" fill={bodyColor} />
      <ellipse cx="58" cy="18" rx="5" ry="13" fill="#f9c9d4" />
      {/* Body / head */}
      <circle cx="40" cy="52" r="30" fill={bodyColor} />
      {/* Eyes */}
      <circle cx="31" cy="46" r="4" fill={eyeColor} />
      <circle cx="49" cy="46" r="4" fill={eyeColor} />
      {/* Eye shine */}
      <circle cx="32.5" cy="44.5" r="1.5" fill="white" />
      <circle cx="50.5" cy="44.5" r="1.5" fill="white" />
      {/* Nose */}
      <ellipse cx="40" cy="52" rx="3" ry="2" fill="#e8a0b0" />
      {/* Mouth */}
      <path d={mouthPath} stroke={eyeColor} strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
