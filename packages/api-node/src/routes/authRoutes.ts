import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { loginSchema, registerSchema } from "../schemas/authSchema"
import authController from "../controllers/authController"

export async function authRoutes(server: FastifyInstance) {
  // rota para realizar login
  server.withTypeProvider<ZodTypeProvider>().post('/login',{
    schema: loginSchema
  }, authController.login);

  // rota para realizar registro de usuário
  server.withTypeProvider<ZodTypeProvider>().post('/register',{
    schema: registerSchema
  }, authController.register)
}