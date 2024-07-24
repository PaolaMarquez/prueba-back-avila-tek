import { authController } from '@/components/auth/auth.controller';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export async function authRouter(
  fastify: FastifyInstance,
  options?: FastifyPluginOptions
) {
  fastify.post('/v1/auth/register', authController.register);
  fastify.post('/v1/auth/login', authController.login);
}
