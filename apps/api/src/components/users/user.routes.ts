import { userController } from '@/components/users/user.controller';
import { verifyMidd } from '@/middlewares/verifyToken';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export async function userRouter(
  fastify: FastifyInstance,
  options?: FastifyPluginOptions
) {
  fastify.get('/v1/users/:id', {preHandler: verifyMidd.verifyTokenAndAuthorization }, userController.findOne);

  fastify.get('/v1/users', {preHandler: verifyMidd.verifyTokenAndAuthorization }, userController.findAll);
}
