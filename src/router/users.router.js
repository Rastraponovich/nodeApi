const express = require("express")

const userController = require("../controllers/user.controller")
const guardMiddleware = require("../middlewares/guard.middleware")

const usersRouter = express.Router()

usersRouter.get("/", guardMiddleware, userController.getAll)
usersRouter.get("/:id", guardMiddleware, userController.getOne)
usersRouter.post("/", guardMiddleware, userController.create)
usersRouter.patch("/:id", guardMiddleware, userController.update)
usersRouter.delete("/:id", guardMiddleware, userController.remove)

module.exports = usersRouter
