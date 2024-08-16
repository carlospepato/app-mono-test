import { User } from "../types/user";
import { prisma } from "../utils/prisma";
import bcrypt from 'bcrypt';

async function getAllUsers() {
  const users = await prisma.user.findMany();
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
  const user = await prisma.user.findFirst({ where: { id } });

  if (!user) {
    return null;
  }

  return {
    name: user.name,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

async function createUser({ name, email, password }: User) {
  const userExist = await prisma.user.findFirst({ where: { email } });
  if (userExist) {
    return { message: "User already exists" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { 
    message: "User created",
    user: {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }
  };
}

async function updateUser(id: string, password : string, { name, email }: Partial<User>) {
  const user = await prisma.user.findFirst({ where: { id } });

  if (!user) {
    return null;
  }
  const samePassword = await bcrypt.compare(password, user.password);
  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
      password: samePassword ? user.password : await bcrypt.hash(password, 10),
      updatedAt: new Date(),
    },
  });

  return {
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    createdAt: updatedUser.createdAt.toISOString(),
    updatedAt: updatedUser.updatedAt.toISOString(),
  };
}

async function deleteUser(id: string) {
  const user = await prisma.user.findFirst({where: {id}});
  if (!user) {
    return {message: "User not found"};
  }

  await prisma.user.delete({where: {id}});
  return {message: "User deleted"};
}

export default{
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};