const carServices = require("../../car")

async function fetchCars(){
	return carServices.fetchAll()
}

module.exports = fetchCars