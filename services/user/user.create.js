const { createValidator } = require("lazy-validator")
const { hash } = require("../../lib/crypt")
const userDb = require("../../data/db/user.db")

const createUserValidator = createValidator("fullname.string.lowercase, phone.number, email.string.lowercase, password.string, code.number")

const authenticationService = require("../authentication")
const loginUser = require("./user.login")


async function createUser(data){
	let validationResult = createUserValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_BODY", errors: validationResult.errors }

	let userData = validationResult.data

	userData.password = await hash(userData.password)

	let phoneExist = await checkIfPhoneExists(userData)
	if(phoneExist.error) 
		return phoneExist.response

	let emailExist = await checkIfEmailExists(userData)
	if(emailExist.error) 
		return emailExist.response

	let otpVerificationResult = await authenticationService.verifyOtp({ phone: userData.phone, code: userData.code })
	if(otpVerificationResult.status != 200)
		return otpVerificationResult

	let userObj = await userDb.createUser(userData)

	let loginResult = await loginUser({ phone: userData.phone, password: userData.password })
	if(loginResult.status != 200)
		return loginResult

	return { status: 200, code: "USER_CREATED_AND_LOGGED_IN", token: loginResult.token }

	// if(userObj)
	// 	return { status: 200, code: "USER_CREATED", data: userObj }
}

module.exports = createUser







async function checkIfPhoneExists(userData){
	let usersWithPhone = await userDb.findWith({ phone: userData.phone })
	if(usersWithPhone.length > 0)
		return { error: true, response: { status: 403, code: "PHONE_EXISTS", message: "User with phone exists" }}
	return usersWithPhone
}

async function checkIfEmailExists(userData){
	let usersWithEmail = await userDb.findWith({ email: userData.email })
	if(usersWithEmail.length > 0)
		return { error: true, response: { status: 403, code: "EMAIL_EXISTS", message: "User with email exists" }}
	return usersWithEmail
}