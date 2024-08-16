import { Like } from "../types/like";
import { prisma } from "../utils/prisma";

async function likePost({postid, userid} : Like) {
  const post = await prisma.post.findFirst({where: {id: postid}});
  if (!post) {
    return {message: "Post not found"};
  }

  const user = await prisma.user.findFirst({where: {id: userid}});
  if (!user) {
    return {message: "User not found"};
  }

  const like = await prisma.like.create({
    data:{
      postid,
      userid,
    }
  });

  return {message: "Post liked", like};
  
}

async function unlikePost({userid, postid} : Like) {
  const like = await prisma.like.findFirst({where: {userid, postid}});
  if (!like) {
    return {message: "Like not found"};
  }

  await prisma.like.delete({where: {id: like.id}});
  return {message: "Post unliked"};
}

export default { likePost, unlikePost };