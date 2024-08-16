import { FastifyInstance } from "fastify";
import { createPostSchema, getAllPostsSchema, getPostSchema } from "../schemas/postSchema";
import postController from "../controllers/postController";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export async function postRoutes(server: FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().get('/posts',{
    schema: getAllPostsSchema
  }, postController.getAllPosts);

  server.withTypeProvider<ZodTypeProvider>().get('/post/:id',{
    schema: getPostSchema
  }, postController.getPost);

  server.withTypeProvider<ZodTypeProvider>().post('/post',{
    schema: createPostSchema
  }, postController.createPost);
}