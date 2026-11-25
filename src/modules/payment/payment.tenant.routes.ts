import { Router } from "express"

import { authenticate } from "../../middlewares/authenticate.js"
import { authorize } from "../../middlewares/authorize.js"
import { validate } from "../../middlewares/validate.js"
import { paymentController } from "./payment.controller.js"
import { createPaymentSchema, paymentListQuerySchema } from "./payment.schema.js"

const router = Router()

router.use(authenticate, authorize("TENANT"))

// Create Payment
router.post("/create", validate(createPaymentSchema, "body"), paymentController.createPayment)

// Get Own Payments
router.get("/", validate(paymentListQuerySchema, "query"), paymentController.getTenantPayments)

export const tenantPaymentRouter = router
