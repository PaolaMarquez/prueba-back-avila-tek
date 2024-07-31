import { orderController } from '@/components/orders/order.controller';
import { verifyMidd } from '@/middlewares/verifyToken';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export async function orderRouter(
  fastify: FastifyInstance,
  options?: FastifyPluginOptions
) {

  fastify.post('/', {
    preHandler: verifyMidd.verifyToken, 
    schema: 
      {
        body: 
        {
          type: 'object',
          properties: {
            user: {type: 'string'},
            items: {type: 'array', items: { type: 'string' }},
            total: {type: 'number'},
            status: {type: 'string'},
          },
          required: ['user', 'items', 'total', 'status']
          }
        }
      },
  orderController.createOrder);
  
  fastify.delete('/:id', {preHandler: verifyMidd.verifyTokenAndAuthorization }, orderController.deleteOrder);
  
  fastify.get('/all/:id', {preHandler: verifyMidd.verifyTokenAndAuthorization }, orderController.findOrder);
  
  fastify.get('/:userId/:id', {preHandler: verifyMidd.verifyTokenAndAuthorization }, orderController.findOrder);
  
  fastify.post('/all', {preHandler: verifyMidd.verifyTokenAndAuthorization , 
    schema: 
    {
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
  }, orderController.findAllOrders);
  
  fastify.get('/:id', {preHandler: verifyMidd.verifyTokenAndAuthorization, schema: {
    querystring: {
      type: 'object',
      properties: {
        page: { type: 'string' },
        limit: { type: 'string' }
      },
      required: []
    }
  } }, orderController.findOrdersByUsers);
  
  fastify.post('/status', {preHandler: verifyMidd.verifyTokenAndAuthorization, schema: {
    querystring: {
      type: 'object',
      properties: {
        page: { type: 'string' },
        limit: { type: 'string' }
      },
      required: []
      }
    } 
  }, orderController.findOrdersByStatus);
  
  fastify.put('/status/:id', {preHandler: verifyMidd.verifyTokenAndAuthorization, schema: {body: {type: 'object', properties: { status: {type: 'string'}}}} }, orderController.updateStatus);
}
