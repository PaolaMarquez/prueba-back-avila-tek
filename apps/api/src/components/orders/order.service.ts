import { FastifyReply, FastifyRequest } from "fastify";
import { Order } from "./order.model";
import { OrderStatus } from "@/types/types";
import { OrderInput } from "@avila-tek/models";
import { User } from "../users/user.model";
import { crudService } from "@/components/crud/crud.service";
import { handleError } from "@/utils/error/handler";

async function createOrder(data: OrderInput, res: FastifyReply, req: FastifyRequest){
  return crudService.createEntity({Entity:Order, data, res, req});
}

async function deleteOrder(id: string, res: FastifyReply, req: FastifyRequest){
  return crudService.deleteEntity({Entity:Order, res, id, req})
}

async function findOrder(id: string, res: FastifyReply, req: FastifyRequest){
  return crudService.findEntity({Entity:Order, res, id, req})
}

async function findAllOrders(res: FastifyReply, req: FastifyRequest, limit?: string, page?: string, query?: any){
  try {
    const options = {
      query: query || {},
      limit: limit? parseInt(limit): 10,
      page: page? parseInt(page): 1
    };
    const orders = await Order.paginate(options)
    if (orders?.totalDocs === 0){
      throw { status: 404, type: 'default' };
    }
    return orders
  } catch (error) {
    handleError(error as Error, req, res)
  }
}

async function updateStatus(id: string, status: OrderStatus, res: FastifyReply, req: FastifyRequest){
  return crudService.updateEntity({Entity:Order, res, id, data:{...{"status": status}}, req});
}

async function findOrdersByUsers(id:string, res: FastifyReply, req: FastifyRequest, limit?: string, page?: string){
  try {
    const user = User.findById(id);
    if (!user) throw { message: '404-user' }
    const options = {
      query: {user: id},
      limit: limit? parseInt(limit): 10,
      page: page? parseInt(page): 1
    };
    const orders = await Order.paginate(options)
    if (!orders) throw { message: '404-results' };
    return orders;
  } catch (error) {
    handleError(error as Error, req, res)
  }
}

async function findOrdersByStatus(status: OrderStatus, res: FastifyReply, req: FastifyRequest, limit?: string, page?: string){
  try {
    const options = {
      query: {status},
      limit: limit? parseInt(limit): 10,
      page: page? parseInt(page): 1
    };
    const orders = await Order.paginate(options)
    if (!orders) throw { message: '404-results' };
    return orders;
  } catch (error) {
    handleError(error as Error, req, res)
  }
}

export const orderService = Object.freeze({
    createOrder,
    deleteOrder,
    findOrder,
    findAllOrders,
    updateStatus,
    findOrdersByUsers,
    findOrdersByStatus,
  });