import type { CookieOptions, Response } from "express"
import ms from "ms"

import { env } from "../../config/env.js"

const isProduction = env.NODE_ENV === "production"

const baseOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  path: "/",
}

const ACCESS_TOKEN_MAX_AGE = ms(env.JWT_ACCESS_TOKEN_EXPIRES_IN)
const REFRESH_TOKEN_MAX_AGE = ms(env.JWT_REFRESH_TOKEN_EXPIRES_IN)

const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
  res.cookie("accessToken", accessToken, { ...baseOptions, maxAge: ACCESS_TOKEN_MAX_AGE })
  res.cookie("refreshToken", refreshToken, { ...baseOptions, maxAge: REFRESH_TOKEN_MAX_AGE })
}

export const authCookies = { setAuthCookies }
