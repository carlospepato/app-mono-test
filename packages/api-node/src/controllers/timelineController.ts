import { FastifyReply, FastifyRequest } from "fastify"
import timelineService from "../services/timelineService"

async function timeline(request: FastifyRequest, reply: FastifyReply) {
  try{

    // chama o serviço de timeline e passa o id do usuário como parâmetro
    const timeline = await timelineService.timeline(request.user.sub)
    return reply.code(200).send(
      {
        message: "Timeline found",
        timeline
      }
    )
  }catch(error){
    return reply.code(401).send({ message: "Unauthorized" })
  }
}

export default { timeline }