const { promisify } = require("util") 
const { createValidator } = require("lazy-validator")

const verify = promisify(require("jsonwebtoken").verify)
const userDb = require("../../data/db/user.db")

let validateToken = tokenName => (req, res, next) => {
	tokenName = tokenName || "token"
	let tokenValidator = createValidator(`${tokenName}.string`)
	let tokenValidationResult = tokenValidator.parse(req.body)
	if(tokenValidationResult.error)
		return res.status(400).json({ code: "BAD_REQUEST_BODY", errors: tokenValidationResult.errors })

	let cookiePath = req.url.includes("admin") ? "/admin" : ""

	verifyToken()
		.then(attachUserInfo)
		.then(registerIp)
		.then(next)
		.catch(handleErrors)

	function verifyToken(token){
		return verify(req.body[tokenName], process.env.SECRET_KEY)
	}

	function attachUserInfo(decodedToken){
		let user = decodedToken
		req.body.user = user
	}

	async function registerIp(){
		let userObj = await userDb.findOneWith({ _id: req.body.user.id })
		if(req.ip != userObj.last_ip)
			userObj = await userDb.appendDoc({ _id: req.body.user.id }, "last_ip", req.ip)
		if(!userObj.ips.includes(req.ip)){
			let newIps = Object.assign(userObj.ips)
			newIps.push(req.ip)
			userObj = await userDb.appendDoc({ _id: req.body.user.id }, "ips", newIps)
		}
	}

	function handleErrors(error){
		res.clearCookie(tokenName, { path: cookiePath })
		return res.redirect(`${cookiePath}/login`)
		if(error.name == "TokenExpiredError")
			res.status(403).json({ code: "TOKEN_EXPIRED" })
		else if(error.name == "JsonWebTokenError")
			res.status(403).json({ code: "TOKEN_INVALID" })
		else
			res.status(400).json({ code: "COULD_NOT_VALIDATE_TOKEN" })
	}
}

module.exports = validateToken