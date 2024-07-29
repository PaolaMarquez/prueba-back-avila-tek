import { FastifyReply } from "fastify";
import { Order } from "./order.model";
import { OrderStatus } from "@/types/types";
import { OrderInput } from "@avila-tek/models";
import { User } from "../users/user.model";

async function createOrder(data: OrderInput, res: FastifyReply){
    try {
      const order = new Order(
        {
          user: data.user,
          items: data.items,
          total: data.total,
          status: data.status,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      )
      const newOrder = await order.save();
      return newOrder;
    } catch (error) {
      res.status(500).send({error: "Server error"});
    }
}

async function deleteOrder(id: string, res: FastifyReply){
    try {
      const order = await Order.findByIdAndDelete(id)
      if (!order){
        return res.status(400).send({error: "Order doesn't exists"});
      }
      res.status(200).send("Order deleted successfully");
    } catch (error) {
      res.status(500).send({error: "Server error"});
    }
}

async function findOrder(id: string, res: FastifyReply){
    try {
      const order = await Order.findById(id)
      if (!order){
        return res.status(400).send({error: "Order doesn't exists"});
      }
      return {
        order
      }
    } catch (error) {
      res.status(500).send({error: "Server error"});
    }
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
  try {
    const order = await Order.findByIdAndUpdate(id, {"status": status})
    if (!order){
      return res.status(400).send({error: "Order doesn't exists"});
    }
    res.status(200).send("Order updated successfully");
  } catch (error) {
    res.status(500).send({error: "Server error"});
  }

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