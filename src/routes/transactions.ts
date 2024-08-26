import { randomUUID } from "crypto";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";
export async function transactionsRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const transactions = await knex("transactions").select("*");
    return { transactions };
  });

  app.get("/:id", async (request) => {
    const getTransactionsParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getTransactionsParamsSchema.parse(request.params); // Parse the request params to ensure it matches the schema

    const transaction = await knex("transactions").where({ id }).first(); // Get the transaction with the specified ID  from the database
    if (!transaction) {
      throw new Error("Transaction not found");
    }
    return { transaction };
  });

  app.get("/summary", async () => {
    const summary = await knex("transactions")
      .select(knex.raw("SUM(amount) as total"))
      .first();
    return { summary };
  });
  app.post("/", async (request, reply) => {
    const createTransactionSchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    const { title, amount, type } = createTransactionSchema.parse(request.body); // Parse the request body to ensure it matches the schema

    await knex("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1, // If the transaction is a debit, we need to multiply the amount by -1
    });

    return reply.status(201).send({ title, amount, type });
  });
}
