import { FastifyReply, FastifyRequest } from "fastify";
import userService from "../services/userService";
import z from "zod";
import { createUserSchema, getUserSchema } from "../schemas/userSchema";

type UserRequest = FastifyRequest<{
  Params: z.infer<typeof getUserSchema.params>;
  Body: z.infer<typeof createUserSchema.body>;
}>

async function getAllUsers(request: FastifyRequest, reply: FastifyReply) {
  const {users} = await userService.getAllUsers();

  if (users.length === 0) {
    return reply.code(200).send({ message: "No users created yet", users });
  }

  return reply.code(200).send({ message: "Users found", users });
}

async function getUser(request: UserRequest, reply: FastifyReply) {
  const id = request.params.id;
  const user = await userService.getUserById(id);

  if (!user) {
    return reply.code(404).send({ message: "User not found" });
  }

  return reply.code(200).send({ message: "User found", user });
}

async function createUser(request: UserRequest, reply: FastifyReply) {
  const { name, email, password } = request.body;
  const user = await userService.createUser({ name, email, password });
  
  if (user.message === "User already exists") {
    return reply.code(400).send({ message: "User already exists" });
  } else {
    return reply.code(201).send(user);
  }
}

async function updateUser(request: UserRequest, reply: FastifyReply) {
  const id = request.params.id;
  const { name, email, password } = request.body;

  const user = await userService.updateUser(id, { name, email, password });

  if (!user) {
    return reply.code(404).send({ message: "User not found" });
  } else {
    return reply.code(200).send({ message: "User updated", user });
  }
}

async function deleteUser(request: UserRequest, reply: FastifyReply){
  const id = request.params.id;
  const user = await userService.deleteUser(id);
  if (user.message === "User not found") {
    return reply.code(400).send({message: "User not found"});
  } else {
    return reply.code(200).send({message: "User deleted"});
  }
}

export default {getAllUsers, getUser, createUser, updateUser, deleteUser};