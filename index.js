const express = require("express")
const app = express()
const path = require("path")

app.set("view engine", "ejs")

app.use(express.static(path.resolve(__dirname, "public")))
app.get("/", (req, res) => {
	res.render("index")
})

app.listen(3000, () => {
	console.log("Application listening at port 3000")
})