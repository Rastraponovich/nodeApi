const userController = require("../controllers/user.controller")

const express = require("express")

const usersRouter = express.Router()

usersRouter.get("/", userController.getAll)
usersRouter.get("/:id", userController.getOne)
usersRouter.post("/", userController.create)
usersRouter.patch("/:id", userController.update)
// usersRouter.delete("/:id", userController.delete)

module.exports = usersRouter
