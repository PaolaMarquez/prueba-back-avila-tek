import jwt from 'jsonwebtoken';
import { TSignInInput } from './auth.dto';
import { User } from '../users/user.model';
import { FastifyReply } from 'fastify';
import argon2 from 'argon2';

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

async function register(data: TSignInInput, res: FastifyReply){
  try {
    let user = await User.findOne({email: data.email})
    if (user){
      return res.status(400).send({error: "User already exists"});
    }

    user = new User(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    )
  const newUser = await user.save();

  const payload = {
    user: {
      _id: newUser._id,
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
    console.log(error)
    res.status(500).send({error: "Server error"});
  }
}

async function login(data: TSignInInput, res: FastifyReply){
  try {
    const user = await User.findOne({email: data.email})
    if (!user){
      return res.status(400).send({error: "Invalid credentials 1"});
    }
    const isMatch = await argon2.verify(user.password!, data.password);
    if (!isMatch){
      return res.status(400).send({error: "Invalid credentials 2"})
    }

    const payload = {
      user: {
        _id: user._id,
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
    console.log(error)
    res.status(500).send({error: "Server error"});
  }
  
}

export const authService = Object.freeze({
  register,
  login
});
