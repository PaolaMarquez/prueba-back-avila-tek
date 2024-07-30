import { FastifyReply } from "fastify";
import { Product } from '@/components/inventory/inventory.model';
import { ProductInput } from "@avila-tek/models";
import { ProductUpdate } from "@/types/types";
import { crudService } from "@/components/crud/crud.service";


async function createProduct(data: ProductInput, res: FastifyReply){
    try {
      let product = await Product.findOne({name: data.name})
      if (product){
        return res.status(400).send({error: "Product already exists"});
      }
      return crudService.createEntity({Entity:Product, data, res })
    } catch (error) {
      res.status(500).send({error: "Server error"});
    }
}

async function deleteProduct(id: string, res: FastifyReply){
  return crudService.deleteEntity({Entity:Product, res, id})
}

async function updateProduct(id: string, data: ProductUpdate, res: FastifyReply){
  return crudService.updateEntity({Entity:Product, res, id, update: data})
}

async function findProduct(id: string, res: FastifyReply){
  return crudService.findEntity({Entity:Product, res, id})
}

async function findAllProducts(res: FastifyReply, limit?: string, page?: string, query?: any){
  try {
    const options = {
      query: query || {},
      limit: limit? parseInt(limit): 10,
      page: page? parseInt(page): 1
    };
    const products = await Product.paginate(options)
    if (products?.totalDocs === 0){
      res.status(400).send("There are no products registered")
    }
    return products
  } catch (error) {
    res.status(500).send({error: "Server error"});
  }
}

export const inventoryService = Object.freeze({
    createProduct,
    deleteProduct,
    updateProduct,
    findProduct,
    findAllProducts,
  });