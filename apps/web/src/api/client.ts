import type { Brand, World, Level } from "@logo-racer/shared";

const BASE = "http://localhost:3001";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

export type WorldWithLevels = World & { levels: Level[] };
export type WorldWithCount = World & { _count: { levels: number } };

export const api = {
  brands: () => get<Brand[]>("/brands"),
  brandsByDifficulty: (d: number) => get<Brand[]>(`/brands?difficulty=${d}`),
  worlds: () => get<WorldWithCount[]>("/worlds"),
  world: (id: number) => get<WorldWithLevels>(`/worlds/${id}`),
  worldBrands: (worldId: number) => get<Brand[]>(`/worlds/${worldId}/brands`),
  level: (id: number) => get<Level>(`/levels/${id}`),
};
