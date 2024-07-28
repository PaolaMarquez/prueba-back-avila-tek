import { User } from '@/components/users/user.model';
import { FastifyReply } from 'fastify';

async function findOne(args: any, res: FastifyReply) {
  try {
    const user = await User.findOne({ ...args })
    if (!user){
      return res.status(400).send({error: "There are no users with those conditions"});
    }
    return{
      user
    }
  } catch (error) {
      res.status(500).send({error: "Server error"});
  }
}

async function findAll(args: any, res: FastifyReply) {
  try {
    const users = await User.find({ ...args })
    if (!users || users.length === 0){
      return res.status(400).send({error: "There are no users with those conditions"});
    }
    return{
      users
    }
  } catch (error) {
      res.status(500).send({error: "Server error"});
  }
}

export const userService = Object.freeze({
  findOne,
  findAll,
});
