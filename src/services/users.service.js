const bcryptjs = require("bcryptjs")
const UserDto = require("../dto/user.dto")
const usersModel = require("../models/users.model")

class UsersService {
    async create(user) {
        const password = await bcryptjs.hash(user.password, 3)
        const newUser = await usersModel.create({ ...user, password })

        return new UserDto(newUser)
    }
    async getAll() {
        return await usersModel.find()
    }
    async getOne(id) {
        return await usersModel.findById(id)
    }
    async update(id, user) {
        return await usersModel.updateOne({ id }, user)
    }
    async delete(id) {
        return await usersModel.deleteOne({ id })
    }
}

module.exports = new UsersService()
