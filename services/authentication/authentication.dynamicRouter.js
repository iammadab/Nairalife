const userDb = require("../../data/db/user.db")

async function dynamicRouter(req, res, next){
	console.log(req.body)
	let userObj = await userDb.findOneWith({ phone: req.body.user.phone })
	let pageToBe = mapStageToPage(userObj.stage)
	if(pageToBe)
		return res.redirect(pageToBe)
	next()
}

module.exports = dynamicRouter


function mapStageToPage(stage){
	let map = {
		enter_card_details: "/account",
		enter_contribution_preference: "/about"
	}
	return map[stage]
}