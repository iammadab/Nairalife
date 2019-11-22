function cookieNotFound(redirectUrl, param){
	return function(req, res, next){
		let prop = param ? param : "token"
		if(!req.cookies || !req.cookies[prop])
			res.redirect(redirectUrl)
		else{
			req.body[prop] = req.cookies[prop]
			next()
		}
	}
}

module.exports = cookieNotFound