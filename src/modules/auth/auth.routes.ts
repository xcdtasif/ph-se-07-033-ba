import { Router } from "express"

import { validate } from "../../middlewares/validate.js"
import { authController } from "./auth.controller.js"
import { loginUserSchema, signupUserSchema } from "./auth.schema.js"

const router = Router()

// Sign Up User
router.post("/signup", validate(signupUserSchema, "body"), authController.signupUser)

// Log In User
router.post("/login", validate(loginUserSchema, "body"), authController.loginUser)

// Refresh Tokens
router.post("/refresh", authController.refreshTokens)

export const authRouter = router
