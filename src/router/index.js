const authRouter = require("./auth.router")
const usersRouter = require("./users.router")
const errorMiddleware = require("../middlewares/error.middleware")

const init = (app) => {
    app.use("/api/auth", authRouter)
    app.use("/api/users", usersRouter)
    app.use(errorMiddleware)
}

module.exports = {
    init: init,
}
