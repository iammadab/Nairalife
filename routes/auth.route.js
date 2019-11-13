const express = require("express")
const authRouter = express.Router()

authRouter.get("/", (req, res) => { res.send("Welcome to the auth router") })

module.exports = authRouter