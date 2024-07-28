import type { FastifyRequest, FastifyReply } from 'fastify';
import { userService } from '@/components/users/user.service';

async function findOne(request: FastifyRequest, reply: FastifyReply) {
  return userService.findOne({}, reply);
}

async function findAll(request: FastifyRequest, reply: FastifyReply) {
  return userService.findAll({}, reply);
}

export const userController = Object.freeze({
  findOne,
  findAll,
});
