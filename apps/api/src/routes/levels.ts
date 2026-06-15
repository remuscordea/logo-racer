import type { FastifyInstance } from "fastify";
import { prisma } from "../prisma.js";

export async function levelRoutes(app: FastifyInstance) {
  app.get<{ Querystring: { worldId?: string } }>("/levels", async (request) => {
    const { worldId } = request.query;
    return prisma.level.findMany({
      where: worldId ? { worldId: Number(worldId) } : undefined,
      orderBy: [{ worldId: "asc" }, { order: "asc" }],
    });
  });

  app.get<{ Params: { id: string } }>("/levels/:id", async (request, reply) => {
    const id = Number(request.params.id);
    const level = await prisma.level.findUnique({ where: { id } });
    if (!level) {
      return reply.code(404).send({ error: "Level not found" });
    }
    return level;
  });
}
