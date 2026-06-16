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
  exerciseConfig: Array<{
    type: string;
    brandNames: string[];
  }>;
}

export const INITIAL_LEVELS: LevelSeed[] = [
  // World 1
  {
    worldName: "Famous Brands",
    order: 1,
    exerciseConfig: [{ type: "LOGO_TO_NAME", brandNames: ["BMW", "Ferrari", "Toyota", "VW"] }],
  },
  {
    worldName: "Famous Brands",
    order: 2,
    exerciseConfig: [{ type: "NAME_TO_LOGO", brandNames: ["BMW", "Ferrari", "Toyota", "VW", "Ford"] }],
  },
  {
    worldName: "Famous Brands",
    order: 3,
    exerciseConfig: [
      { type: "MATCHING",   brandNames: ["BMW", "Ferrari", "Ford", "Tesla", "Toyota", "VW"] },
      { type: "TRUE_FALSE", brandNames: ["BMW", "Ferrari", "Ford", "Tesla", "Toyota", "VW"] },
    ],
  },
  // World 2
  {
    worldName: "On the Street",
    order: 1,
    exerciseConfig: [{ type: "LOGO_TO_NAME", brandNames: ["Audi", "Kia", "Renault", "Volvo"] }],
  },
  {
    worldName: "On the Street",
    order: 2,
    exerciseConfig: [{ type: "NAME_TO_LOGO", brandNames: ["Audi", "Kia", "Renault", "Volvo", "Hyundai"] }],
  },
  {
    worldName: "On the Street",
    order: 3,
    exerciseConfig: [
      { type: "MATCHING",   brandNames: ["Audi", "Dacia", "Hyundai", "Kia", "Renault", "Volvo"] },
      { type: "TRUE_FALSE", brandNames: ["Audi", "Dacia", "Hyundai", "Kia", "Renault", "Volvo"] },
    ],
  },
  // World 3
  {
    worldName: "Special Cars",
    order: 1,
    exerciseConfig: [{ type: "LOGO_TO_NAME", brandNames: ["Nissan", "Porsche", "Citroën", "Suzuki"] }],
  },
  {
    worldName: "Special Cars",
    order: 2,
    exerciseConfig: [{ type: "NAME_TO_LOGO", brandNames: ["Nissan", "Porsche", "Citroën", "Suzuki", "Subaru"] }],
  },
  {
    worldName: "Special Cars",
    order: 3,
    exerciseConfig: [
      { type: "MATCHING",   brandNames: ["Bentley", "Citroën", "Nissan", "Porsche", "Subaru", "Suzuki"] },
      { type: "TRUE_FALSE", brandNames: ["Bentley", "Citroën", "Nissan", "Porsche", "Subaru", "Suzuki"] },
    ],
  },
];
