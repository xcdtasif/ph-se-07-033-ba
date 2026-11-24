import httpStatus from "http-status"

import { prisma } from "../../lib/prisma.js"
import { AppError } from "../../utils/app-error.js"

// The property, request and review services all need this, so it lives apart to avoid a cycle
export const getOwnedProperty = async (id: string, landlordId: string) => {
  const property = await prisma.property.findUnique({ where: { id } })

  if (!property) {
    throw new AppError(httpStatus.NOT_FOUND, "Property not found")
  }

  if (property.landlordId !== landlordId) {
    throw new AppError(httpStatus.FORBIDDEN, "You don't own this property")
  }

  return property
}
