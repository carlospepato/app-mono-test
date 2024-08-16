import { FastifyRequest, FastifyReply } from "fastify"
import { likeSchema, unlikeSchema } from "../schemas/likeSchema";
import z from "zod";
import likeService from "../services/likeService";

type LikeRequest = FastifyRequest<{
  Body: z.infer<typeof likeSchema.body>;
}>

type unlikeRequest = FastifyRequest<{
  Params: z.infer<typeof unlikeSchema.params>;
}>

async function likePost(request: LikeRequest, reply: FastifyReply){
  const {userid, postid} = request.body;
  const like = await likeService.likePost({userid, postid});
  if (like.message === "Post not found") {
    reply.code(400).send({message: "Post not found"});
  }
  if(like.message === "User not found") {
    reply.code(400).send({message: "User not found"});
  } else {
    reply.code(201).send({
      message: "Post liked", 
      like: {
        userId: like.userid,
        postId: like.postid
      }
    });
  }
}

async function unlikePost(request: unlikeRequest, reply: FastifyReply){
  const { id } = request.params;
  const like = await likeService.unlikePost({ id });
  if (like.message === "Post not found") {
    reply.code(400).send({message: "Post not found"});
  }
  if(like.message === "User not found") {
    reply.code(400).send({message: "User not found"});
  } else {
    reply.code(200).send({
      message: "Post unliked", 
    });
  }
}

export default { likePost, unlikePost };