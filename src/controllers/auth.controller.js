const { validationResult } = require("express-validator")

const authService = require("../services/auth.service")
const ApiError = require("../exceptions/api-error.exception")

class AuthController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("validation error", errors.array()))
            }

            const { email, password, name } = req.body

            const userData = await authService.registration({ email, password, name })
            res.cookie("refreshToken", userData.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
            res.json(userData)
        } catch (error) {
            next(error)
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const userData = await authService.login(email, password)
            res.cookie("refreshToken", userData.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies

            const token = await authService.logout(refreshToken)

            res.clearCookie("refreshToken")
            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies

            const userData = await authService.refresh(refreshToken)
            res.cookie("refreshToken", userData.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AuthController()
