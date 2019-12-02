function cookieNotFound(redirectUrl, param){
	return function(req, res, next){
		console.log("Got to cookie not found")
		console.log("These are the cookies sent", req.cookies)
		let prop = param ? param : "token"
		if(!req.cookies || !req.cookies[prop])
			res.redirect(redirectUrl)
		else{
			console.log("We found the cookie we were looking for ", req.cookies[prop])
			req.body[prop] = req.cookies[prop]
			next()
		}
	}
}

module.exports = cookieNotFound