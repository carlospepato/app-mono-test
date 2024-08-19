import { FastifyInstance } from "fastify"
import { getAllLikesSchema, likeSchema, unlikeSchema } from "../schemas/likeSchema"
import likeController from "../controllers/likeController"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export async function likeRoutes(server: FastifyInstance) {

  // rota para buscar todos os likes
  server.withTypeProvider<ZodTypeProvider>().get('/like', {
    schema: getAllLikesSchema
  }, likeController.getAllLikes)

  // rota para realizar like em um post
  server.withTypeProvider<ZodTypeProvider>().post('/like',{
    schema: likeSchema
  }, likeController.likePost)

  // rota para realizar unlike em um post
  server.withTypeProvider<ZodTypeProvider>().delete('/like/:id',{
    schema: unlikeSchema
  }, likeController.unlikePost)
}