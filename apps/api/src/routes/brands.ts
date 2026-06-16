import type { FastifyInstance } from "fastify";
import { prisma } from "../prisma.js";

export async function brandRoutes(app: FastifyInstance) {
  app.get<{ Querystring: { difficulty?: string } }>("/brands", async (request) => {
    const { difficulty } = request.query;
    return prisma.brand.findMany({
      where: difficulty ? { difficulty: Number(difficulty) } : undefined,
      orderBy: [{ difficulty: "asc" }, { name: "asc" }],
    });
  });

  app.get<{ Params: { id: string } }>("/brands/:id", async (request, reply) => {
    const id = Number(request.params.id);
    const brand = await prisma.brand.findUnique({ where: { id } });
    if (!brand) return reply.code(404).send({ error: "Brand not found" });
    return brand;
  });
}
