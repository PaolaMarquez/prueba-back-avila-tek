import { FastifyReply, FastifyRequest } from "fastify";
import { orderService } from "./order.service";
import { OrderStatus } from "@/types/types";
import { OrderInput } from "@avila-tek/models";

async function createOrder(
  request: FastifyRequest<{ Body: OrderInput }>,
  reply: FastifyReply
) {
  return orderService.createOrder(request.body as OrderInput, reply, request);
}

async function deleteOrder(
  request: FastifyRequest<{ Params: {id: string} }>,
  reply: FastifyReply
) {
  return orderService.deleteOrder(request.params.id as string, reply, request);
}

async function updateStatus(
  request: FastifyRequest<{ Body: {status: OrderStatus}, Params: {id: string} }>,
  reply: FastifyReply
) {
  return orderService.updateStatus(request.params.id as string, request.body.status as OrderStatus, reply, request);
}

async function findOrder(
  request: FastifyRequest<{ Params: {id: string} }>,
  reply: FastifyReply
) {
  return orderService.findOrder(request.params.id as string, reply, request);
}

async function findAllOrders(
  request: FastifyRequest<{ Querystring: {page?: string, limit?: string}, Body: any }>,
  reply: FastifyReply
) {
  return orderService.findAllOrders(reply, request, request.query.limit, request.query.page, request.body);
}

async function findOrdersByUsers(
  request: FastifyRequest<{ Params: {id: string}, Querystring: {page?: string, limit?: string} }>,
  reply: FastifyReply
) {
  return orderService.findOrdersByUsers(request.params.id as string, reply, request, request.query.limit, request.query.page);
}

async function findOrdersByStatus(
  request: FastifyRequest<{ Body: {status: OrderStatus}, Querystring: {page?: string, limit?: string}  }>,
  reply: FastifyReply
) {
  return orderService.findAllOrders(reply, request, request.query.limit, request.query.page, {status: request.body.status});
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