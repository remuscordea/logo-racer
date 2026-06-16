import type { FastifyInstance } from "fastify";
import { prisma } from "../prisma.js";

export async function worldRoutes(app: FastifyInstance) {
  app.get("/worlds", async () => {
    return prisma.world.findMany({
      orderBy: { order: "asc" },
      include: { _count: { select: { levels: true } } },
    });
  });

  app.get<{ Params: { id: string } }>("/worlds/:id", async (request, reply) => {
    const id = Number(request.params.id);
    const world = await prisma.world.findUnique({
      where: { id },
      include: { levels: { orderBy: { order: "asc" } } },
    });
    if (!world) return reply.code(404).send({ error: "World not found" });
    return world;
  });

  app.get<{ Params: { id: string } }>("/worlds/:id/levels", async (request, reply) => {
    const id = Number(request.params.id);
    const world = await prisma.world.findUnique({ where: { id } });
    if (!world) return reply.code(404).send({ error: "World not found" });
    return prisma.level.findMany({
      where: { worldId: id },
      orderBy: { order: "asc" },
    });
  });
}
