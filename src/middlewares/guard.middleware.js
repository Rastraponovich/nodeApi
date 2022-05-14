const ApiError = require("../exceptions/api-error.exception")
const authService = require("../services/auth.service")
const tokensService = require("../services/tokens.service")

module.exports = function (req, res, next) {
    try {
        const accessTokenHeader = req.headers.authorization

        if (!accessTokenHeader) return next(ApiError.UnauthorizedError())

        const accessToken = accessTokenHeader.split(" ")[1]

        if (!accessToken) return next(ApiError.UnauthorizedError())

        const userData = tokensService.validateAccessToken(accessToken)

        if (!userData) return next(ApiError.UnauthorizedError())

        req.user = userData
        next()
    } catch (error) {
        return next(ApiError.UnauthorizedError())
    }
}
