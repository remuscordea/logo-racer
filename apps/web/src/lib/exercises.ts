import type { Brand, Level } from "@logo-racer/shared";

export type MascotState = "neutral" | "happy" | "sad";

// ── Exercise types ────────────────────────────────────────────────────────────

export interface LogoToNameExercise {
  kind: "LOGO_TO_NAME";
  id: string;
  isRetry: boolean;
  correctId: number;
  optionIds: number[]; // 4 options, shuffled (correct included)
}

export interface NameToLogoExercise {
  kind: "NAME_TO_LOGO";
  id: string;
  isRetry: boolean;
  correctId: number;
  optionIds: number[]; // 4 options, shuffled
}

export interface TrueFalseExercise {
  kind: "TRUE_FALSE";
  id: string;
  isRetry: boolean;
  targetBrandId: number;  // brand named in question
  shownBrandId: number;   // logo shown (may differ)
  isMatch: boolean;       // correct answer is "Yes" when true
}

export interface MatchingExercise {
  kind: "MATCHING";
  id: string;
  isRetry: boolean;
  pairIds: number[];      // brandIds for both logo and name columns
}

export type Exercise =
  | LogoToNameExercise
  | NameToLogoExercise
  | TrueFalseExercise
  | MatchingExercise;

// ── Utilities ─────────────────────────────────────────────────────────────────

let _idCounter = 0;
function uid() {
  return `ex-${++_idCounter}`;
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors(
  correctId: number,
  correctDifficulty: number,
  allBrands: Brand[],
  count: number,
): Brand[] {
  const others = allBrands.filter((b) => b.id !== correctId);
  const sameDiff = others.filter((b) => b.difficulty === correctDifficulty);
  const adjDiff = others.filter(
    (b) => Math.abs(b.difficulty - correctDifficulty) === 1,
  );
  const pool = shuffle([...sameDiff, ...adjDiff]);
  if (pool.length < count) {
    const rest = shuffle(others.filter((b) => !pool.some((p) => p.id === b.id)));
    pool.push(...rest);
  }
  return pool.slice(0, count);
}

// ── Queue builder ─────────────────────────────────────────────────────────────

const MAX_EXERCISES = 5;

/**
 * @param level      — the level (exerciseConfig has {type, count})
 * @param worldBrands — brands that belong to this level's world (random pool)
 * @param allBrands  — all brands in DB (used for distractors from other worlds)
 */
export function buildQueue(
  level: Level,
  worldBrands: Brand[],
  allBrands: Brand[],
): Exercise[] {
  const exercises: Exercise[] = [];

  for (const config of level.exerciseConfig) {
    const pool = shuffle(worldBrands);
    const count = Math.min(config.count, pool.length);

    if (config.type === "MATCHING") {
      exercises.push({
        kind: "MATCHING",
        id: uid(),
        isRetry: false,
        pairIds: pool.slice(0, Math.min(count, 5)).map((b) => b.id),
      });
    } else if (config.type === "LOGO_TO_NAME" || config.type === "NAME_TO_LOGO") {
      for (const brand of pool.slice(0, count)) {
        const distractors = pickDistractors(brand.id, brand.difficulty, allBrands, 3);
        const optionIds = shuffle([brand.id, ...distractors.map((d) => d.id)]);
        exercises.push({
          kind: config.type,
          id: uid(),
          isRetry: false,
          correctId: brand.id,
          optionIds,
        });
      }
    } else if (config.type === "TRUE_FALSE") {
      for (const brand of pool.slice(0, count)) {
        const showCorrect = Math.random() > 0.5;
        const shownBrandId = showCorrect
          ? brand.id
          : (pickDistractors(brand.id, brand.difficulty, allBrands, 1)[0]?.id ?? brand.id);
        exercises.push({
          kind: "TRUE_FALSE",
          id: uid(),
          isRetry: false,
          targetBrandId: brand.id,
          shownBrandId,
          isMatch: shownBrandId === brand.id,
        });
      }
    }
  }

  return exercises.slice(0, MAX_EXERCISES);
}

export function retryOf(ex: Exercise): Exercise {
  return { ...ex, id: uid(), isRetry: true };
}
