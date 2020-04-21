const verifyBank = require("./payment.verifyBank")
const verifyBvn = require("./payment.verifyBvn")
const verifyCard = require("./payment.verifyCard")
const withdraw = require("./payment.withdraw")
const charge = require("./payment.charge")
const manual = require("./payment.manual")
const getBank = require("./payment.getBank")

const paymentServices = {
	verifyBank,
	verifyBvn,
	verifyCard,
	withdraw,
	charge,
	manual,
	getBank
}

module.exports = paymentServices