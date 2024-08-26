import fastify from "fastify";
import { transactionsRoutes } from "./routes/transactions";

const app = fastify();

app.register(transactionsRoutes, { prefix: "/transactions" });

app.listen({ port: 3333 }).then(() => {
  console.log("Server is running on port 3333");
});
