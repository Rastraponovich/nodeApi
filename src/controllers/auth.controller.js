const authService = require("../services/auth.service")

class AuthController {
    async registration(req, res, next) {
        try {
            const { email, password, name } = req.body

            const userData = await authService.registration({ email, password, name })
            res.cookie("refreshToken", userData.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
            res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    async login(req, res, next) {}
}

module.exports = new AuthController()
