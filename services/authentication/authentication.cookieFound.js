function cookieFound(redirectUrl, param){
	return function(req, res, next){
		let prop = param ? param : "token"
		if(req.cookies && req.cookies[prop])
			res.redirect(redirectUrl)
		else
			next()
	}
}

module.exports = cookieFound