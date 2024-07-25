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
export const inventoryController = Object.freeze({ createProduct, deleteProduct});