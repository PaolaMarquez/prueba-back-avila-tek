import jwt from 'jsonwebtoken';
import { FastifyReply } from "fastify";
import { FastifyRequest } from 'fastify/types/request';
import { handleError } from '@/utils/error/handler';

/**
 * @async
 * @function verifyToken
 * @description Verifies the authentication token in the request headers.
 * @summary Authenticates the request using a JWT token.
 * @since 1.0.0
 * @version 1.0.0
 * @param {FastifyRequest} request - HTTP request object.
 * @param {FastifyReply} reply - HTTP response object.
 * @throws {Error} If the token is invalid or missing.
 * @description
 * This function extracts the `x-secret` header from the request, verifies it using the JWT secret, and sets the `request.user` property with the decoded user data.
 * If the token is invalid or missing, it throws an error with a 401 status code.
 */

async function verifyToken(request: FastifyRequest<{ Body: any , Params: any, Querystring: any}>, reply: FastifyReply) {
    try {
        const authHeader = request.headers['x-secret'];
        if (authHeader) {
            jwt.verify(authHeader as string, process.env.JWT_SECRET!, (err, payload) => {
                if (err) throw {
                    message: '401-token',
                    stack: 'Invalid token',
                }
                request.user = (payload as jwt.JwtPayload).user
                return;
            });
        } else {
            throw { message: '401',}
        }
    } catch (error) {
        return handleError(error, request, reply)
    }
}

/**
 * @async
 * @function verifyTokenAndAuthorization
 * @description Verifies the authentication token and checks if the user has authorization to access the requested resource.
 * @summary Authenticates and authorizes the request using a JWT token and user permissions.
 * @since 1.0.0
 * @version 1.0.0
 * @param {FastifyRequest} request - HTTP request object.
 * @param {FastifyReply} reply - HTTP response object.
 * @throws {Error} If the token is invalid, missing, or the user lacks authorization.
 * @description
 * This function first calls `verifyToken` to authenticate the request. If successful, it checks if the user is an admin or if the user's ID matches the `id` or `userId` parameter in the request. If the user has authorization, it returns without throwing an error. Otherwise, it throws a 401 error.
 */

async function verifyTokenAndAuthorization(request: FastifyRequest<{ Body: any , Params: { id: string, userId?: string}, Querystring: any}>, reply: FastifyReply){
    try {
        await verifyToken(request, reply)
        const user = request.user
        if (user.isAdmin || user._id === request.params.id || user._id === request.params.userId) {
            return;
          } else {
            throw { message: '401',}
          }
    } catch (error) {
        return handleError(error, request, reply)
    }
}

export const verifyMidd = Object.freeze({
    verifyToken,
    verifyTokenAndAuthorization
  });
