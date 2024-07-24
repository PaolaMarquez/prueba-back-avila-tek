import { FastifyReply, FastifyRequest } from "fastify";

async function auth(request: FastifyRequest, reply: FastifyReply) {
	if (['GET', 'HEAD'].includes(request.method)) {
		return;
	}
    const authHeader = request.headers['x-secret'];
    if (!authHeader || authHeader !== process.env.JWT_SECRET){
        return reply.code(401).send({ error: "Unauthorized" })
    }
}

export const authMidd = Object.freeze({
    auth
  });
