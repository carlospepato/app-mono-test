import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { getProfileSchema } from "../schemas/profileSchema"
import profileController from "../controllers/profileController"
import { verifyJWT } from "../middlewares/verify-jwt"

export async function profileRoutes(server: FastifyInstance) {

  // rota para buscar o perfil do usuário
  server.withTypeProvider<ZodTypeProvider>().get('/profile',{
    schema: getProfileSchema,
    onRequest: [verifyJWT]
  }, profileController.profile)
}