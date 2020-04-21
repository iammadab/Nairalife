require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const fileUpload = require("express-fileupload")
const { connectToDb } = require("./runners/database_runner")

const PORT = process.env.PORT || 3000

const app = express()
const path = require("path")

connectToDb()

if(PORT)
	app.set("trust proxy", true)

app.use(isDbConnected)
app.use(morgan("combined"))
app.use(fileUpload({
	limits: { fileSize: 2 * 1024 * 1024 }
}))

app.set("view engine", "ejs")
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, "public")))

const routes = require("./routes")
app.use("/api", routes)

const viewRoutes = require("./routes/view.route")
app.use("/", viewRoutes)











app.use((req, res) => {
	res.render("404", { title: "404 Error Page"})
})

app.listen(PORT, () => {
	console.log(`Application listening at port ${PORT}`)
})

// Manual transactions
// const transactionDb = require("./data/db/transaction.db")
// transactionDb.createTransaction({
// 	username: "Joseph Ogbiji Bosee",
// 	user_id: 1620,
// 	amount: 90000,
// 	reference: "3dPvmhcwoetea0dp",
// 	type: "higher_purchase",
// 	status: "success",
// 	data: {
// 		type: "manual",
// 		method: "transfer"
// 	}
// }).then(console.log)

function isDbConnected(req, res, next){
	const mongoose = require("mongoose")
	if(mongoose.connection.readyState != 1){
		connectToDb()
			.then(next)
	}
	else
		next()
}