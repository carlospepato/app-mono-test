import { FastifyRequest, FastifyReply } from "fastify"
import { likeSchema, unlikeSchema } from "../schemas/likeSchema";
import z from "zod";
import likeService from "../services/likeService";

type PostRequest = FastifyRequest<{
  Params: z.infer<typeof unlikeSchema.body>;
  Body: z.infer<typeof likeSchema.body>;
}>

async function likePost(request: PostRequest, reply: FastifyReply){
  const {userid, postid} = request.body;
  const like = await likeService.likePost({userid, postid});
  if (like.message === "Post already liked") {
    reply.code(400).send({message: "Post already liked"});
  } else {
    reply.code(201).send({message: "Post liked", like});
  }
}

async function unlikePost(request: PostRequest, reply: FastifyReply){
  const {userid, postid} = request.body;
  const like = await likeService.unlikePost({userid, postid});
  if (like.message === "Like not found") {
    reply.code(400).send({message: "Like not found"});
  } else {
    reply.code(200).send({message: "Post unliked", like});
  }
}

export default { likePost, unlikePost };