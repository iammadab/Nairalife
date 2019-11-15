function createDb(dbModel){
	let baseDbFunctions = {}

	baseDbFunctions.findWith = async (keyObj) => {
		return dbModel.find(keyObj)
	}

	return baseDbFunctions
}

module.exports = createDb