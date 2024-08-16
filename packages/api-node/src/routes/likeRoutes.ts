import { FastifyInstance } from "fastify";
import { likeSchema, unlikeSchema } from "../schemas/likeSchema";
import likeController from "../controllers/likeController";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export async function likeRoutes(server: FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().post('/like',{
    schema: likeSchema
  }, likeController.likePost);

  server.withTypeProvider<ZodTypeProvider>().delete('/like/:id',{
    schema: unlikeSchema
  }, likeController.unlikePost);
}