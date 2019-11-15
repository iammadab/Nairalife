function createResponder(type){
	return function responder(fn){
		return async function(req, res){
			let response = await fn(req[type])
			return sendResponse(res, response)
		}

		function sendResponse(res, responseData){
			if(!responseData.status)
				responseData.status = 500
			res.status(responseData.status).json(responseData)
		}
	}
}

module.exports = {
	bodyResponder: createResponder("body"),
	paramResponder: createResponder("params")
}