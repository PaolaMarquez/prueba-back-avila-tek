import { FastifyReply } from "fastify";
import { Order } from "./order.model";
import { OrderStatus } from "@/types/types";
import { OrderInput } from "@avila-tek/models";
import { User } from "../users/user.model";
import { crudService } from "@/components/crud/crud.service";

async function createOrder(data: OrderInput, res: FastifyReply){
  return crudService.createEntity({Entity:Order, data, res});
}

async function deleteOrder(id: string, res: FastifyReply){
  return crudService.deleteEntity({Entity:Order, res, id})
}

async function findOrder(id: string, res: FastifyReply){
  return crudService.findEntity({Entity:Order, res, id})
}

async function findAllOrders(res: FastifyReply, limit?: string, page?: string){
  try {
    const options = {
      query: {},
      limit: limit? parseInt(limit): 10,
      page: page? parseInt(page): 1
    };
    const orders = await Order.paginate(options)
    if (orders?.totalDocs === 0){
      res.status(400).send("There are no orders registered")
    }
    return orders
  } catch (error) {
    res.status(500).send({error: "Server error"});
  }
}

async function updateStatus(id: string, status: OrderStatus, res: FastifyReply){
  return crudService.updateEntity({Entity:Order, res, id, update: {"status": status}});
}

async function findOrdersByUsers(id:string, res: FastifyReply, limit?: string, page?: string){
  try {
    const user = User.findById(id);
    if (!user) res.status(400).send({error: "This user doesn't exist"});
    const options = {
      query: {user: id},
      limit: limit? parseInt(limit): 10,
      page: page? parseInt(page): 1
    };
    const orders = await Order.paginate(options)
    if (!orders) res.status(400).send({error: "This user has no orders"});
    return orders;
  } catch (error) {
    res.status(500).send({error: "Server error"});
  }
}

async function findOrdersByStatus(status: OrderStatus, res: FastifyReply, limit?: string, page?: string){
  try {
    const options = {
      query: {status},
      limit: limit? parseInt(limit): 10,
      page: page? parseInt(page): 1
    };
    const orders = await Order.paginate(options)
    if (!orders) res.status(400).send({error: "There are no orders with this status"});
    return orders;
  } catch (error) {
    res.status(500).send({error: "Server error"});
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