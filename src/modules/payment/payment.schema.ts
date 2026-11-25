import z from "zod"

const paymentStatusSchema = z.enum(["PENDING", "COMPLETED", "FAILED"])

export const createPaymentSchema = z.strictObject({
  requestId: z.uuid(),
})

export type CreatePaymentPayload = z.output<typeof createPaymentSchema>

export const paymentListQuerySchema = z.strictObject({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  status: paymentStatusSchema.optional(),
  // The Stripe Checkout session id, as the success redirect's session_id gives it
  sessionId: z.string().trim().min(1).max(255).optional(),
})

export type PaymentListQuery = z.output<typeof paymentListQuerySchema>
