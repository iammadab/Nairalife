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
		return dbModel.update(keyObj, { $set: { [key]: data }})
	}

	return baseDbFunctions
}

module.exports = createDb