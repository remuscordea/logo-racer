import { PrismaClient } from "@prisma/client";
import { INITIAL_BRANDS, INITIAL_WORLDS, INITIAL_LEVELS } from "@logo-racer/shared";

const prisma = new PrismaClient();

async function main() {
  await prisma.level.deleteMany();
  await prisma.world.deleteMany();
  await prisma.brand.deleteMany();

  console.log("Seeding brands…");
  for (const b of INITIAL_BRANDS) {
    await prisma.brand.create({ data: b });
  }

  console.log("Seeding worlds…");
  for (const w of INITIAL_WORLDS) {
    await prisma.world.create({
      data: { name: w.name, order: w.order, description: w.description },
    });
  }

  console.log("Seeding levels…");

  const worlds = await prisma.world.findMany();
  const worldByName = Object.fromEntries(worlds.map((w) => [w.name, w]));

  for (const l of INITIAL_LEVELS) {
    const world = worldByName[l.worldName];
    if (!world) throw new Error(`World not found: ${l.worldName}`);

    await prisma.level.create({
      data: { worldId: world.id, order: l.order, exerciseConfig: l.exerciseConfig },
    });
  }

  console.log("Seeding done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
