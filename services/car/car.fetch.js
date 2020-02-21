const { createValidator } = require("lazy-validator")

const cars = require("./car.db")

const fetchCarValidator = createValidator("id.string.lowercase")

function fetchCar(data){
	let validationResult = fetchCarValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_BODY", errors: validationResult.errors }

	let validData = validationResult.data

	let matchedCar = null
	cars.forEach(car => {
		if(car.id == validData.id)
			matchedCar = car
	})

	if(!matchedCar)
		return { status: 403, code: "CAR_NOT_FOUND" }

	return { status: 200, code: "CAR_FOUND", car: matchedCar }
}

module.exports = fetchCar