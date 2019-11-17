const createOtp = require("./authentication.createOtp")
const verifyOtp = require("./authentication.verifyOtp")
const cookieFound = require("./authentication.cookieFound")
const cookieNotFound = require("./authentication.cookieNotFound")
const dynamicRouter = require("./authentication.dynamicRouter")

const authenticationServices = {
	createOtp,
	verifyOtp,
	cookieFound,
	cookieNotFound,
	dynamicRouter
}

module.exports = authenticationServices