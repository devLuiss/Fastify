import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DATABASE_CLIENT: z.string().default("sqlite"),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error(_env.error.errors, "Invalid environment variables");

  throw new Error("Invalid environment variables");
}

export const env = _env.data;
