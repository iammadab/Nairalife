function cookieNotFound(redirectUrl, param){
	return function(req, res, next){
		// Redirect to initial page
		let toRedirect = redirectUrl + `?from=${req.url}`
		
		let prop = param ? param : "token"
		if(!req.cookies || !req.cookies[prop])
			res.redirect(toRedirect)
		else{
			req.body[prop] = req.cookies[prop]
			next()
		}
	}
}

module.exports = cookieNotFound