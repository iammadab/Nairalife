function createDb(dbModel){
	let baseDbFunctions = {}

	baseDbFunctions.findWith = async (keyObj) => {
		return dbModel.find(keyObj)
	}

	baseDbFunctions.findOneWith = async (keyObj) => {
		return dbModel.findOne(keyObj)
	}

	return baseDbFunctions
}

module.exports = createDb