import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  // dbCredentials: {
  //   // url: process.env.DATABASE_URL!,
  //   host: process.env.DB_HOST!,
  //   port: parseInt(process.env.DB_PORT ?? '5432', 10),
  //   user: process.env.DB_USER!,
  //   password: process.env.DB_PASS!,
  //   database: process.env.DB_NAME!,
  //   ssl: false,
  //   // ssl: process.env.DATABASE_URL ? true : false,
  // },
});
