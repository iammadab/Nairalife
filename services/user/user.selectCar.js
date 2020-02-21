const { createValidator } = require("lazy-validator")

const selectCarValidator = createValidator("id.string.lowercase")

const carService = require("../car")
const userPlan = require("./user.plan")

async function selectCar(data){
	let validationResult = selectCarValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_BODY", errors: validationResult.errors }

	let validData = validationResult.data

	let carResult = carService.fetchCar({ id: validData.id })
	if(carResult.status != 200)
		return carResult

	let { total_amount, period, amount } = carResult.car

	let planResult = await userPlan({
		total_amount,
		period,
		amount,
		user: data.user
	})
	if(planResult.status != 200)
		return planResult

	return { status: 200, code: "CAR_SELECTED" }
}

module.exports = selectCar