const verifyBank = require("./payment.verifyBank")
const verifyCard = require("./payment.verifyBank")

const paymentServices = {
	verifyBank,
	verifyCard
}

module.exports = paymentServices