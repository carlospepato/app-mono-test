import { Post } from "../types/post"
import { prisma } from "../utils/prisma"

async function getAllPost(){

  // buscar todos os posts no banco de dados
  const posts = await prisma.post.findMany()
  return {
    posts: posts.map(post => ({
      id: post.id,
      content: post.content,
      userid: post.userid
    }))
  };
}

async function getPostById(id: string) {

  // buscar post no banco de dados pelo id
  const post = await prisma.post.findFirst({where: {id}})
  if (!post) {
    return null;
  }
  return {
    id: post.id,
    content: post.content,
    userid: post.userid
  };
}

async function createPost({content, userid} : Post) {

  // criar post no banco de dados
  const post = await prisma.post.create({
    data:{
      content,
      userid
    }
  });

  return {
    id: post.id,
    content: post.content,
    createdAt: post.createdAt.toISOString()
  };
}

export default { getAllPost, getPostById, createPost}