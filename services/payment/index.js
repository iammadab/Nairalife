const verifyBank = require("./payment.verifyBank")
const verifyCard = require("./payment.verifyCard")

const paymentServices = {
	verifyBank,
	verifyCard
}

module.exports = paymentServices