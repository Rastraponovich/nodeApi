const bcryptjs = require("bcryptjs")
const ApiError = require("../exceptions/api-error.exception")
const generateTokens = require("../lib/generateTokens")
const usersModel = require("../models/users.model")
const tokensService = require("./tokens.service")

class AuthService {
    async registration(user) {
        const candidate = await usersModel.findOne({ email: user.email })

        if (candidate) throw ApiError.BadRequest(`Email ${user.email} already exists`)

        const password = await bcryptjs.hash(user.password, 3)
        const newUser = await usersModel.create({ ...user, password })

        return generateTokens(newUser)
    }
    async login(email, password) {
        const user = await usersModel.findOne({ email })

        if (!user) throw ApiError.BadRequest("user not found")

        const isPasswordEquals = await bcryptjs.compare(password, user.password)

        if (!isPasswordEquals) throw ApiError.BadRequest("wrong password")

        return generateTokens(user)
    }
    async logout(refreshToken) {
        return await tokensService.logout(refreshToken)
    }

    async refresh(refreshToken) {
        if (!refreshToken) throw ApiError.UnauthorizedError()

        const userData = tokensService.validateRefreshToken(refreshToken)
        const tokensDB = await tokensService.findRefreshToken(refreshToken)

        if (!userData || !tokensDB) throw ApiError.UnauthorizedError()

        const user = await usersModel.findById(userData.id)
        return generateTokens(user)
    }
}

module.exports = new AuthService()
