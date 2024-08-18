import z from "zod";

// tipagem das requisições de usuário

export const getAllUsersSchema = {
  tags: ['User'],
  summary: 'Get all users',
  response: {
    200: z.object({
      message: z.string(),
      users: z.array(z.object({
        name: z.string(),
        email: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
      })),
    }),
    400: z.object({
      message: z.string(),
    })
  }
};

export const getUserSchema = {
  tags: ['User'],
  summary: 'Get a user',
  params: z.object({
    id: z.string(),
  }),
  response: {
    200: z.object({
      message: z.string(),
      user: z.object({
        name: z.string(),
        email: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
      }),
    }),
    400: z.object({
      message: z.string(),
    })
  }
}

export const createUserSchema = {
  tags: ['User'],
  summary: 'Create a new user',
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  }),
  response: {
    201: z.object({
      message: z.string(),
      user: z.object({
        name: z.string(),
        email: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
      }),
    }),
    400: z.object({
      message: z.string(),
    })
  }
}

export const updateUserSchema = {
  tags: ['User'],
  summary: 'Update a user',
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    name: z.string(),
    email: z.string().email()
  }),
  response: {
    200: z.object({
      message: z.string(),
      user: z.object({
        name: z.string(),
        email: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
      }),
    }),
    404: z.object({
      message: z.string(),
    }),
    400: z.object({
      message: z.string(),
    })
  }
};

export const deleteUserSchema = {
  tags: ['User'],
  summary: 'Delete a user',
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