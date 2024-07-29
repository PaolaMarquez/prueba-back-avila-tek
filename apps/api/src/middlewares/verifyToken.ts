import jwt from 'jsonwebtoken';
import { FastifyReply } from "fastify";
import { FastifyRequest } from 'fastify/types/request';

async function verifyToken(request: FastifyRequest<{ Body: any , Params: any}>, reply: FastifyReply) {
    try {
    const authHeader = request.headers['x-secret'];
    if (authHeader) {
        jwt.verify(authHeader as string, process.env.JWT_SECRET!, (err, payload) => {
            if (err) reply.code(401).send({ error: "Token is not valid" })
            request.user = (payload as jwt.JwtPayload).user
            return;
        });
        } else {
            return reply.code(401).send({ error: "Unauthorized" })
    }
    } catch (error) {
        return reply.code(500).send({ error: "Server error" })
    }
}

async function verifyTokenAndAuthorization(request: FastifyRequest<{ Body: any , Params: { id: string, userId?: string}, Querystring: any}>, reply: FastifyReply){
    await verifyToken(request, reply)
    try {
        const user = request.user
        if (user.isAdmin || user._id === request.params.id || user._id === request.params.userId) {
            return;
          } else {
            return reply.code(401).send({ error: "Unauthorized" })
          }
    } catch (error) {
        return reply.code(500).send({ error: "Server error" })
    }
}

export const verifyMidd = Object.freeze({
    verifyToken,
    verifyTokenAndAuthorization
  });
