import { inventoryController } from '@/components/inventory/inventory.controller';
import { verifyMidd } from '@/middlewares/verifyToken';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export async function inventoryRouter(
  fastify: FastifyInstance,
  options?: FastifyPluginOptions
) {
  fastify.post('/product', {preHandler: verifyMidd.verifyTokenAndAuthorization }, inventoryController.createProduct);
  fastify.delete('/product/:id', {preHandler: verifyMidd.verifyTokenAndAuthorization }, inventoryController.deleteProduct);
  fastify.put('/product/:id', {preHandler: verifyMidd.verifyTokenAndAuthorization }, inventoryController.updateProduct);
  fastify.get('/product/:id', {preHandler: verifyMidd.verifyToken }, inventoryController.findProduct);
  fastify.get('/product', {preHandler: verifyMidd.verifyToken }, inventoryController.findAllProducts);
  fastify.get('/product/available', {preHandler: verifyMidd.verifyToken }, inventoryController.findAvailableProducts);
}
