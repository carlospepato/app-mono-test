import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { loginSchema, registerSchema } from "../schemas/authSchema";
import authController from "../controllers/authController";

export async function authRoutes(server: FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().post('/login',{
    schema: loginSchema
  }, authController.login);

  server.withTypeProvider<ZodTypeProvider>().post('/register',{
    schema: registerSchema
  }, authController.register);
}