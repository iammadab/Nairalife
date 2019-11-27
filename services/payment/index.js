const verifyBank = require("./payment.verifyBank")
const verifyBvn = require("./payment.verifyBvn")
const verifyCard = require("./payment.verifyCard")
const withdraw = require("./payment.withdraw")
const charge = require("./payment.charge")

const paymentServices = {
	verifyBank,
	verifyBvn,
	verifyCard,
	withdraw,
	charge
}

module.exports = paymentServices