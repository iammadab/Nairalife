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

	baseDbFunctions.deleteOne = async (keyObj) => {
		return dbModel.deleteOne(keyObj)
	}

	baseDbFunctions.deleteMany = async (keyObj) => {
		return dbModel.deleteMany(keyObj)
	}

	baseDbFunctions.appendDoc = async (keyObj, key, data) =>{
		let dbObj = dbModel.findOne(keyObj)
		dbObj[key] = data
		return dbObj.save()
	}

	return baseDbFunctions
}

module.exports = createDb