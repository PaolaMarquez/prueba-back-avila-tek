import { User } from '@/components/users/user.model';
import { handleError } from '@/utils/error/handler';
import { FastifyReply, FastifyRequest } from 'fastify';

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
