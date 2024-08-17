import { Like, Unlike } from "../types/like"
import { prisma } from "../utils/prisma"

async function likePost({postid, userid} : Like) {
  // buscar post no banco de dados
  const post = await prisma.post.findFirst({where: {id: postid}})

  // verificar se o post existe
  if (!post) {
    return {message: "Post not found"}
  }

  // buscar usuário no banco de dados
  const user = await prisma.user.findFirst({where: {id: userid}})

  // verificar se o usuário existe
  if (!user) {
    return {message: "User not found"}
  }

  // criar like no banco de dados
  const like = await prisma.like.create({
    data:{
      postid,
      userid,
    }
  });

  return {
    userid: like.userid,
    postid: like.postid
  };
  
}

async function unlikePost({ id } : Unlike) {

  // buscar like no banco de dados
  const like = await prisma.like.findFirst({where: {id}})

  // verificar se o like existe
  if (!like) {
    return {message: "Like not found"}
  }

  // deletar like no banco de dados
  await prisma.like.delete({where: {id: like.id}})
  return {message: "Post unliked"}
}

export default { likePost, unlikePost }