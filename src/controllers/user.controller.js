const UserDto = require("../dto/user.dto")
const usersService = require("../services/users.service")

class UserController {
    async create(req, res, next) {
        try {
            const user = await usersService.create(req.body)
            res.status(201).json(user)
        } catch (error) {
            next(error)
        }
    }

    async getOne(req, res, next) {
        try {
            const user = await usersService.getOne(req.params.id)
            res.status(200).json(new UserDto(user))
        } catch (error) {
            next(error)
        }
    }
    async getAll(req, res, next) {
        try {
            const users = await usersService.getAll()
            const userDto = users.map((user) => new UserDto(user))

            res.status(200).json(userDto)
        } catch (error) {
            next(error)
        }
    }
    async update(req, res, next) {
        try {
            const updatedUser = await usersService.update(req.params.id, req.body)
            res.status(201).json(updatedUser)
        } catch (error) {
            next(error)
        }
    }
    async remove(req, res, next) {
        try {
            const result = await usersService.delete(req.params.id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()
