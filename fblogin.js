const mongoose = require("mongoose")

const userSchema = {
    Uname: String,
}

module.exports = new mongoose.model("Facebook_Data", userSchema)