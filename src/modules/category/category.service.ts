import httpStatus from "http-status"

import type { Prisma } from "../../generated/prisma/client.js"
import { prisma } from "../../lib/prisma.js"
import { AppError } from "../../utils/app-error.js"
import type {
  AdminCategoryListQuery,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "./category.schema.js"

const getAllCategories = () => {
  return prisma.category.findMany({ orderBy: { name: "asc" } })
}

const getAdminCategories = async (query: AdminCategoryListQuery) => {
  const { page, limit, search } = query

  const where: Prisma.CategoryWhereInput = search
    ? { name: { contains: search, mode: "insensitive" } }
    : {}

  const [categories, total] = await Promise.all([
    prisma.category.findMany({
      where,
      // Names are unique regardless of case, so the name alone keeps every page in the same order
      orderBy: { name: "asc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.category.count({ where }),
  ])

  return { categories, meta: { page, limit, total } }
}

const assertCategoryExists = async (id: string) => {
  const category = await prisma.category.findUnique({ where: { id } })

  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found")
  }
}

const assertNameAvailable = async (name: string, excludeId?: string) => {
  const existing = await prisma.category.findFirst({
    where: {
      name: { equals: name, mode: "insensitive" },
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
  })

  if (existing) {
    throw new AppError(httpStatus.CONFLICT, "Category already exists")
  }
}

const createCategory = async (payload: CreateCategoryPayload) => {
  await assertNameAvailable(payload.name)

  return prisma.category.create({ data: { name: payload.name } })
}

const updateCategory = async (id: string, payload: UpdateCategoryPayload) => {
  await assertCategoryExists(id)
  await assertNameAvailable(payload.name, id)

  return prisma.category.update({ where: { id }, data: { name: payload.name } })
}

const deleteCategory = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: { id },
    include: { _count: { select: { properties: true } } },
  })

  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found")
  }

  if (category._count.properties > 0) {
    throw new AppError(httpStatus.CONFLICT, "Can't delete a category that has properties")
  }

  await prisma.category.delete({ where: { id } })
}

export const categoryService = {
  assertCategoryExists,
  getAllCategories,
  getAdminCategories,
  createCategory,
  updateCategory,
  deleteCategory,
}
