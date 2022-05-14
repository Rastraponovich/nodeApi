const express = require("express")
const { body } = require("express-validator")

const authController = require("../controllers/auth.controller")

const authRouter = express.Router()

authRouter.post(
    "/registration",
    body("email").isEmail(),
    body("password").isLength({ min: 3, max: 32 }),
    body("name").isLength({ min: 1, max: 32 }),
    authController.registration
)
authRouter.post("/login", body("email").isEmail(), body("password").isLength({ min: 3, max: 32 }), authController.login)
authRouter.post("/logout", authController.logout)
authRouter.get("/refresh", authController.refresh)

module.exports = authRouter
