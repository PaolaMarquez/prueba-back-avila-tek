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

/**
 * @async
 * @function findAllOrders
 * @description Retrieves a list of orders with pagination.
 * @summary Finds all orders.
 * @since 1.0.0
 * @version 1.0.0
 * @listens order.controller:findAllOrders
 * @param {FastifyReply} res - HTTP response object.
 * @param {FastifyRequest} req - HTTP request object.
 * @param {string} [limit] - Optional limit of orders to return.
 * @param {string} [page] - Optional page number to return.
 * @param {object} [query] - Optional query object to filter orders.
 * @returns {Promise<object>} Object containing the list of orders and pagination metadata.
 * @throws {Error} If no orders are found.
 * @example
 * const orders = await findAllOrders(res, req, '10', '1', { status: 'pending' });
 */

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

/**
 * @async
 * @function findOrdersByUsers
 * @description Retrieves a list of orders for a specific user with pagination.
 * @summary Finds orders by user ID.
 * @since 1.0.0
 * @version 1.0.0
 * @listens order.controller:findOrdersByUsers
 * @param {string} id - ID of the user to retrieve orders for.
 * @param {FastifyReply} res - HTTP response object.
 * @param {FastifyRequest} req - HTTP request object.
 * @param {string} [limit] - Optional limit of orders to return.
 * @param {string} [page] - Optional page number to return.
 * @returns {Promise<object>} Object containing the list of orders and pagination metadata.
 * @throws {Error} If the user is not found.
 * @throws {Error} If no orders are found for the user.
 * @example
 * const orders = await findOrdersByUsers('1234567890', res, req, '10', '1');
 */

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

/**
 * @async
 * @function findOrdersByStatus
 * @description Retrieves a list of orders by status with pagination.
 * @summary Finds orders by status.
 * @since 1.0.0
 * @version 1.0.0
 * @listens order.controller:findOrdersByStatus
 * @param {OrderStatus} status - Status of the orders to retrieve (e.g. 'pending', 'shipped', etc.).
 * @param {FastifyReply} res - HTTP response object.
 * @param {FastifyRequest} req - HTTP request object.
 * @param {string} [limit] - Optional limit of orders to return.
 * @param {string} [page] - Optional page number to return.
 * @returns {Promise<object>} Object containing the list of orders and pagination metadata.
 * @throws {Error} If no orders are found with the specified status.
 * @example
 * const orders = await findOrdersByStatus('pending', res, req, '10', '1');
 */

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