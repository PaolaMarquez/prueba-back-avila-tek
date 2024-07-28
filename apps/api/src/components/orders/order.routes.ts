import { orderController } from '@/components/orders/order.controller';
import { verifyMidd } from '@/middlewares/verifyToken';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export async function orderRouter(
  fastify: FastifyInstance,
  options?: FastifyPluginOptions
) {
  fastify.post('/', {preHandler: verifyMidd.verifyToken }, orderController.createOrder);
  fastify.delete('/:id', {preHandler: verifyMidd.verifyTokenAndAuthorization }, orderController.deleteOrder);
  fastify.get('/orders/:id', {preHandler: verifyMidd.verifyTokenAndAuthorization }, orderController.findOrder);
  fastify.get('/:userId/:id', {preHandler: verifyMidd.verifyTokenAndAuthorization }, orderController.findOrder);
  fastify.get('/', {preHandler: verifyMidd.verifyTokenAndAuthorization }, orderController.findAllOrders);
  fastify.get('/:id', {preHandler: verifyMidd.verifyTokenAndAuthorization }, orderController.findOrdersByUsers);
  fastify.get('/status', {preHandler: verifyMidd.verifyTokenAndAuthorization }, orderController.findOrdersByUsers);
  fastify.put('/status/:id', {preHandler: verifyMidd.verifyTokenAndAuthorization }, orderController.updateStatus);
}
