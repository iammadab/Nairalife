const { createValidator } = require("lazy-validator")

const houseValidator = createValidator("address.string, landmark.string")

async function addHouse(data){
	let validationResult = houseValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", error: validationResult.errors }

	let validData = validationResult.data
}

module.exports = addHouse