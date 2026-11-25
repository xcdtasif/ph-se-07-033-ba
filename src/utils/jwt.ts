import httpStatus from "http-status"
import jwt from "jsonwebtoken"
import type { StringValue } from "ms"
import z from "zod"

import { UserRole } from "../generated/prisma/enums.js"
import { AppError } from "./app-error.js"

const ALGORITHM = "HS256"

const tokenPayloadSchema = z.object({
  userId: z.string(),
  role: z.enum(UserRole),
})

type TokenPayload = z.output<typeof tokenPayloadSchema>

const createToken = (payload: TokenPayload, secret: string, expiresIn: StringValue): string =>
  jwt.sign(payload, secret, { algorithm: ALGORITHM, expiresIn })

const verifyToken = (token: string, secret: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, secret, { algorithms: [ALGORITHM] })

    return tokenPayloadSchema.parse(decoded)
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Token expired")
    }

    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token")
  }
}

export const jwtUtils = { createToken, verifyToken }
