import jwt from 'jsonwebtoken';
import { FastifyReply } from "fastify";
import { FastifyRequest } from 'fastify/types/request';
import { handleError } from '@/utils/error/handler';

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
