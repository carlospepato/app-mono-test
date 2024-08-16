import z from "zod";

export const getAllUsersSchema = {
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
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().optional(),
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