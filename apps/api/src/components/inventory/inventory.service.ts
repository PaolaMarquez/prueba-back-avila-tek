import { FastifyReply, FastifyRequest } from "fastify";
import { Product } from '@/components/inventory/inventory.model';
import { ProductInput } from "@avila-tek/models";
import { ProductUpdate } from "@/types/types";
import { crudService } from "@/components/crud/crud.service";
import { handleError } from "@/utils/error/handler";


/**
 * @async
 * @function createProduct
 * @description Crea un nuevo producto en la base de datos.
 * @summary Crea un nuevo producto.
 * @since 1.0.0
 * @version 1.0.0
 * @listens inventory.controller:createProduct
 * @param {ProductInput} data - Datos del producto a crear.
 * @param {FastifyReply} res - Objeto de respuesta HTTP.
 * @param {FastifyRequest} req - Objeto de solicitud HTTP.
 * @returns {Promise<object>} Objeto que contiene el producto creado.
 * @throws {Error} Si ocurre un error durante la creación del producto.
 * @throws {Error} Si el producto ya existe.
 * @example
 * const product = await createProduct({ name: 'Nuevo producto', descripcion: 'Descripción del producto' }, res, req);
 */

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

/**
 * @async
 * @function findAllProducts
 * @description Busca todos los productos en la base de datos.
 * @summary Busca todos los productos.
 * @since 1.0.0
 * @version 1.0.0
 * @listens inventory.controller:findAllProducts
 * @param {FastifyReply} res - Objeto de respuesta HTTP.
 * @param {FastifyRequest} req - Objeto de solicitud HTTP.
 * @param {string} [limit] - Número de productos a devolver por página. Por defecto es 10.
 * @param {string} [page] - Número de página a devolver. Por defecto es 1.
 * @param {object} [query] - Objeto de consulta para filtrar los productos.
 * @returns {Promise<object>} Objeto que contiene la lista de productos y metadatos de paginación.
 * @throws {Error} Si ocurre un error durante la búsqueda de los productos.
 * @throws {Error} Si no se encuentran productos.
 * @example
 * const products = await findAllProducts(res, req, '20', '2', { categoria: 'electrónica' });
 */

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