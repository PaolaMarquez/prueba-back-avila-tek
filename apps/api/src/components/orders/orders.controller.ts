import { FastifyReply, FastifyRequest } from "fastify";
import { ordersService } from "./orders.service";

async function createOrder(
  request: FastifyRequest<{ Body: any }>,
  reply: FastifyReply
) {
  return ordersService.createOrder(request.body as any, reply);
}

export const ordersController = Object.freeze({ 
    createOrder

  });