const verifyBank = require("./payment.verifyBank")
const verifyCard = require("./payment.verifyCard")
const withdraw = require("./payment.withdraw")

const paymentServices = {
	verifyBank,
	verifyCard,
	withdraw
}

module.exports = paymentServices