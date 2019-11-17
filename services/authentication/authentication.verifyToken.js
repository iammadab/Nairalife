const { promisify } = require("util") 
const { createValidator } = require("lazy-validator")

const verify = promisify(require("jsonwebtoken").verify)
const validateTokenValidator = createValidator("token.string")

let validateToken = (req, res, next) => {
	validateTokenValidator(req.body)
		.catch(sendBadRequestError)
		.then(verifyToken)
		.then(attachUserInfo)
		.then(next)
		.catch(handleErrors)

	function sendBadRequestError(errors){
		throw lazyError.createError(400, "BAD_REQUEST_BODY", errors)
	}

	function verifyToken(token){
		return verify(req.body.token, process.env.SECRET_KEY)
	}

	function attachUserInfo(decodedToken){
		let user = decodedToken
		req.body.user = user
	}

	function handleErrors(error){
		if(error.name == "TokenExpiredError")
			res.status(403).json({ code: "TOKEN_EXPIRED" })
		else if(error.name == "JsonWebTokenError")
			res.status(403).json({ code: "TOKEN_INVALID" })
		else if(error.code == "BAD_REQUEST_BODY")
			res.status(400).json(error)
		else
			res.status(400).json({ code: "COULD_NOT_VALIDATE_TOKEN" })
	}
}
module.exports = validateToken