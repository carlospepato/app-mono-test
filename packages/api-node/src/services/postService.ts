import { Post } from "../types/post";
import { prisma } from "../utils/prisma";

async function getAllPost(){
  const post = await prisma.post.findMany();
  return {message: "Posts found", post};
}

async function getPostById(id: string) {
  const post = await prisma.post.findFirst({where: {id}});
  if (!post) {
    return {message: "Post not found"};
  }
  return {message: "Post found", post};
}

async function createPost({content, userid} : Post) {
  const post = await prisma.post.create({
    data:{
      content,
      userid
    }
  });

  return {message: "Post created", post};
}

export default { getAllPost, getPostById, createPost};