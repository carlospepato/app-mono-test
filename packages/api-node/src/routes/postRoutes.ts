import { FastifyInstance } from "fastify"
import { createPostSchema, getAllPostsSchema, getPostSchema } from "../schemas/postSchema"
import postController from "../controllers/postController"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export async function postRoutes(server: FastifyInstance) {

  // rota para buscar todos os posts
  server.withTypeProvider<ZodTypeProvider>().get('/posts',{
    schema: getAllPostsSchema
  }, postController.getAllPosts)

  // rota para buscar um post especifico
  server.withTypeProvider<ZodTypeProvider>().get('/post/:id',{
    schema: getPostSchema
  }, postController.getPost)

  // rota para criar um novo post
  server.withTypeProvider<ZodTypeProvider>().post('/post',{
    schema: createPostSchema
  }, postController.createPost)
}