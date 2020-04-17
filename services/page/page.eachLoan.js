const pageFunctions = require("./functions")
const loanDb = require("../../data/db/loan.db")

async function eachLoan(req, res, next){
	let loanObj = await loanDb.findWith({ _id: req.params.loan_id })
	let userObj = await pageFunctions.fetchUser(req.body.user.id)

	if(userObj.user_id != loanObj.user_id)
		return res.redirect("/requests")

	loanObj._doc.created_at = pageFunctions.createDate(loanObj.created_at).getHypenDate()

	req.body.pageData = {
		loan: loanObj
	}
}

module.exports = eachLoan