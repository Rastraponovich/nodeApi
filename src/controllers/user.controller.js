const UserDto = require("../dto/user.dto")
const authService = require("../services/auth.service")
const usersService = require("../services/users.service")

class UserController {
    async create(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userData = await authService.refresh(refreshToken)
            res.cookie("refreshToken", userData.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
            const user = await usersService.create(req.body)

            res.status(201).json(user)
        } catch (error) {
            next(error)
        }
    }

    async getOne(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userData = await authService.refresh(refreshToken)
            res.cookie("refreshToken", userData.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
            const user = await usersService.getOne(req.params.id)

            res.status(200).json(new UserDto(user))
        } catch (error) {
            next(error)
        }
    }
    async getAll(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userData = await authService.refresh(refreshToken)
            res.cookie("refreshToken", userData.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
            const users = await usersService.getAll()
            const userDto = users.map((user) => new UserDto(user))
            res.status(200).json(userDto)
        } catch (error) {
            next(error)
        }
    }
    async update(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userData = await authService.refresh(refreshToken)
            res.cookie("refreshToken", userData.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })

            const updatedUser = await usersService.update(req.params.id, req.body)

            res.status(201).json(updatedUser)
        } catch (error) {
            next(error)
        }
    }
    async remove(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userData = await authService.refresh(refreshToken)
            res.cookie("refreshToken", userData.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
            const result = await usersService.delete(req.params.id)

            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()
