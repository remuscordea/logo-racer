import Fastify from "fastify";
import cors from "@fastify/cors";
import { brandRoutes } from "./routes/brands.js";
import { worldRoutes } from "./routes/worlds.js";
import { levelRoutes } from "./routes/levels.js";

const app = Fastify({ logger: true });

await app.register(cors, { origin: true });

app.get("/health", async () => ({ status: "ok" }));

await app.register(brandRoutes);
await app.register(worldRoutes);
await app.register(levelRoutes);

const port = Number(process.env.PORT ?? 3001);

app
  .listen({ port, host: "0.0.0.0" })
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
