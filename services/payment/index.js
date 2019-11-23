const verifyBank = require("./payment.verifyBank")
const verifyBvn = require("./payment.verifyBvn")
const verifyCard = require("./payment.verifyCard")
const withdraw = require("./payment.withdraw")

const paymentServices = {
	verifyBank,
	verifyBvn,
	verifyCard,
	withdraw
}

module.exports = paymentServices