require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const { connectToDb } = require("./runners/database_runner")

const app = express()
const path = require("path")

app.set("view engine", "ejs")
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, "public")))

connectToDb()

const routes = require("./routes")
app.use("/api", routes)

const viewRoutes = require("./routes/view.route")
app.use("/", viewRoutes)











app.use((req, res) => {
	res.send("404, Resource not found")
})

app.listen(3000, () => {
	console.log("Application listening at port 3000")
})