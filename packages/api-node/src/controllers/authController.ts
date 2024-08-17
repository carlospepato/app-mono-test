import { FastifyReply, FastifyRequest } from "fastify"
import authService from "../services/authService"
import z from "zod"
import { loginSchema, registerSchema } from "../schemas/authSchema"

type RegisterRequest = FastifyRequest<{
  Body: z.infer<typeof registerSchema.body>
}>

type LoginRequest = FastifyRequest<{
  Body: z.infer<typeof loginSchema.body>
}>

async function login(request: LoginRequest, reply: FastifyReply) {

  // pega o email e senha do corpo da requisição
  const { email, password } = request.body

  // chama o serviço de login e passa o email e senha como parâmetros
  const userLogin = await authService.login(email, password)
  
  // verifica se o usuário não foi encontrado
  if (!userLogin) {
    return reply.code(400).send({ message: "Wrong email or password" })
  }

  // verifica se o nome do usuário está vazio
  if (!userLogin.user.name) {
    return reply.code(400).send({ message: "User not found" })
  }

  // cria um token com o id do usuário
  const token = await reply.jwtSign(
    { },
    {
      sign: {
        sub: userLogin.user.id,
      }
  })

  return reply.code(200).send({
    message: "User logged in",
    token: token,
    user: {
      name: userLogin.user.name,
      email: userLogin.user.email,
    }
  })
}

async function register(request: RegisterRequest, reply: FastifyReply) {

  // pega o nome, email e senha do corpo
  const { name, email, password } = request.body

  // chama o serviço de registro e passa o nome, email e senha como parâmetros
  const userRegister = await authService.register({ name, email, password })

  // verifica se o usuário já existe
  if (userRegister.message === "User already exists") {
    return reply.code(400).send(userRegister)
  } else {
    return reply.code(201).send(
      {
        message: "User created",
        user: {
          name: userRegister.user.name,
          email: userRegister.user.email,
        }
      })
  }
}

export default { login, register }