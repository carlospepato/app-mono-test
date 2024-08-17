import z from "zod";

// tipagem das requisições de timeline

export const timelineSchema = {
  tags: ['Timeline'],
  summary: 'timeline',
  response:{
    200: z.object({
      message: z.string(),
      timeline: z.array(z.object({
        id: z.string(),
        content: z.string(),
        createdAt: z.string(),
        user: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
      })),
    }),
    400: z.object({
      message: z.string(),
    }),
  }
}