import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { createUserSchema, deleteUserSchema, getAllUsersSchema, getUserSchema, updateUserSchema } from "../schemas/userSchema"
import userController from "../controllers/userController"

export async function userRoutes(server: FastifyInstance){

  // rota para buscar todos os usuários
  server.withTypeProvider<ZodTypeProvider>().get('/users',{
    schema: getAllUsersSchema
  }, userController.getAllUsers)

  // rota para buscar um usuário especifico
  server.withTypeProvider<ZodTypeProvider>().get('/user/:id',{
    schema: getUserSchema
  }, userController.getUser)

  // rota para criar um novo usuário
  server.withTypeProvider<ZodTypeProvider>().post('/user',{
    schema: createUserSchema
  }, userController.createUser)

  // rota para atualizar um usuário
  server.withTypeProvider<ZodTypeProvider>().put('/user/:id',{
    schema: updateUserSchema
  }, userController.updateUser)

  // rota para deletar um usuário
  server.withTypeProvider<ZodTypeProvider>().delete('/user/:id',{
    schema: deleteUserSchema
  }, userController.deleteUser)
}