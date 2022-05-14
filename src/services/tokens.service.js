const jsonwebtoken = require("jsonwebtoken")
const tokensModel = require("../models/tokens.model")

class TokenService {
    generateTokens(payload) {
        const accessToken = jsonwebtoken.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: "15m" })
        const refreshToken = jsonwebtoken.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: "30d" })

        return { accessToken, refreshToken }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokensModel.findOne({ user: userId })

        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        return await tokensModel.create({ user: userId, refreshToken })
    }

    async logout(refreshToken) {
        return await tokensModel.deleteOne({ refreshToken })
    }

    async findRefreshToken(refreshToken) {
        return await tokensModel.findOne({ refreshToken })
    }

    validateAccessToken(token) {
        try {
            return jsonwebtoken.verify(token, process.env.JWT_ACCESS_TOKEN)
        } catch (error) {
            return null
        }
    }

    validateRefreshToken(refreshToken) {
        try {
            return jsonwebtoken.verify(refreshToken, process.env.JWT_REFRESH_TOKEN)
        } catch (error) {
            return null
        }
    }
}

module.exports = new TokenService()
