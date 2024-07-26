import { FastifyReply } from "fastify";
import { Order } from "./orders.model";

async function createOrder(data: any, res: FastifyReply){
    const order = new Order(data)
}

export const ordersService = Object.freeze({
    createOrder
    
  });