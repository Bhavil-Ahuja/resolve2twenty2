const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const session = require("express-session")
const { v4: uuidv4 } = require("uuid")
const router = require('./router')
const { text } = require("body-parser")
const DB = require("./data")

const app = express()
const port = 3000 || process.env.port

app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(express.static("public"))

mongoose.connect("mongodb+srv://developer-bhavil:150902@cluster0.pbiym.mongodb.net/project_userDB")

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}))

app.use('/route', router);

app.get("/", (req, res) => {
    res.render("login")
})

app.get("/route/register", (req, res) => {
    res.render("register")
})

app.post("/route/register", (req, res) => {
    const newReg = new DB({
        Uname: req.body.Uname,
        Pass: req.body.Pass
    })
    newReg.save()
    res.redirect("/route/login")
})

app.get("/route/login", (req, res) => {
    res.render("login")
})

app.listen(port, () => {
    console.log("Server started!")
})