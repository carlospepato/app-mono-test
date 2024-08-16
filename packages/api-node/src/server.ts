import Fastify from 'fastify';
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { userRoutes } from './routes/userRoutes';
import { config } from '../config/config';
import { likeRoutes } from './routes/likeRoutes';
import { postRoutes } from './routes/postRoutes';
import fastifyJwt from '@fastify/jwt';
import { authRoutes } from './routes/authRoutes';

const server = Fastify({ logger: true });

server.register(fastifyJwt,{
  secret: config.jwtSecret
});

server.register(fastifySwagger, {
  swagger:{
    consumes: ['application/json'],
    produces: ['application/json'],
    info:{
      title: 'Dialog Timeline API',
      description: 'API Specification for the Backend of a Timeline Application Developed for the Fullstack Developer Test at Dialog',
      version: '1.0.0'
    }
  },
  transform: jsonSchemaTransform
});

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(authRoutes)
server.register(userRoutes)
server.register(postRoutes)
server.register(likeRoutes)

server.listen({port: config.port}).then(() => {
  console.log(`Server is running on port ${config.port}`);
});