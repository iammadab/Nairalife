const pageFunctions = require("./functions")

async function cars(req, res, next){
	let cars = await pageFunctions.fetchCars()

	console.log(cars)
	req.body.pageData = {
		cars
	}
}

module.exports = cars