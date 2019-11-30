require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const { connectToDb } = require("./runners/database_runner")

const PORT = process.env.PORT || 3000

const app = express()
const path = require("path")

app.use(morgan("dev"))

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
	res.render("404", { title: "404 Error Page"})
})

app.listen(PORT, () => {
	console.log(`Application listening at port ${PORT}`)
})