import { User } from "../types/user"
import { prisma } from "../utils/prisma"
import bcrypt from 'bcrypt'

async function login(password : string, email : string) {

    // buscar usuário no banco de dados
    const user = await prisma.user.findFirst({ where: { email } })

    // verificar se o usuário existe
    if (!user) {
        return {
            user: {
                name: "",
                email: "",
            }
        }
    }

    // verificar se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return null;
    }
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    };
}

async function register({ name, email, password }: User) {

    // buscar usuário no banco de dados
    const userExist = await prisma.user.findFirst({ where: { email } })

    // verificar se o usuário já existe
    if (userExist) {
        return {
            message: "User already exists",
            user: {
                name: userExist.name,
                email: userExist.email,
            }
        }
    }

    // criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // criar usuário
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    return {
        user: {
            name: user.name,
            email: user.email,
        }
    };
}

export default { login, register }