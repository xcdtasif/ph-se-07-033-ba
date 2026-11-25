import type { Request, Response } from "express"
import httpStatus from "http-status"

import { AppError } from "../../utils/app-error.js"
import { sendResponse } from "../../utils/send-response.js"
import { authCookies } from "./auth.cookies.js"
import type { LoginUserPayload, SignupUserPayload } from "./auth.schema.js"
import { authService } from "./auth.service.js"

const signupUser = async (req: Request<{}, {}, SignupUserPayload>, res: Response) => {
  const { user, accessToken, refreshToken } = await authService.signupUser(req.body)

  authCookies.setAuthCookies(res, accessToken, refreshToken)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Signed up successfully",
    data: user,
  })
}

const loginUser = async (req: Request<{}, {}, LoginUserPayload>, res: Response) => {
  const { user, accessToken, refreshToken } = await authService.loginUser(req.body)

  authCookies.setAuthCookies(res, accessToken, refreshToken)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Logged in successfully",
    data: user,
  })
}

const refreshTokens = async (req: Request, res: Response) => {
  const token: unknown = req.cookies?.["refreshToken"]

  if (typeof token !== "string" || token === "") {
    throw new AppError(httpStatus.UNAUTHORIZED, "Authentication required")
  }

  const { user, accessToken, refreshToken } = await authService.refreshTokens(token)

  authCookies.setAuthCookies(res, accessToken, refreshToken)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Tokens refreshed successfully",
    data: user,
  })
}

export const authController = { signupUser, loginUser, refreshTokens }
