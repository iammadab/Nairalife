require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const { connectToDb } = require("./runners/database_runner")

const app = express()
const path = require("path")

app.set("view engine", "ejs")
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, "public")))

connectToDb()

const routes = require("./routes")
app.use("/api", routes)










app.get("/pages/:page", (req, res) => {
	res.render(req.params.page, { link: "", title: "My Home" })
})

app.listen(3000, () => {
	console.log("Application listening at port 3000")
})