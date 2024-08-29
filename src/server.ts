import cookie from "@fastify/cookie";
import fastify from "fastify";
import { transactionsRoutes } from "./routes/transactions";

const app = fastify();

app.register(cookie);
app.register(transactionsRoutes, { prefix: "/transactions" });

app.listen({ port: 3333 }).then(() => {
  console.log("Server is running on port 3333");
});
