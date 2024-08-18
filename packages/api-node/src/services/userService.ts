import { User } from "../types/user"
import { prisma } from "../utils/prisma"
import bcrypt from 'bcrypt'

async function getAllUsers() {

  // buscar todos os usuários no banco de dados
  const users = await prisma.user.findMany()
  return {
    users: users.map(user => ({
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString()
    }))
  };
}

async function getUserById(id: string) {

  // buscar usuário no banco de dados
  const user = await prisma.user.findFirst({ where: { id } });

  // verificar se o usuário existe
  if (!user) {
    return null
  }

  return {
    name: user.name,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

async function createUser({ name, email, password }: User) {

  // Buscar usuário no banco de dados pelo email
  const userExist = await prisma.user.findFirst({ where: { email } });

  // Verificar se o usuário já existe
  if (userExist) {
    return { message: "User already exists" }
  }

  // Criptografar senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criar usuário
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  return { 
    message: "User created",
    user: {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }
  }
}

async function updateUser(id: string, { name, email }: Partial<User>) {

  // Buscar usuário no banco de dados
  const user = await prisma.user.findFirst({ where: { id } })

  // Verificar se o usuário existe
  if (!user) {
    return null
  }

  // Verificar se a senha está correta
  // const samePassword = await bcrypt.compare(password, user.password)

  // atualizar usuário no banco de dados
  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
      // password: samePassword ? user.password : await bcrypt.hash(password, 10),
      updatedAt: new Date(),
    },
  })

  return {
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    createdAt: updatedUser.createdAt.toISOString(),
    updatedAt: updatedUser.updatedAt.toISOString(),
  };
}

async function deleteUser(id: string) {

  // buscar usuário no banco de dados
  const user = await prisma.user.findFirst({where: {id}})

  // verificar se o usuário existe
  if (!user) {
    return {message: "User not found"}
  }

  await prisma.user.delete({where: {id}})
  return {message: "User deleted"};
}

export default{ getAllUsers, getUserById, createUser, updateUser, deleteUser }