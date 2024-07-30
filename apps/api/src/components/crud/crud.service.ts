import { ProductInput, OrderInput } from "@avila-tek/models";
import { FastifyReply, FastifyRequest } from "fastify";
import { Product } from "../inventory/inventory.model";
import { Order } from "../orders/order.model";
import mongoose from 'mongoose';
import { OrderStatus, ProductUpdate } from "@/types/types";
import { handleError } from "@/utils/error/handler";

interface Props{
    Entity: typeof Order | typeof Product;
    req: FastifyRequest;
    res: FastifyReply;
    data?: OrderInput | ProductInput;
    id?: string;
    update?: ProductUpdate | {"status": OrderStatus};
    limit?: string;
    page?: string;
    query?: string;
}

async function createEntity({Entity, data, req, res}: Props){
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
    handleError(error as Error, req, res)
  }
}

async function deleteEntity({Entity, res, req, id}: Props){
  try {
      const result = await (Entity as mongoose.Model<any>).findByIdAndDelete(id)
      if (!result){
        throw { status: 404, type: 'default' };
      }
      res.status(200).send("Entity deleted successfully");
    } catch (error) {
      handleError(error as Error, req, res)
    }
}

async function findEntity({Entity, res, req, id}: Props){
  try {
    const result = await (Entity as mongoose.Model<any>).findById(id)
    if (!result){
      throw { status: 404, type: 'default' };
    }
    return {
      result
    }
  } catch (error) {
    handleError(error as Error, req, res)
  }
}

async function updateEntity({Entity, res, id, req, update}: Props){
  try {
      const results = await (Entity as mongoose.Model<any>).findByIdAndUpdate(id, update)
      if (!results){
        throw { status: 404, type: 'default' };
      }
      res.status(200).send("Entity updated successfully");
    } catch (error) {
        handleError(error as Error, req, res)
    }
}

export const crudService = Object.freeze({
    createEntity,
    deleteEntity,
    findEntity,
    updateEntity,
});