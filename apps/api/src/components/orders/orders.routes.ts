import { ordersController } from '@/components/orders/orders.controller';
import { verifyMidd } from '@/middlewares/verifyToken';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export async function ordersRouter(
  fastify: FastifyInstance,
  options?: FastifyPluginOptions
) {
  fastify.post('/create', {preHandler: verifyMidd.verifyTokenAndAuthorization }, ordersController.createOrder);
//   fastify.delete('/product/:id', {preHandler: verifyMidd.verifyTokenAndAuthorization }, ordersController.deleteOrder);
//   fastify.put('/product/:id', {preHandler: verifyMidd.verifyTokenAndAuthorization }, ordersController.updateOrder);
//   fastify.get('/product/:id', {preHandler: verifyMidd.verifyToken }, ordersController.findOrder);
//   fastify.get('/product', {preHandler: verifyMidd.verifyToken }, ordersController.findAllOrders);
//   fastify.get('/product/available', {preHandler: verifyMidd.verifyToken }, ordersController.findAvailableOrders);
}
