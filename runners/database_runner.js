function connectToDb(){
	const mongoose = require("mongoose")
	if(process.env.PORT)
		connectToOnlineDb(mongoose)
	else
		connectToOfflineDb(mongoose)
}

function connectToOnlineDb(mongoose){
	mongoose.connect(`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_KEY}@cluster0-oaogc.mongodb.net/nairalife?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Connected to online db"))
        .catch(err => console.log("Error connecting to online db"))
}

function connectToOfflineDb(mongoose){
	mongoose.connect(`mongodb://localhost/nairalife`, { useNewUrlParser: true, useUnifiedTopology: true })
		    .then(() => { console.log("Connected to local db") })
		    .catch(err => { console.log("Error connecting to local db", err) })
}

module.exports = {
	connectToDb
}