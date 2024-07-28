import type { FastifyReply, FastifyRequest } from 'fastify';
import { inventoryService } from '@/components/inventory/inventory.service';
import { ProductInput } from "@avila-tek/models";
import { ProductUpdate } from '@/types/types';

async function createProduct(
  request: FastifyRequest<{ Body: ProductInput }>,
  reply: FastifyReply
) {
  return inventoryService.createProduct(request.body as ProductInput, reply);
}

async function deleteProduct(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  return inventoryService.deleteProduct(request.params.id, reply);
}

async function updateProduct(
  request: FastifyRequest<{ Params: { id: string }; Body: ProductUpdate }>,
  reply: FastifyReply
) {
  return inventoryService.updateProduct(request.params.id, request.body as ProductUpdate, reply);
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