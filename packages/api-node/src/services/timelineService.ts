import { prisma } from "../utils/prisma"

async function timeline(id: string) {

  // buscar todos os posts no banco de dados
  const posts = await prisma.post.findMany({})

  // buscar todos os usuários no banco de dados
  const users = await prisma.user.findMany({})

  // criar um array de timeline com os posts e usuários correspondentes
  const timeline = posts.map(post => {
    const user = users.find(user => user.id === post.userid)
    return {
      id: post.id,
      content: post.content,
      createdAt: post.createdAt.toISOString(),
      user: {
        name: user?.name,
        email: user?.email
      }
    }
  })
  return timeline
}

export default { timeline }