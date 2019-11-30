const express = require("express")
const webhookRouter = express.Router()

webhookRouter.post("/paystack", function(req, res){
	console.log("Paystack web hook")
	console.log(req.body)

	if(!req.body.event){
		return console.log("Invalid paystack request body")
	}

	// switch(req.body.event){
	// 	case "transaction.success":
		
	// }

})

module.exports = webhookRouter