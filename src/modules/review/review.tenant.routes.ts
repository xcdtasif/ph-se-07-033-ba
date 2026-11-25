import { Router } from "express"

import { authenticate } from "../../middlewares/authenticate.js"
import { authorize } from "../../middlewares/authorize.js"
import { validate } from "../../middlewares/validate.js"
import { reviewController } from "./review.controller.js"
import { createReviewSchema, reviewListQuerySchema } from "./review.schema.js"

const router = Router()

router.use(authenticate, authorize("TENANT"))

// Create Review
router.post("/", validate(createReviewSchema, "body"), reviewController.createReview)

// Get Own Reviews
router.get("/", validate(reviewListQuerySchema, "query"), reviewController.getTenantReviews)

export const tenantReviewRouter = router
