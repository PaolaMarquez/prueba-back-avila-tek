import type { FastifyReply, FastifyRequest } from 'fastify';
import { authService } from '@/components/auth/auth.service';
import { TSignInInput } from '@/components/auth/auth.dto';

async function register(
  request: FastifyRequest<{ Body: TSignInInput }>,
  reply: FastifyReply
) {
  return authService.register(request.body as TSignInInput, reply);
}
async function login(
  request: FastifyRequest<{ Body: TSignInInput }>,
  reply: FastifyReply
) {
  return authService.login(request.body as TSignInInput, reply);
}

export const authController = Object.freeze({ register, login});