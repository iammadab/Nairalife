const createOtp = require("./authentication.createOtp")
const verifyOtp = require("./authentication.verifyOtp")

const authenticationServices = {
	createOtp,
	verifyOtp
}

module.exports = authenticationServices