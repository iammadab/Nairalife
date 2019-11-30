const withdrawSuccess = require("./withdraw.success")
const withdrawFailed = require("./withdraw.failed")
const chargeSuccess = require("./charge.success")

const paymentFunctions = {
	withdrawSuccess,
	withdrawFailed,
	chargeSuccess
}

module.exports = paymentFunctions