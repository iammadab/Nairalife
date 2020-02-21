const pageFunctions = require("./functions")

async function cars(req, res, next){
	let cars = await pageFunctions.fetchCars()

	req.body.pageData = {
		cars
	}

	next()
}

module.exports = cars