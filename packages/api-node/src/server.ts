import Fastify from 'fastify';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { userRoutes } from './routes/userRoutes';
import { config } from '../config/config';
import { likeRoutes } from './routes/likeRoutes';
import { postRoutes } from './routes/postRoutes';

const server = Fastify({ logger: true });
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);


server.register(userRoutes)
server.register(postRoutes)
server.register(likeRoutes)

server.listen({port: config.port}).then(() => {
  console.log(`Server is running on port ${config.port}`);
});