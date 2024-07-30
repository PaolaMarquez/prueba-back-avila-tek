import { ProductInput, OrderInput } from "@avila-tek/models";
import { FastifyReply } from "fastify";
import { Product } from "../inventory/inventory.model";
import { Order } from "../orders/order.model";
import mongoose from 'mongoose';
import { OrderStatus, ProductUpdate } from "@/types/types";

interface Props{
    Entity: typeof Order | typeof Product;
    data?: OrderInput | ProductInput;
    res: FastifyReply;
    id?: string;
    update?: ProductUpdate | any;
    limit?: string;
    page?: string;
    query?: string;
}

async function createEntity({Entity, data, res}: Props){
    try {
      let entity;
      entity = new Entity({
        ...data,
         createdAt: new Date(),
         updatedAt: new Date(),
       });
      const newEntity = await entity.save();
      return newEntity;
    } catch (error) {
      res.status(500).send({error: "Server error"});
    }
}

async function deleteEntity({Entity, res, id}: Props){
    try {
        const result = await (Entity as mongoose.Model<any>).findByIdAndDelete(id)
        if (!result){
          return res.status(400).send({error: "The entity doesn't exists"});
        }
        res.status(200).send("Entity deleted successfully");
      } catch (e) {
        console.log(e)
        res.status(500).send({error: e});
      }
}

async function findEntity({Entity, res, id}: Props){
    try {
      const result = await (Entity as mongoose.Model<any>).findById(id)
      if (!result){
        return res.status(400).send({error: "Entity doesn't exist"});
      }
      return {
        result
      }
    } catch (error) {
      res.status(500).send({error: "Server error"});
    }
}

async function updateEntity({Entity, res, id, update}: Props){
    try {
        const results = await (Entity as mongoose.Model<any>).findByIdAndUpdate(id, update)
        if (!results){
          return res.status(400).send({error: "Entity doesn't exist"});
        }
        res.status(200).send("Entity updated successfully");
      } catch (error) {
        res.status(500).send({error: "Server error"});
      }
}

export const crudService = Object.freeze({
    createEntity,
    deleteEntity,
    findEntity,
    updateEntity,
});