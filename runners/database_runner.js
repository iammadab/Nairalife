function connectToDb(){
	const mongoose = require("mongoose")
	if(process.env.PORT)
		return connectToOnlineDb(mongoose)
	else
		return connectToOfflineDb(mongoose)
}

function connectToOnlineDb(mongoose){
	let uri = `mongodb://${process.env.DB_NAME}:${process.env.DB_KEY}@cluster0-shard-00-00-oaogc.mongodb.net:27017,cluster0-shard-00-01-oaogc.mongodb.net:27017,cluster0-shard-00-02-oaogc.mongodb.net:27017/nairalife?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`
	return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Connected to online db"))
        .catch(err => console.log("Error connecting to online db", err))
}

function connectToOfflineDb(mongoose){
	return mongoose.connect(`mongodb://localhost/nairalife`, { useNewUrlParser: true, useUnifiedTopology: true })
		    .then(() => { console.log("Connected to local db") })
		    .catch(err => { console.log("Error connecting to local db", err) })
}

module.exports = {
	connectToDb
}