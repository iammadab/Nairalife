const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, "../", ".env") })

const { connectToDb } = require("../runners/database_runner")
const userModel = require("../data/models/user.model")

// This script contains code to automate some common user stage update functionality

/** 
	* Funnel
	* Take users in different stages and funnel all of them into one stage
  * Params
  * stages - array of all stages to be funneled
  * stageUpdate - new stage to funnel all the users 
 **/

function funnel(stages, stageUpdate){

	connectToDb()
		.then(() => createOrQueries(stages))
		.then(queries => executeUpdate(queries, stageUpdate))
		.then(success)
		.catch(failure)

	function createOrQueries(stages){
		return stages.map(stage => {
			return { stage }
		})
	}

	function executeUpdate(queries){
		return userModel.updateMany({ $or: queries }, { $set: { stage: stageUpdate }})
	}

	function success(){
		console.log("Funnel complete")
	}

	function failure(err){
		console.log("Problem funnelling")
		console.log("Verbose error")
		console.log(".............")
		console.log(err)
	}
	
}

// funnel(["plan_approval", "choose_plan"],  "enter_info")