const errorMiddleware = require("../middlewares/error.middleware")
const authRouter = require("./auth.router")
const usersRouter = require("./users.router")

const init = (app) => {
    app.use(errorMiddleware)

    app.use("/api/auth", authRouter)
    app.use("/api/users", usersRouter)
}

module.exports = {
    init: init,
}
