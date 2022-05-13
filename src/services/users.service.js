const usersModel = require("../models/users.model")

class UsersService {
    async create(user) {
        return await usersModel.create(user)
    }
    async getAll() {
        return await usersModel.find()
    }
    async getOne(id) {
        return await usersModel.findById(id)
    }
    async update(id, user) {
        return await usersModel.updateOne(id, user)
    }
    async delete(id) {
        return await usersModel.remove(id)
    }
}

module.exports = new UsersService()
