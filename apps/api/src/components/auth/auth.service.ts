import jwt from 'jsonwebtoken';
import { TSignInInput } from './auth.dto';
import { User } from '../users/user.model';
import { FastifyReply, FastifyRequest } from 'fastify';
import argon2 from 'argon2';
import { handleError } from '@/utils/error/handler';

/**
 * @async
 * @function
 * @description This function mocks user authentication using a JWT
 * @implements TSignInInput
 * @listens auth.controller:signIn
 * @param data {TSignInInput}
 * @requires jsonwebtoken
 * @returns {object} Object with user object and its token as a string
 * @see user.model
 * @since 1.0.0
 * @summary Sign In
 * @todo Get user from database
 * @version 1
 */

async function register(data: TSignInInput, res: FastifyReply, req: FastifyRequest){
  try {
    let user = await User.findOne({email: data.email})
    if (user){
      throw {message: '409-emailAlreadyExists'}
    }

    user = new User(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        createdAt: new Date(),
        updatedAt: new Date(),
        isAdmin: data.isAdmin
      }
    )
    const newUser = await user.save();

    const payload = {
      user: {
        _id: newUser._id,
        isAdmin: newUser.isAdmin,
      }
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1hr",
    });

    return {
        user,
        token,
      };

  } catch (error) {
    handleError(error as Error, req, res)
  }
}

async function login(data: TSignInInput, res: FastifyReply, req: FastifyRequest){
  try {
    const user = await User.findOne({email: data.email})
    if (!user){
      throw {message: '404-user'}
    }
    const isMatch = await argon2.verify(user.password!, data.password);
    if (!isMatch){
      throw {message: '401-credentials'}
    }

    const payload = {
      user: {
        _id: user._id,
        isAdmin: user.isAdmin
      }
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET!, 
      {
        expiresIn: "1hr",
      }
    );
    return {
      user,
      token
    }

  } catch (error) {
    handleError(error as Error, req, res)
  }
  
}

export const authService = Object.freeze({
  register,
  login
});
