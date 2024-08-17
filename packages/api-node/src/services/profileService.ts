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
            name: user?.name,
            email: user?.email,
            password: user?.password,
        }
    }
  
}
export default { profile }