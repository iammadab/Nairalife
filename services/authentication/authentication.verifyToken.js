const { promisify } = require("util") 
const { createValidator } = require("lazy-validator")

const verify = promisify(require("jsonwebtoken").verify)

let validateToken = tokenName => (req, res, next) => {
	tokenName = tokenName || "token"
	let tokenValidator = createValidator(`${tokenName}.string`)
	let tokenValidationResult = tokenValidator.parse(req.body)
	if(tokenValidationResult.error)
		return res.status(400).json({ code: "BAD_REQUEST_BODY", errors: tokenValidationResult.errors })

	verifyToken()
		.then(attachUserInfo)
		.then(next)
		.catch(handleErrors)

	function verifyToken(token){
		return verify(req.body[tokenName], process.env.SECRET_KEY)
	}

	function attachUserInfo(decodedToken){
		let user = decodedToken
		req.body.user = user
	}

	function handleErrors(error){
		res.clearCookie(tokenName)
		res.redirect("/login")
		if(error.name == "TokenExpiredError")
			res.status(403).json({ code: "TOKEN_EXPIRED" })
		else if(error.name == "JsonWebTokenError")
			res.status(403).json({ code: "TOKEN_INVALID" })
		else
			res.status(400).json({ code: "COULD_NOT_VALIDATE_TOKEN" })
	}
}

module.exports = validateToken