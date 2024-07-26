import type { FastifyReply, FastifyRequest } from 'fastify';
import { inventoryService } from '@/components/inventory/inventory.service';
import { productInput } from "@avila-tek/models";

async function createProduct(
  request: FastifyRequest<{ Body: productInput }>,
  reply: FastifyReply
) {
  return inventoryService.createProduct(request.body as productInput, reply);
}

async function deleteProduct(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  return inventoryService.deleteProduct(request.params.id, reply);
}

async function updateProduct(
  request: FastifyRequest<{ Params: { id: string }; Body: any }>,
  reply: FastifyReply
) {
  return inventoryService.updateProduct(request.params.id, request.body as any, reply);
}

async function findProduct(
  request: FastifyRequest<{ Params: { id: string }}>,
  reply: FastifyReply
) {
  return inventoryService.findProduct(request.params.id, reply);
}

async function findAllProducts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  return inventoryService.findAllProducts(reply);
}

async function findAvailableProducts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  return inventoryService.findAvailableProducts(reply);
}

export const inventoryController = Object.freeze({ 
  createProduct, 
  deleteProduct, 
  updateProduct, 
  findProduct, 
  findAllProducts, 
  findAvailableProducts
});