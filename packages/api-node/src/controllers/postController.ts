import { FastifyReply, FastifyRequest } from "fastify";
import postService from "../services/postService";
import z from "zod";
import { createPostSchema, getPostSchema } from "../schemas/postSchema";

type PostRequest = FastifyRequest<{
  Params: z.infer<typeof getPostSchema.params>;
  Body: z.infer<typeof createPostSchema.body>;
}>

async function getAllPosts(request: FastifyRequest, reply: FastifyReply) {
  const {posts} = await postService.getAllPost();
  if (posts.length === 0) {
    return reply.code(200).send({ message: "No post created yet", posts });
  }

  return reply.code(200).send({ message: "Posts found", posts });
}

async function getPost(request: PostRequest, reply: FastifyReply){
  const id = request.params.id;
  const post = await postService.getPostById(id);
  if (!post) {
    reply.code(400).send({message: "Post not found"});
  } else {
    reply.code(200).send({message: "Post found", post});
  }
}

async function createPost(request: PostRequest, reply: FastifyReply){
  const {content, userid} = request.body;
  const post = await postService.createPost({content, userid});
  reply.code(201).send({message: "Post created", post});
}

export default {getAllPosts, getPost, createPost};