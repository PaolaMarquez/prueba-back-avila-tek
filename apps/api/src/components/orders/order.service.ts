import { FastifyReply } from "fastify";
import { Order } from "./order.model";
import { OrderStatus } from "@/types/types";
import { OrderInput } from "@avila-tek/models";

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

async function findAllOrders(res: FastifyReply){
  try {
    const orders = await Order.find()
    if (orders.length === 0){
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

export const orderService = Object.freeze({
    createOrder,
    deleteOrder,
    findOrder,
    findAllOrders,
    updateStatus,
  });