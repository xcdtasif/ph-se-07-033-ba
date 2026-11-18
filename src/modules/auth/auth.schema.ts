import z from "zod"

import { UserRole } from "../../generated/prisma/enums.js"
import { nameSchema } from "../user/user.schema.js"

export const signupUserSchema = z.strictObject({
  name: nameSchema,
  email: z.string().trim().toLowerCase().pipe(z.email()),
  password: z
    .string()
    .min(8)
    .max(72, { error: "Password must be at most 72 bytes", abort: true })
    .refine((v) => new TextEncoder().encode(v).length <= 72, {
      error: "Password must be at most 72 bytes",
    }),
  role: z.enum(UserRole).exclude(["ADMIN"]),
})

export type SignupUserPayload = z.output<typeof signupUserSchema>

export const loginUserSchema = z.strictObject({
  email: z.string().trim().toLowerCase().pipe(z.email()),
  password: z.string().min(8).max(72),
})

export type LoginUserPayload = z.output<typeof loginUserSchema>
