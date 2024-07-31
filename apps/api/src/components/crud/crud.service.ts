import { FastifyReply, FastifyRequest } from "fastify";
import mongoose from 'mongoose';
import { handleError } from "@/utils/error/handler";

interface Props{
    Entity: any;
    req: FastifyRequest;
    res: FastifyReply;
    data?: any;
    id?: string;
    limit?: string;
    page?: string;
    query?: string;
}

/**
 * @async
 * @function createEntity
 * @description Crea una nueva entidad en la base de datos.
 * @summary Crea una nueva entidad.
 * @since 1.0.0
 * @version 1.0.0
 * @param {Props} props - Objeto que contiene las propiedades necesarias para crear la entidad.
 * @param {Props.Entity} props.Entity - Modelo de la entidad a crear.
 * @param {Props.data} props.data - Datos de la entidad a crear.
 * @param {Props.req} props.req - Objeto de solicitud HTTP.
 * @param {Props.res} props.res - Objeto de respuesta HTTP.
 * @returns {Promise<Entity>} Retorna la entidad creada.
 * @throws {Error} Si ocurre un error durante la creación de la entidad.
 * @example
 * const newEntity = await createEntity({
 *   Entity: ModeloDeLaEntidad,
 *   data: { nombre: 'Juan', edad: 30 },
 *   req: req,
 *   res: res,
 * });
 */

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

/**
 * @async
 * @function deleteEntity
 * @description Elimina una entidad de la base de datos.
 * @summary Elimina una entidad.
 * @since 1.0.0
 * @version 1.0.0
 * @param {Props} props - Objeto que contiene las propiedades necesarias para eliminar la entidad.
 * @param {Props.Entity} props.Entity - Modelo de la entidad a eliminar.
 * @param {Props.res} props.res - Objeto de respuesta HTTP.
 * @param {Props.req} props.req - Objeto de solicitud HTTP.
 * @param {Props.id} props.id - ID de la entidad a eliminar.
 * @returns {Promise<void>} No retorna nada.
 * @throws {Error} Si ocurre un error durante la eliminación de la entidad.
 * @throws {Error} Si la entidad no existe.
 * @example
 * await deleteEntity({
 *   Entity: ModeloDeLaEntidad,
 *   res: res,
 *   req: req,
 *   id: '1234567890',
 * });
 */

async function deleteEntity({Entity, res, req, id}: Props){
  try {
      const result = await (Entity as mongoose.Model<any>).findByIdAndDelete(id)
      if (!result){
        throw { message: '404' };
      }
      throw { message: '200-delete' };
    } catch (error) {
      handleError(error as Error, req, res)
    }
}

/**
 * @async
 * @function findEntity
 * @description Busca una entidad en la base de datos por su ID.
 * @summary Busca una entidad por ID.
 * @since 1.0.0
 * @version 1.0.0
 * @param {Props} props - Objeto que contiene las propiedades necesarias para buscar la entidad.
 * @param {Props.Entity} props.Entity - Modelo de la entidad a buscar.
 * @param {Props.res} props.res - Objeto de respuesta HTTP.
 * @param {Props.req} props.req - Objeto de solicitud HTTP.
 * @param {Props.id} props.id - ID de la entidad a buscar.
 * @returns {Promise<Object>} Objeto que contiene la entidad encontrada.
 * @throws {Error} Si ocurre un error durante la búsqueda de la entidad.
 * @throws {Error} Si la entidad no existe.
 * @example
 * const result = await findEntity({
 *   Entity: ModeloDeLaEntidad,
 *   res: res,
 *   req: req,
 *   id: '1234567890',
 * });
 */

async function findEntity({Entity, res, req, id}: Props){
  try {
    const result = await (Entity as mongoose.Model<any>).findById(id)
    if (!result){
      throw { message: '404' };
    }
    return {
      result
    }
  } catch (error) {
    handleError(error as Error, req, res)
  }
}

/**
 * @async
 * @function updateEntity
 * @description Actualiza una entidad en la base de datos.
 * @summary Actualiza una entidad.
 * @since 1.0.0
 * @version 1.0.0
 * @param {Props} props - Objeto que contiene las propiedades necesarias para actualizar la entidad.
 * @param {Props.Entity} props.Entity - Modelo de la entidad a actualizar.
 * @param {Props.res} props.res - Objeto de respuesta HTTP.
 * @param {Props.req} props.req - Objeto de solicitud HTTP.
 * @param {Props.id} props.id - ID de la entidad a actualizar.
 * @param {Props.data} props.data - Datos a actualizar en la entidad.
 * @returns {Promise<Object>} Objeto que contiene la entidad actualizada.
 * @throws {Error} Si ocurre un error durante la actualización de la entidad.
 * @throws {Error} Si la entidad no existe.
 * @example
 * const result = await updateEntity({
 *   Entity: ModeloDeLaEntidad,
 *   res: res,
 *   req: req,
 *   id: '1234567890',
 *   data: { nombre: 'Nuevo nombre' },
 * });
 */

async function updateEntity({Entity, res, id, req, data}: Props){
  try {
      const results = await (Entity as mongoose.Model<any>).findByIdAndUpdate(id, {...data})
      if (!results){
        throw { message: '404' }
      }
      return {
        results
      }
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