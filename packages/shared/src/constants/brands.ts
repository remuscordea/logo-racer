export interface BrandSeed {
  name: string;
  logoPngPath: string;
  difficulty: number;
}

export const INITIAL_BRANDS: BrandSeed[] = [
  // World 1 — Famous Brands (difficulty 1)
  { name: "BMW",     logoPngPath: "/assets/logos/bmw.png",     difficulty: 1 },
  { name: "Ferrari", logoPngPath: "/assets/logos/ferrari.png", difficulty: 1 },
  { name: "Ford",    logoPngPath: "/assets/logos/ford.png",    difficulty: 1 },
  { name: "Tesla",   logoPngPath: "/assets/logos/tesla.png",   difficulty: 1 },
  { name: "Toyota",  logoPngPath: "/assets/logos/toyota.png",  difficulty: 1 },
  { name: "VW",      logoPngPath: "/assets/logos/vw.png",      difficulty: 1 },
  // World 2 — On the Street (difficulty 2)
  { name: "Audi",    logoPngPath: "/assets/logos/audi.png",    difficulty: 2 },
  { name: "Dacia",   logoPngPath: "/assets/logos/dacia.png",   difficulty: 2 },
  { name: "Hyundai", logoPngPath: "/assets/logos/hyundai.png", difficulty: 2 },
  { name: "Kia",     logoPngPath: "/assets/logos/kia.png",     difficulty: 2 },
  { name: "Renault", logoPngPath: "/assets/logos/renault.png", difficulty: 2 },
  { name: "Volvo",   logoPngPath: "/assets/logos/volvo.png",   difficulty: 2 },
  // World 3 — Special Cars (difficulty 3)
  { name: "Bentley", logoPngPath: "/assets/logos/bentley.png", difficulty: 3 },
  { name: "Citroën", logoPngPath: "/assets/logos/citroen.png", difficulty: 3 },
  { name: "Nissan",  logoPngPath: "/assets/logos/nissan.png",  difficulty: 3 },
  { name: "Porsche", logoPngPath: "/assets/logos/porsche.png", difficulty: 3 },
  { name: "Subaru",  logoPngPath: "/assets/logos/subaru.png",  difficulty: 3 },
  { name: "Suzuki",  logoPngPath: "/assets/logos/suzuki.png",  difficulty: 3 },
];
