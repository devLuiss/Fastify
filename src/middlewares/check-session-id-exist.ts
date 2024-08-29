import { FastifyReply, FastifyRequest } from "fastify";

export function checkSessionIdExist(
  request: FastifyRequest,
  reply: FastifyReply,
  done: () => void
) {
  const sessionId = request.cookies.sessionId;
  if (!sessionId) {
    return reply.status(401).send({
      message: "Unauthorized",
    });
  }

  done();
}
