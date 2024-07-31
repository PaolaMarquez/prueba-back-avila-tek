import { User } from '@/components/users/user.model';
import { handleError } from '@/utils/error/handler';
import { FastifyReply, FastifyRequest } from 'fastify';

/**
 * @async
 * @function findOne
 * @description Retrieves a single user by specified arguments.
 * @summary Finds one user.
 * @since 1.0.0
 * @version 1.0.0
 * @listens user.controller:findOne
 * @param {object} args - Object containing the search criteria for the user (e.g. { id: '1234567890' }, { email: 'user@example.com' }, etc.).
 * @param {FastifyReply} res - HTTP response object.
 * @param {FastifyRequest} req - HTTP request object.
 * @returns {Promise<object>} Object containing the found user.
 * @throws {Error} If no user is found with the specified arguments.
 * @example
 * const user = await findOne({ id: '1234567890' }, res, req);
 */

async function findOne(args: any, res: FastifyReply, req: FastifyRequest) {
  try {
    const user = await User.findOne({ ...args })
    if (!user){
      throw { message: '404-user' }
    }
    return{
      user
    }
  } catch (error) {
      handleError(error as Error, req, res)
        }
}

/**
 * @async
 * @function findAll
 * @description Retrieves a list of users by specified arguments.
 * @summary Finds all users.
 * @since 1.0.0
 * @version 1.0.0
 * @listens user.controller:findAll
 * @param {object} args - Object containing the search criteria for the users (e.g. { role: 'admin' }, { country: 'USA' }, etc.).
 * @param {FastifyReply} res - HTTP response object.
 * @param {FastifyRequest} req - HTTP request object.
 * @returns {Promise<object>} Object containing the list of found users.
 * @throws {Error} If no users are found with the specified arguments.
 * @example
 * const users = await findAll({ role: 'admin' }, res, req);
 */

async function findAll(args: any, res: FastifyReply, req: FastifyRequest) {
  try {
    const users = await User.find({ ...args })
    if (!users || users.length === 0){
      throw { message: '404-user' }
    }
    return{
      users
    }
  } catch (error) {
    handleError(error as Error, req, res)
  }
}

export const userService = Object.freeze({
  findOne,
  findAll,
});
