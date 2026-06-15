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
    description: "Meet the most famous car brands in the world.",
    brandNames: ["Ferrari", "BMW", "Mercedes-Benz", "Toyota", "Tesla"],
  },
  {
    name: "On the Street",
    order: 2,
    description: "Cars you see every day on the road.",
    brandNames: ["Volkswagen", "Ford", "Honda", "Renault", "Fiat"],
  },
  {
    name: "Special Cars",
    order: 3,
    description: "Sporty and special cars.",
    brandNames: ["Lamborghini", "Porsche", "Audi", "Jeep", "Mini"],
  },
];
