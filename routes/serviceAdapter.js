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
			if(responseData.cookie)
				res.cookie(responseData.cookie[0], responseData[responseData.cookie[0]])
			return res.status(responseData.status).json(responseData)
		}
	}
}

module.exports = {
	bodyResponder: createResponder("body"),
	paramResponder: createResponder("params")
}