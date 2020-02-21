const { createValidator } = require("lazy-validator")

const selectCarValidator = createValidator("id.string.lowercase")

const carService = require("../car")

async function selectCar(data){
	let validationResult = selectCarValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_BODY", errors: validationResult.errors }

	let validData = validationResult.data

	let carResult = carService.fetchCar({ id: validData.id })
	if(carResult.status != 200)
		return carResult

	console.log(carResult)
}

module.exports = selectCar