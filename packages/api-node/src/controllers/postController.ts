import { FastifyReply, FastifyRequest } from "fastify"
import postService from "../services/postService"
import z from "zod"
import { createPostSchema, getPostSchema } from "../schemas/postSchema"

type PostRequest = FastifyRequest<{
  Params: z.infer<typeof getPostSchema.params>
  Body: z.infer<typeof createPostSchema.body>
}>

async function getAllPosts(request: FastifyRequest, reply: FastifyReply) {

  // chama o serviço de post e pega todos os posts
  const {posts} = await postService.getAllPost()

  // verifica se não existe nenhum post
  if (posts.length === 0) {
    return reply.code(200).send({ message: "No post created yet", posts })
  }

  return reply.code(200).send({ message: "Posts found", posts })
}

async function getPost(request: PostRequest, reply: FastifyReply){

  // pega o id do post dos parâmetros da requisição
  const id = request.params.id;

  // chama o serviço de post e passa o id do post como parâmetro
  const post = await postService.getPostById(id)

  // verifica se o post não foi encontrado
  if (!post) {
    reply.code(400).send({message: "Post not found"})
  } else {
    reply.code(200).send({message: "Post found", post})
  }
}

async function createPost(request: PostRequest, reply: FastifyReply){

  // pega o conteudo e o id do usuário do corpo da requisição
  const {content, userid} = request.body

  // chama o serviço de post e passa o conteudo e o id do usuário como parâmetros
  const post = await postService.createPost({content, userid})
  reply.code(201).send({message: "Post created", post})
}

export default {getAllPosts, getPost, createPost}