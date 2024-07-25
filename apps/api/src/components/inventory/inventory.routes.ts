import { inventoryController } from '@/components/inventory/inventory.controller';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export async function inventoryRouter(
  fastify: FastifyInstance,
  options?: FastifyPluginOptions
) {
  fastify.post('/v1/inventory/product', inventoryController.createProduct);
  fastify.delete('/v1/inventory/product/:id', inventoryController.deleteProduct);
  fastify.put('/v1/inventory/product/:id', inventoryController.updateProduct);
  fastify.get('/v1/inventory/product/:id', inventoryController.findProduct);
  fastify.get('/v1/inventory/product', inventoryController.findAllProducts);
  fastify.get('/v1/inventory/product/available', inventoryController.findAvailableProducts);
}
