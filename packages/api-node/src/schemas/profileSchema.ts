import z from "zod";

// tipagem das requisições de perfil

export const getProfileSchema = {
  tags: ['Profile'],
  summary: 'Get profile',
  response:{
    200: z.object({
      message: z.string(),
      user: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      }),
    }),
    400: z.object({
      message: z.string(),
    }),
    401: z.object({
      message: z.string(),
    }),
  },
}