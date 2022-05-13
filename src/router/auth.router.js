const express = require("express")
const authController = require("../controllers/auth.controller")

const authRouter = express.Router()

authRouter.post("/registration", authController.registration)
authRouter.post("/login", authController.login)

module.exports = authRouter
