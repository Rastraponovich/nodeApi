const usersService = require("../services/users.service")

class UserController {
    async create(req, res, next) {
        try {
            const user = await usersService.create(req.body)
            res.status(201).json(user)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    async getOne(req, res, next) {
        try {
            const user = await usersService.getOne(req.params.id)
            res.status(200).json(user)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
    async getAll(req, res, next) {
        try {
            const users = await usersService.getAll()
            res.status(200).json(users)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
    async update(req, res, next) {
        try {
            const updatedUser = await usersService.update(req.params.id, req.body)
            res.status(200).json(updatedUser)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
    async remove(req, res, next) {
        try {
            const result = await usersService.delete(req.params.id)
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
}

module.exports = new UserController()
