function createResponder(type){
	return function responder(fn){
		return async function(req, res){
			let response = await fn(req[type])
			return sendResponse(res, response)
		}

		function sendResponse(res, responseData){
			if(!responseData) 
				return res.status(500).json({ code: "NO_RESPONSE", message: "Got no response from the server" })
			if(!responseData.status)
				responseData.status = 500
			return res.status(responseData.status).json(responseData)
		}
	}
}

module.exports = {
	bodyResponder: createResponder("body"),
	paramResponder: createResponder("params")
}