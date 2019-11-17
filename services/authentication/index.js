const createOtp = require("./authentication.createOtp")
const verifyOtp = require("./authentication.verifyOtp")
const cookieFound = require("./authentication.cookieFound")
const cookieNotFound = require("./authentication.cookieNotFound")


const authenticationServices = {
	createOtp,
	verifyOtp,
	cookieFound,
	cookieNotFound
}

module.exports = authenticationServices