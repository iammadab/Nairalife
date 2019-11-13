const express = require("express")
const app = express()
const path = require("path")

app.set("view engine", "ejs")
app.use(express.static(path.resolve(__dirname, "public")))

const routes = require("./routes")
app.use("/", routes)










// app.get("/:page", (req, res) => {
// 	res.render(req.params.page, { link: "", title: "My Home" })
// })

app.listen(3000, () => {
	console.log("Application listening at port 3000")
})