module.exports = class UserDto {
    name
    id
    email
    constructor(model) {
        this.email = model.email
        this.id = model._id
        this.name = model.name
    }
}
