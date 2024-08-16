import z from "zod";

export const likeSchema = {
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
  body: z.object({
    userid: z.string(),
    postid: z.string(),
  }),
  response: {
    200: z.object({
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