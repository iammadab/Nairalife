function createDb(dbModel){
	let baseDbFunctions = {}

	baseDbFunctions.findWith = async (keyObj, specifier) => {
		return dbModel.find(keyObj, specifier)
	}

	baseDbFunctions.findOneWith = async (keyObj, specifier) => {
		return dbModel.findOne(keyObj, specifier)
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
		let dbObj = await dbModel.findOne(keyObj)
		dbObj._doc[key] = data
		dbObj.markModified(key)
		return dbObj.save()
	}

	return baseDbFunctions
}

module.exports = createDb