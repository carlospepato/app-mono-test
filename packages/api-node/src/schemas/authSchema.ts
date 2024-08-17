import z from "zod";

// tipagem das requisições de login e registro

export const loginSchema = {
  tags: ['Auth'],
  summary: 'Login',
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
  response:{
    200: z.object({
      message: z.string(),
      token: z.string(),
      user: z.object({
        name: z.string(),
        email: z.string().email(),
      }),
    }),
    400: z.object({
      message: z.string(),
    }),
  },
}

export const registerSchema = {
  tags: ['Auth'],
  summary: 'Register',
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  }),
  response:{
    201: z.object({
      message: z.string(),
      user: z.object({
        name: z.string(),
        email: z.string(),
      }),
    }),
    400: z.object({
      message: z.string(),
      user: z.object({
        name: z.string(),
        email: z.string(),
      }),
    }),
  },
}

export const refreshTokenSchema = {
  body: z.object({
    refreshToken: z.string(),
  }),
}

export const logoutSchema = {
  body: z.object({
    refreshToken: z.string(),
  }),
}