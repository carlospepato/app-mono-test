import { User } from "../types/user";
import { prisma } from "../utils/prisma";
import bcrypt from 'bcrypt';

async function login(password : string, { email }: Partial<User>) {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
        return { message: "User not found" };
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return { message: "Invalid password" };
    }
    return {
        message: "Logged in",
        user: {
            name: user.name,
            email: user.email,
        }
    };
}

async function register({ name, email, password }: User) {
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
        }
    };
}

export default { login, register };