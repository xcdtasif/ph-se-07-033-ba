import path from "path"

import dotenv from "dotenv"
import ms from "ms"
import type { StringValue } from "ms"

dotenv.config({ path: path.join(process.cwd(), ".env.local") })

function getEnv(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

function getEnvAsNumber(key: string): number {
  const value = Number(getEnv(key))
  if (Number.isNaN(value)) {
    throw new Error(`Environment variable ${key} must be a valid number`)
  }
  return value
}

function getEnvAsDuration(key: string): StringValue {
  const value = getEnv(key) as StringValue
  const duration = ms(value)

  // ms returns undefined for unparsable input and accepts negatives like "-1d".
  // jsonwebtoken rounds down to whole seconds, so anything under 1s expires at once.
  if (!Number.isFinite(duration) || duration < 1000) {
    throw new Error(
      `Environment variable ${key} must be longer than 1 sec, like "15m", "7d" or "2 days"`,
    )
  }

  return value
}

const nodeEnv = getEnv("NODE_ENV")
const validNodeEnv = ["development", "production"]

if (!validNodeEnv.includes(nodeEnv)) {
  throw new Error(`Invalid NODE_ENV: ${nodeEnv}`)
}

export const env = {
  NODE_ENV: getEnv("NODE_ENV"),
  PORT: getEnvAsNumber("PORT"),
  CLIENT_URL: getEnv("CLIENT_URL"),

  DATABASE_URL: getEnv("DATABASE_URL"),
  DATABASE_URL_UNPOOLED: getEnv("DATABASE_URL_UNPOOLED"),

  BCRYPT_SALT_ROUNDS: getEnvAsNumber("BCRYPT_SALT_ROUNDS"),

  JWT_ACCESS_SECRET: getEnv("JWT_ACCESS_SECRET"),
  JWT_ACCESS_TOKEN_EXPIRES_IN: getEnvAsDuration("JWT_ACCESS_TOKEN_EXPIRES_IN"),
  JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),
  JWT_REFRESH_TOKEN_EXPIRES_IN: getEnvAsDuration("JWT_REFRESH_TOKEN_EXPIRES_IN"),

  STRIPE_SECRET_KEY: getEnv("STRIPE_SECRET_KEY"),
  STRIPE_PRODUCT_ID: getEnv("STRIPE_PRODUCT_ID"),
  STRIPE_WEBHOOK_SECRET: getEnv("STRIPE_WEBHOOK_SECRET"),

  UPLOADTHING_TOKEN: getEnv("UPLOADTHING_TOKEN"),
  UPLOADTHING_APP_ID: getEnv("UPLOADTHING_APP_ID"),
} as const
