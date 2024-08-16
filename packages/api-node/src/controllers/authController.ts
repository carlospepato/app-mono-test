import { FastifyReply, FastifyRequest } from "fastify";
import authService from "../services/authService";
import z from "zod";
import { loginSchema, registerSchema } from "../schemas/authSchema";

type RegisterRequest = FastifyRequest<{
  Body: z.infer<typeof registerSchema.body>;
}>

type LoginRequest = FastifyRequest<{
  Body: z.infer<typeof loginSchema.body>;
}>

async function login(request: LoginRequest, reply: FastifyReply) {
  const { email, password } = request.body;
  const userLogin = await authService.login(password, { email });

  if (!userLogin) {
    return reply.code(400).send({ message: "Invalid credentials" });
  }
  return reply.code(200).send(userLogin);

  
}

async function register(request: RegisterRequest, reply: FastifyReply) {
  const { name, email, password } = request.body;
  const userRegister = await authService.register({ name, email, password });

  if (userRegister.message === "User already exists") {
    return reply.code(400).send({ message: "User already exists" });
  } else {
    return reply.code(201).send(userRegister);
  }
}

export default { login, register };