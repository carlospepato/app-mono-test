import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { createUserSchema, deleteUserSchema, getAllUsersSchema, getUserSchema, updateUserSchema } from "../schemas/userSchema";
import userController from "../controllers/userController";

export async function userRoutes(server: FastifyInstance){
  server.withTypeProvider<ZodTypeProvider>().get('/users',{
    schema: getAllUsersSchema
  }, userController.getAllUsers);

  server.withTypeProvider<ZodTypeProvider>().get('/user/:id',{
    schema: getUserSchema
  }, userController.getUser);

  server.withTypeProvider<ZodTypeProvider>().post('/user',{
    schema: createUserSchema
  }, userController.createUser);

  server.withTypeProvider<ZodTypeProvider>().put('/user/:id',{
    schema: updateUserSchema
  }, userController.updateUser);

  server.withTypeProvider<ZodTypeProvider>().delete('/user/:id',{
    schema: deleteUserSchema
  }, userController.deleteUser);
}