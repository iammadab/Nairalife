const express = require("express")
const webhookRouter = express.Router()

webhookRouter.post("/paystack", function(req, res){
	console.log("Paystack web hook")
	console.log(req.body)
})

module.exports = webhookRouter