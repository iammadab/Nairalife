const pageFunctions = require("./functions")
const account = require("./page.account")

async function loan(req, res, next){
	let userObj = await pageFunctions.fetchUser(req.body.user.id)

	if(userObj.loan_stage == "bvn"){
		account(req, res, displayAccountPage)
		function displayAccountPage(){
			res.render("account", { title: "Bank Account", link: "account", banks: req.body.pageData.banks })
		}
	}

	else if(userObj.loan_stage == "residence")
		res.render("residence", { title: "Place of Residence", link: "residence", ...req.body.pageData })

	else if(userObj.loan_stage == "request")
		res.render("loan", { title: "Instalment Loans", link: "loan",...req.body.pageData })

}

module.exports = loan