import { orderController } from '@/components/orders/order.controller';
import { verifyMidd } from '@/middlewares/verifyToken';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export async function orderRouter(
  fastify: FastifyInstance,
  options?: FastifyPluginOptions
) {
  fastify.post('/', {preHandler: verifyMidd.verifyTokenAndAuthorization }, orderController.createOrder);
  fastify.delete('/:id', {preHandler: verifyMidd.verifyTokenAndAuthorization }, orderController.deleteOrder);
  fastify.get('/:id', {preHandler: verifyMidd.verifyToken }, orderController.findOrder);
  fastify.get('/', {preHandler: verifyMidd.verifyToken }, orderController.findAllOrders);
  fastify.put('/status/:id', {preHandler: verifyMidd.verifyTokenAndAuthorization }, orderController.updateStatus);
}
