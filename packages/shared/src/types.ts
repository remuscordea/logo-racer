export enum ExerciseType {
  LOGO_TO_NAME = "LOGO_TO_NAME",
  NAME_TO_LOGO = "NAME_TO_LOGO",
  MATCHING = "MATCHING",
  TRUE_FALSE = "TRUE_FALSE",
}

export interface Brand {
  id: number;
  name: string;
  logoSvgPath: string;
  difficulty: number;
  createdAt: string;
  updatedAt: string;
}

export interface World {
  id: number;
  name: string;
  order: number;
  description: string;
}

export interface ExerciseConfig {
  type: ExerciseType;
  brandIds: number[];
}

export interface Level {
  id: number;
  worldId: number;
  order: number;
  exerciseConfig: ExerciseConfig[];
}

export interface Progress {
  id: number;
  userId: number | null;
  levelId: number;
  completed: boolean;
  stars: number;
  completedAt: string | null;
}
