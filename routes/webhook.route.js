const express = require("express")
const webhookRouter = express.Router()

const paymentFunctions = require("../services/payment/functions")
console.log(paymentFunctions)

webhookRouter.post("/paystack", function(req, res){
	console.log("Paystack web hook")
	console.log(req.body)

	if(!req.body.event){
		return console.log("Invalid paystack request body")
	}

	switch(req.body.event){
		case "transaction.success":
			paymentFunctions.withdrawSuccess(req.body.data)
			break
		case "transaction.failed":
			paymentFunctions.withdrawFailed(req.body.data)
			break
		case "charge.success":
			paymentFunctions.chargeSuccess(req.body.data)		
			break
	}

})

module.exports = webhookRouter