import type { FastifyRequest, FastifyReply } from 'fastify';
import { userService } from '@/components/users/user.service';

async function findOne(request: FastifyRequest, reply: FastifyReply) {
  return userService.findOne({}, reply, request);
}

async function findAll(request: FastifyRequest, reply: FastifyReply) {
  return userService.findAll({}, reply, request);
}

export const userController = Object.freeze({
  findOne,
  findAll,
});
