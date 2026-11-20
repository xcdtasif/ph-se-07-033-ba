import path from "path"

import dotenv from "dotenv"
import { defineConfig, env } from "prisma/config"

dotenv.config({ path: path.join(process.cwd(), ".env.local") })

export default defineConfig({
  schema: "prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL_UNPOOLED"),
  },
})
