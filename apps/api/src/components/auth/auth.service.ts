import jwt from 'jsonwebtoken';
import { TSignInInput } from './auth.dto';
import { User } from '../users/user.model';
import { FastifyReply, FastifyRequest } from 'fastify';
import argon2 from 'argon2';
import { handleError } from '@/utils/error/handler';

/**
 * @async
 * @function register
 * @description Registers a new user in the database.
 * @summary Registers a new user.
 * @since 1.0.0
 * @version 1.0.0
 * @listens auth.controller:register
 * @param {TSignInInput} data - User data to register.
 * @param {FastifyReply} res - HTTP response object.
 * @param {FastifyRequest} req - HTTP request object.
 * @returns {Promise<object>} Object containing the registered user and an authentication token.
 * @throws {Error} If an error occurs during user registration.
 * @throws {Error} If the email address already exists.
 * @example
 * const user = await register({ name: 'New User', email: 'new.user@example.com', password: 'password', isAdmin: false }, res, req);
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

/**
 * @async
 * @function login
 * @description Authenticates a user and returns an authentication token.
 * @summary Logs in a user.
 * @since 1.0.0
 * @version 1.0.0
 * @listens auth.controller:login
 * @param {TSignInInput} data - User credentials to authenticate.
 * @param {FastifyReply} res - HTTP response object.
 * @param {FastifyRequest} req - HTTP request object.
 * @returns {Promise<object>} Object containing the authenticated user and an authentication token.
 * @throws {Error} If the user is not found.
 * @throws {Error} If the credentials are invalid.
 * @example
 * const user = await login({ email: 'user@example.com', password: 'password' }, res, req);
 */

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
