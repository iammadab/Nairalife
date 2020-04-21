const pageFunctions = require("./functions")
const loanDb = require("../../data/db/loan.db")
const userDb = require("../../data/db/user.db")

async function allLoans(req, res, next){
	let allLoans = await loanDb.findWith({})

	for(let i = 0; i < allLoans.length; i++){
		let loan = allLoans[i]
		let userObj = await userDb.findOneWith({ user_id: loan.user_id })
		loan._doc.created_at = pageFunctions.createDate(loan.created_at).getHypenDate()
		loan._doc.name = userObj.fullname
	}

	allLoans.reverse()

	req.body.pageData = {
		loans: allLoans
	}

	next()
}

module.exports = allLoans