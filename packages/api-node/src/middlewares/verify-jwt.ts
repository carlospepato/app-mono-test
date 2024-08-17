import { FastifyReply, FastifyRequest } from "fastify"

// Função para verificar se a autenticação do JWT é válida
export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try{
    await request.jwtVerify()
  }catch(error){
    return reply.code(401).send({ message: "Unauthorized" })
  }
}