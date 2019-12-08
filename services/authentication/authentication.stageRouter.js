const userDb = require("../../data/db/user.db")

function stageRouter(allowedStage){
	return async function accountStage(req, res, next){
		let userObj = await userDb.findOneWith({ _id: req.body.user.id })
		if(!userObj){
			res.clearCookie("token")
			return res.redirect("/login")
		}
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
		enter_account_details: "/account",
		enter_info: "/about",
		choose_plan: "/plan",
		plan_approval: "/awaiting",
		start_plan: "/start"
	}
	return map[stage]
}