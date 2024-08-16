import z from "zod";

export const getAllPostsSchema = {
  response: {
    200: z.object({
      message: z.string(),
      posts: z.array(
        z.object({
          id: z.string(),
          content: z.string(),
        })
      ),
    400: z.object({
      message: z.string(),
      }),
    }),
  }
}

export const getPostSchema = {
  params: z.object({
    id: z.string(),
  }),
  response: {
    200: z.object({
      message: z.string(),
      post: z.object({
        id: z.string(),
        content: z.string(),
      }),
    }),
    400: z.object({
      message: z.string(),
    })
  }
}

export const createPostSchema = {
  body: z.object({
    content: z.string(),
    userid: z.string(),
  }),
  response: {
    201: z.object({
      message: z.string(),
      post: z.object({
        id: z.string(),
        content: z.string(),
        createdAt: z.string(),
      }),
    }),
    400: z.object({
      message: z.string(),
    })
  }
}