const mongoose = require("mongoose")

const Schema = mongoose.Schema

const tokensSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    refreshToken: { type: String, required: true },
})

module.exports = mongoose.model("Token", tokensSchema, "tokens")
