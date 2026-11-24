import { Router } from "express"

import { authenticate } from "../../middlewares/authenticate.js"
import { authorize } from "../../middlewares/authorize.js"
import { validate } from "../../middlewares/validate.js"
import { categoryController } from "./category.controller.js"
import { adminCategoryListQuerySchema } from "./category.schema.js"

const router = Router()

router.use(authenticate, authorize("ADMIN"))

// Get Admin Categories
router.get(
  "/",
  validate(adminCategoryListQuerySchema, "query"),
  categoryController.getAdminCategories,
)

export const adminCategoryRouter = router
