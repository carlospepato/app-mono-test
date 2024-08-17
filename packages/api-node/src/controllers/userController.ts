import { FastifyReply, FastifyRequest } from "fastify"
import userService from "../services/userService"
import z from "zod"
import { createUserSchema, getUserSchema } from "../schemas/userSchema"

type UserRequest = FastifyRequest<{
  Params: z.infer<typeof getUserSchema.params>
  Body: z.infer<typeof createUserSchema.body>
}>

async function getAllUsers(request: FastifyRequest, reply: FastifyReply) {

  // chama o serviço de usuário e pega todos os usuários
  const {users} = await userService.getAllUsers()

  // verifica se não existe nenhum usuário
  if (users.length === 0) {
    return reply.code(200).send({ message: "No users created yet", users })
  }

  return reply.code(200).send({ message: "Users found", users })
}

async function getUser(request: UserRequest, reply: FastifyReply) {

  // pega o id do usuário dos parâmetros da requisição
  const id = request.params.id;

  // chama o serviço de usuário e passa o id do usuário como parâmetro
  const user = await userService.getUserById(id)

  // verifica se o usuário não foi encontrado
  if (!user) {
    return reply.code(404).send({ message: "User not found" })
  }

  return reply.code(200).send({ message: "User found", user })
}

async function createUser(request: UserRequest, reply: FastifyReply) {

  // pega o nome, email e senha do corpo da requisição
  const { name, email, password } = request.body;

  // chama o serviço de criação de usuário e passa o nome, email e senha como parâmetros
  const user = await userService.createUser({ name, email, password })
  
  // verifica se o usuário já existe
  if (user.message === "User already exists") {
    return reply.code(400).send({ message: "User already exists" })
  } else {
    return reply.code(201).send(user)
  }
}

async function updateUser(request: UserRequest, reply: FastifyReply) {

  // pega o id do usuário dos parâmetros da requisição
  const id = request.params.id

  // pega o nome, email e senha do corpo da requisição
  const { name, email, password } = request.body

  // chama o serviço de atualização de usuário e passa o id, nome, email e senha como parâmetros
  const user = await userService.updateUser(id, password,{ name, email })

  if (!user) {
    return reply.code(404).send({ message: "User not found" })
  } else {
    return reply.code(200).send({ message: "User updated", user })
  }
}

async function deleteUser(request: UserRequest, reply: FastifyReply){

  // pega o id do usuário dos parâmetros da requisição
  const id = request.params.id

  // chama o serviço de deleção de usuário e passa o id do usuário como parâmetro
  const user = await userService.deleteUser(id)

  // verifica se o usuário não foi encontrado
  if (user.message === "User not found") {
    return reply.code(400).send({message: "User not found"})
  } else {
    return reply.code(200).send({message: "User deleted"})
  }
}

export default {getAllUsers, getUser, createUser, updateUser, deleteUser}