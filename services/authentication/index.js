const createOtp = require("./authentication.createOtp")
const verifyOtp = require("./authentication.verifyOtp")
const cookieFound = require("./authentication.cookieFound")
const cookieNotFound = require("./authentication.cookieNotFound")
const stageRouter = require("./authentication.stageRouter")
const verifyToken = require("./authentication.verifyToken")

const authenticationServices = {
	createOtp,
	verifyOtp,
	cookieFound,
	cookieNotFound,
	stageRouter,
	verifyToken
}

module.exports = authenticationServices