import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { timelineSchema } from "../schemas/timelineSchema"
import { verifyJWT } from "../middlewares/verify-jwt"
import timelineController from "../controllers/timelineController"

export async function timelineRoutes(server: FastifyInstance) {

  // rota para buscar o timeline
  server.withTypeProvider<ZodTypeProvider>().get('/timeline',{
    schema: timelineSchema,
    onRequest: [verifyJWT]
  }, timelineController.timeline)
}