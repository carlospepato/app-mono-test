import { FastifyReply, FastifyRequest } from "fastify"
import profileService from "../services/profileService"

async function profile(request: FastifyRequest, reply: FastifyReply) {
  try {

    // chama o serviço de perfil e passa o id do usuário como parâmetro
    const profile = await profileService.profile(request.user.sub)

    // verifica se o perfil não foi encontrado
    if (!profile) {
      return reply.code(400).send({ message: "User not found" })
    }
    return reply.code(200).send(
      {
        message: "Profile found",
        user: {
          id: profile.user.id,
          name: profile.user.name,
          email: profile.user.email,
          password: profile.user.password,
          createdAt: profile.user.createdAt,
          updatedAt: profile.user.updatedAt
        }
      }
    );
  } catch (error) {
    return reply.code(401).send({ message: "Unauthorized" })
  }
}

export default { profile }