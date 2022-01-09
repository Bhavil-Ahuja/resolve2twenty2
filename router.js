var express = require("express");
var router = express.Router();
const DB = require("./data")
const Resolution = require("./resolution")

router.post("/login", (req, res) => {
    DB.findOne({ Uname: req.body.Uname, Pass: req.body.Pass }, (err, results) => {
        if (!err) {
            if (results) {
                req.session.user = req.body.Uname
                res.redirect("/route/dashboard")
            }
            else {
                res.end("Invalid Username or Password")
            }
        }
    })
})

router.get("/home", (req, res) => {
    Resolution.find({Uname: req.session.user}, function(err, results) {
        if (!err) {
            if (results) {
                res.render("home", {list: results})
            }
        }
    })
    // if (req.session.user) {
    //     DB.findOne({ Uname: req.session.user }, (err, results) => {
    //         res.render("home")
    //     })
    // } else {
    //     res.send("Unauthorized User")
    // }
})

router.get("/dashboard", (req, res) => {
    DB.findOne({Uname: req.session.user}, function(err, results) {
        if (!err) {
            if (results) {
                res.render("dashboard", {Uname: results.Uname, Pass: results.Pass})
            }
        }
    })
})

router.post("/home", function(req, res) {
    const x = new Resolution({
        Uname: req.session.user,
        title: req.body.name
    })
    x.save()
    setTimeout(function() {
        res.redirect("/route/home")
    }, 1000)
})

router.post("/home/delete", function(req, res) {
    const deleteThisID = req.body.checkbox
    Resolution.findByIdAndDelete(deleteThisID, function(err) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Deleted successfully")
            res.redirect("/route/home")
        }
    })
})

module.exports = router