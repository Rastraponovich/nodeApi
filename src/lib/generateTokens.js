const UserDto = require("../dto/user.dto")
const tokensService = require("../services/tokens.service")

const generateTokens = async (user) => {
    const userDto = new UserDto(user)
    const tokens = tokensService.generateTokens({ ...userDto })
    await tokensService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
}

module.exports = generateTokens
