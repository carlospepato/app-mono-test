import z from "zod";

// tipagem das requisições de post

export const getAllPostsSchema = {
  tags: ['Post'],
  summary: 'Get all posts',
  response: {
    200: z.object({
      message: z.string(),
      posts: z.array(z.object({
          id: z.string(),
          content: z.string(),
          userid: z.string(),
        })),
      }),
    400: z.object({
      message: z.string(),
      }),
  }
}

export const getPostSchema = {
  tags: ['Post'],
  summary: 'Get a especific post',
  params: z.object({
    id: z.string(),
  }),
  response: {
    200: z.object({
      message: z.string(),
      post: z.object({
        id: z.string(),
        content: z.string(),
        userid: z.string(),
      }),
    }),
    400: z.object({
      message: z.string(),
    })
  }
}

export const createPostSchema = {
  tags: ['Post'],
  summary: 'Create a new post',
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