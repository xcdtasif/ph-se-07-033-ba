import z from "zod"

export const categoryIdParamsSchema = z.strictObject({
  id: z.uuid(),
})

export type CategoryIdParams = z.output<typeof categoryIdParamsSchema>

export const adminCategoryListQuerySchema = z.strictObject({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  search: z.string().trim().min(1).max(100).optional(),
})

export type AdminCategoryListQuery = z.output<typeof adminCategoryListQuerySchema>

export const createCategorySchema = z.strictObject({
  name: z.string().trim().min(2).max(50),
})

export type CreateCategoryPayload = z.output<typeof createCategorySchema>

export const updateCategorySchema = z.strictObject({
  name: z.string().trim().min(2).max(50),
})

export type UpdateCategoryPayload = z.output<typeof updateCategorySchema>
