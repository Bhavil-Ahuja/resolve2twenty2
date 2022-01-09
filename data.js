const mongoose = require("mongoose")

const userSchema = {
    Uname: String,
    Pass: String
}

module.exports = new mongoose.model("User", userSchema)