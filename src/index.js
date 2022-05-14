const cors = require("cors")
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

const routes = require("./router")
require("dotenv").config()

const app = express()

app.use(cookieParser())
app.use(cors())
app.use(express.json())
routes.init(app)

const start = async () => {
    try {
        mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(process.env.PORT, () => {
            console.log("Server started on Port ", process.env.PORT)
        })
    } catch (error) {
        console.log(error)
    }
}

start()
