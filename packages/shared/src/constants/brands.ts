export interface BrandSeed {
  name: string;
  logoSvgPath: string;
  difficulty: number;
}

export const INITIAL_BRANDS: BrandSeed[] = [
  { name: "Toyota", logoSvgPath: "/logos/toyota.svg", difficulty: 1 },
  { name: "BMW", logoSvgPath: "/logos/bmw.svg", difficulty: 1 },
  { name: "Mercedes-Benz", logoSvgPath: "/logos/mercedes-benz.svg", difficulty: 1 },
  { name: "Audi", logoSvgPath: "/logos/audi.svg", difficulty: 2 },
  { name: "Volkswagen", logoSvgPath: "/logos/volkswagen.svg", difficulty: 1 },
  { name: "Ford", logoSvgPath: "/logos/ford.svg", difficulty: 1 },
  { name: "Honda", logoSvgPath: "/logos/honda.svg", difficulty: 2 },
  { name: "Ferrari", logoSvgPath: "/logos/ferrari.svg", difficulty: 1 },
  { name: "Lamborghini", logoSvgPath: "/logos/lamborghini.svg", difficulty: 2 },
  { name: "Porsche", logoSvgPath: "/logos/porsche.svg", difficulty: 2 },
  { name: "Tesla", logoSvgPath: "/logos/tesla.svg", difficulty: 1 },
  { name: "Renault", logoSvgPath: "/logos/renault.svg", difficulty: 2 },
  { name: "Fiat", logoSvgPath: "/logos/fiat.svg", difficulty: 2 },
  { name: "Jeep", logoSvgPath: "/logos/jeep.svg", difficulty: 2 },
  { name: "Mini", logoSvgPath: "/logos/mini.svg", difficulty: 3 },
];
