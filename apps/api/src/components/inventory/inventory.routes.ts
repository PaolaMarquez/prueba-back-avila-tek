import { inventoryController } from '@/components/inventory/inventory.controller';
import { verifyMidd } from '@/middlewares/verifyToken';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export async function inventoryRouter(
  fastify: FastifyInstance,
  options?: FastifyPluginOptions
) {

  fastify.post('/product', {preHandler: verifyMidd.verifyTokenAndAuthorization,
    schema: {
      body: {
        type: 'object',
        properties: {
          name: {type: 'string'},
          description: {type: 'string'},
          price: {type: 'number'},
          stock: {type: 'number'},
        },
        required: ['name', 'description', 'price', 'stock']
      }
    }
   }, inventoryController.createProduct);
  
  fastify.delete('/product/:id', {preHandler: verifyMidd.verifyTokenAndAuthorization }, inventoryController.deleteProduct);
  
  fastify.put('/product/:id', {preHandler: verifyMidd.verifyTokenAndAuthorization,
    schema: {
      body: {
        type: 'object',
        properties: {
          name: {type: 'string'},
          description: {type: 'string'},
          price: {type: 'number'},
          stock: {type: 'number'},
        },
        required: [],
      } 
    }
   }, inventoryController.updateProduct);
  
  fastify.get('/product/:id', {preHandler: verifyMidd.verifyToken }, inventoryController.findProduct);
  
  fastify.post('/product/all', {preHandler: verifyMidd.verifyToken,
    schema: {
      body: {type: 'object'},
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'string' },
          limit: { type: 'string' }
        },
        required: []
      }
    }
   }, inventoryController.findAllProducts);
  
  fastify.get('/product/available', {preHandler: verifyMidd.verifyToken, 
    schema: {
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'string' },
          limit: { type: 'string' }
        },
        required: []
      }
    }
   }, inventoryController.findAvailableProducts);
}
