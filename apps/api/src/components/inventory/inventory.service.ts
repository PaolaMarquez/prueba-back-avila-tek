import { FastifyReply, FastifyRequest } from "fastify";
import { Product } from '@/components/inventory/inventory.model';
import { ProductInput } from "@avila-tek/models";
import { ProductUpdate } from "@/types/types";
import { crudService } from "@/components/crud/crud.service";
import { handleError } from "@/utils/error/handler";


async function createProduct(data: ProductInput, res: FastifyReply, req: FastifyRequest){
  try {
    let product = await Product.findOne({name: data.name})
    if (product){
      throw { message: '409-productAlreadyExists' }
    }
    return crudService.createEntity({Entity:Product, data, res, req })
  } catch (error) {
    handleError(error, req, res)
  }
}

async function deleteProduct(id: string, res: FastifyReply, req: FastifyRequest){
  return crudService.deleteEntity({Entity:Product, res, id, req})
}

async function updateProduct(id: string, data: ProductUpdate, res: FastifyReply, req: FastifyRequest){
  return crudService.updateEntity({Entity:Product, res, id, data, req})
}

async function findProduct(id: string, res: FastifyReply, req: FastifyRequest){
  return crudService.findEntity({Entity:Product, res, id, req})
}

async function findAllProducts(res: FastifyReply, req: FastifyRequest, limit?: string, page?: string, query?: any){
  try {
    const options = {
      query: query || {},
      limit: limit? parseInt(limit): 10,
      page: page? parseInt(page): 1
    };
    const products = await Product.paginate(options)
    if (products?.totalDocs === 0){
      throw { message: '404-results' };
      }
    return products
  } catch (error) {
      handleError(error, req, res)
  }
}

export const inventoryService = Object.freeze({
    createProduct,
    deleteProduct,
    updateProduct,
    findProduct,
    findAllProducts,
  });