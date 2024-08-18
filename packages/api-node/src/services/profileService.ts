import { prisma } from "../utils/prisma"

async function profile(id : string) {

    // buscar usuário no banco de dados
    const user = await prisma.user.findFirst({ where: { id } });

    // verificar se o usuário existe
    if (!user) {
        return null;
    }
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString()
        }
    }
  
}
export default { profile }