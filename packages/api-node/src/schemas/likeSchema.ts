import z from "zod";

// tipagem das requisições de like e unlike

export const likeSchema = {
  tags: ['Like'],
  summary: 'Like a post',
  body: z.object({
    userid: z.string(),
    postid: z.string(),
  }),
  response: {
    201: z.object({
      message: z.string(),
      like: z.object({
        id: z.string(),
        userId: z.string(),
        postId: z.string(),
      }),
    }),
    400: z.object({
      message: z.string(),
    })
  }
}

export const unlikeSchema = {
  tags: ['Like'],
  summary: 'Unlike a post',
  params: z.object({
    id: z.string(),
  }),
  response: {
    200: z.object({
      message: z.string(),
    }),
    400: z.object({
      message: z.string(),
    })
  }
}