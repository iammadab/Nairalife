const userDb = require("../../data/db/user.db")

function stageRouter(allowedStage){
	return async function accountStage(req, res, next){
		let userObj = await userDb.findOneWith({ phone: req.body.user.phone })
		if(userObj.stage == allowedStage)
			return next()
		let pageToBe = mapStageToPage(userObj.stage)
		if(pageToBe)
			return res.redirect(pageToBe)
		return res.redirect("/home")
	}
}

module.exports = stageRouter


function mapStageToPage(stage){
	let map = {
		enter_card_details: "/account",
		enter_contribution_preference: "/about"
	}
	return map[stage]
}