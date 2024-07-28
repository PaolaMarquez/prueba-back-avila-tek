import { FastifyReply, FastifyRequest } from "fastify";
import { orderService } from "./order.service";
import { OrderStatus } from "@/types/types";
import { OrderInput } from "@avila-tek/models";

async function createOrder(
  request: FastifyRequest<{ Body: OrderInput }>,
  reply: FastifyReply
) {
  return orderService.createOrder(request.body as OrderInput, reply);
}

async function deleteOrder(
  request: FastifyRequest<{ Params: {id: string} }>,
  reply: FastifyReply
) {
  return orderService.deleteOrder(request.params.id as string, reply);
}

async function updateStatus(
  request: FastifyRequest<{ Body: {status: OrderStatus}, Params: {id: string} }>,
  reply: FastifyReply
) {
  return orderService.updateStatus(request.params.id as string, request.body.status as OrderStatus, reply);
}

async function findOrder(
  request: FastifyRequest<{ Params: {id: string} }>,
  reply: FastifyReply
) {
  return orderService.findOrder(request.params.id as string, reply);
}

async function findAllOrders(
  request: FastifyRequest,
  reply: FastifyReply
) {
  return orderService.findAllOrders(reply);
}

async function findOrdersByUsers(
  request: FastifyRequest<{ Params: {id: string} }>,
  reply: FastifyReply
) {
  return orderService.findOrdersByUsers(request.params.id as string, reply);
}

async function findOrdersByStatus(
  request: FastifyRequest<{ Body: {status: OrderStatus} }>,
  reply: FastifyReply
) {
  return orderService.findOrdersByStatus(request.body.status as OrderStatus, reply);
}

export const orderController = Object.freeze({ 
    createOrder,
    deleteOrder,
    updateStatus,
    findOrder,
    findAllOrders,
    findOrdersByUsers,
    findOrdersByStatus
  });