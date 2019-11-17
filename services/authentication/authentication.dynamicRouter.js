const userDb = require("../../data/db/user.db")

function dynamicRouter(req, res, next){
	console.log(req.body)
}

module.exports = dynamicRouter


function mapStageToPage(stage){
	let map = {
		enter_card_details: "/account",
		enter_contribution_preference: "/about"
	}
	return map[stage]
}