import type { FastifyRequest, FastifyReply } from 'fastify';
import { userService } from '@/components/users/user.service';

async function findOne(request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) {
  return userService.findOne({_id: request.params.id}, reply, request);
}

async function findAll(request: FastifyRequest<{Body: any}>, reply: FastifyReply) {
  return userService.findAll(request.body, reply, request);
}

export const userController = Object.freeze({
  findOne,
  findAll,
});
