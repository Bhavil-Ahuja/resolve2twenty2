const mongoose = require("mongoose")

const ResolutionSchema = {
    Uname: String,
    title: String
}

module.exports = new mongoose.model("Resolution", ResolutionSchema)