const pageFunctions = require("./functions")
const loanDb = require("../../data/db/loan.db")

async function loans(req, res, next){
	let userObj = await pageFunctions.fetchUser(req.body.user.id)
	let loans = await loanDb.findWith({ user_id: userObj.user_id })

	loans.forEach(loan => {
		loan._doc.created_at = pageFunctions.createDate(loan.created_at).getHypenDate()
	})

	req.body.pageData = {
		loans
	}

	next()
}

module.exports = loans