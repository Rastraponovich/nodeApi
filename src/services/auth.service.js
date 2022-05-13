const bcryptjs = require("bcryptjs")
const UserDto = require("../dto/user.dto")
const ApiError = require("../exceptions/api-error.exception")
const usersModel = require("../models/users.model")
const tokensService = require("./tokens.service")

class AuthService {
    async registration(user) {
        const candidate = await usersModel.findOne({ email: user.email })

        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с таким ${user.email} уже существует`)
        }
        const password = await bcryptjs.hash(user.password, 3)
        const newUser = await usersModel.create({ ...user, password })

        const userDto = new UserDto(newUser)
        const tokens = tokensService.generateTokens({ ...userDto })

        await tokensService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto,
        }
    }
}

module.exports = new AuthService()
