const { createValidator } = require("lazy-validator")

const selectCarValidator = createValidator("id.string.lowercase")

const carService = require("../car")
const userPlan = require("./user.plan")

const SERVICE_CHARGE = 400000

async function selectCar(data){
	let validationResult = selectCarValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_BODY", errors: validationResult.errors }

	let validData = validationResult.data

	let carResult = carService.fetchCar({ id: validData.id })
	if(carResult.status != 200)
		return carResult

	let { total_amount, period, weeks, name } = carResult.car

	total_amount += SERVICE_CHARGE
	
	let planResult = await userPlan({
		total_amount,
		car_amount: total_amount - SERVICE_CHARGE,
		car_name: name,
		period,
		total_weeks: weeks,
		user: data.user
	})
	if(planResult.status != 200)
		return planResult

	return { status: 200, code: "CAR_SELECTED" }
}

module.exports = selectCar