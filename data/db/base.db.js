function createDb(dbModel){
	let baseDbFunctions = {}

	baseDbFunctions.findWith = async (keyObj) => {
		return dbModel.find(keyObj)
	}

	baseDbFunctions.findOneWith = async (keyObj) => {
		return dbModel.findOne(keyObj)
	}

	baseDbFunctions.create = async (dataObj) => {
		let newDocument = new dbModel({ ...dataObj })
		return newDocument.save()
	}

	return baseDbFunctions
}

module.exports = createDb