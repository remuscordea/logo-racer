export interface WorldSeed {
  name: string;
  order: number;
  description: string;
  brandNames: string[];
}

export const INITIAL_WORLDS: WorldSeed[] = [
  {
    name: "Famous Brands",
    order: 1,
    description: "The most famous car brands in the world.",
    brandNames: ["BMW", "Ferrari", "Ford", "Tesla", "Toyota", "VW"],
  },
  {
    name: "On the Street",
    order: 2,
    description: "Cars you see every day on the road.",
    brandNames: ["Audi", "Dacia", "Hyundai", "Kia", "Renault", "Volvo"],
  },
  {
    name: "Special Cars",
    order: 3,
    description: "Sporty and special cars.",
    brandNames: ["Bentley", "Citroën", "Nissan", "Porsche", "Subaru", "Suzuki"],
  },
];

export interface LevelSeed {
  worldName: string;
  order: number;
  exerciseConfig: Array<{ type: string; count: number }>;
}

export const INITIAL_LEVELS: LevelSeed[] = [
  // World 1
  { worldName: "Famous Brands",  order: 1, exerciseConfig: [{ type: "LOGO_TO_NAME", count: 4 }] },
  { worldName: "Famous Brands",  order: 2, exerciseConfig: [{ type: "NAME_TO_LOGO", count: 5 }] },
  { worldName: "Famous Brands",  order: 3, exerciseConfig: [{ type: "MATCHING", count: 4 }, { type: "TRUE_FALSE", count: 4 }] },
  // World 2
  { worldName: "On the Street",  order: 1, exerciseConfig: [{ type: "LOGO_TO_NAME", count: 4 }] },
  { worldName: "On the Street",  order: 2, exerciseConfig: [{ type: "NAME_TO_LOGO", count: 5 }] },
  { worldName: "On the Street",  order: 3, exerciseConfig: [{ type: "MATCHING", count: 4 }, { type: "TRUE_FALSE", count: 4 }] },
  // World 3
  { worldName: "Special Cars",   order: 1, exerciseConfig: [{ type: "LOGO_TO_NAME", count: 4 }] },
  { worldName: "Special Cars",   order: 2, exerciseConfig: [{ type: "NAME_TO_LOGO", count: 5 }] },
  { worldName: "Special Cars",   order: 3, exerciseConfig: [{ type: "MATCHING", count: 4 }, { type: "TRUE_FALSE", count: 4 }] },
];
