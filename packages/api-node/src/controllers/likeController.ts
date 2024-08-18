import { FastifyRequest, FastifyReply } from "fastify"
import { likeSchema, unlikeSchema } from "../schemas/likeSchema"
import z from "zod"
import likeService from "../services/likeService"

type LikeRequest = FastifyRequest<{
  Body: z.infer<typeof likeSchema.body>
}>

type unlikeRequest = FastifyRequest<{
  Params: z.infer<typeof unlikeSchema.params>
}>

async function likePost(request: LikeRequest, reply: FastifyReply){

  // pega o id do usuário e do post do corpo da requisição
  const {userid, postid} = request.body

  // chama o serviço de like e passa o id do usuário e do post como parâmetros
  const like = await likeService.likePost({userid, postid})

  // verifica se o post não foi encontrado
  if (like.message === "Post not found") {
    reply.code(400).send({message: "Post not found"})
  }

  // verifica se o usuário não foi encontrado
  if(like.message === "User not found") {
    reply.code(400).send({message: "User not found"})
  } else {
    reply.code(201).send({
      message: "Post liked", 
      like: {
        id: like.id,
        userId: like.userid,
        postId: like.postid
      }
    })
  }
}

async function unlikePost(request: unlikeRequest, reply: FastifyReply){

  // pega o id do like dos parâmetros da requisição
  const { id } = request.params

  // chama o serviço de unlike e passa o id do like como parâmetro
  const like = await likeService.unlikePost({ id })

  // verifica se o like não foi encontrado
  if (like.message === "Post not found") {
    reply.code(400).send({message: "Post not found"})
  }

  // verifica se o usuário não foi encontrado
  if(like.message === "User not found") {
    reply.code(400).send({message: "User not found"})
  } else {
    reply.code(200).send({
      message: "Post unliked", 
    })
  }
}

export default { likePost, unlikePost }