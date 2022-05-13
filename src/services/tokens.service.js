const jsonwebtoken = require("jsonwebtoken")
const tokensModel = require("../models/tokens.model")

class TokenService {
    generateTokens(payload) {
        const accessToken = jsonwebtoken.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: "15m" })
        const refreshToken = jsonwebtoken.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: "30d" })

        return {
            accessToken,
            refreshToken,
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokensModel.findOne({ user: userId })

        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        const token = await tokensModel.create({ user: userId, refreshToken })
        return token
    }
    async updateToken() {}
    async getUser() {}
}

module.exports = new TokenService()
