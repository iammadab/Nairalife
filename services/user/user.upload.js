const path = require("path")

let baseDir = __dirname

async function upload(data){
	Object.keys(data.files).forEach(filename => {
		let fileObj = data.files[filename]
		let fileParts = fileObj.name.split("."), ext = fileParts[fileParts.length - 1]
		let imgPath = path.join(baseDir, "../../images/", `/${data.body.user_id}_${filename}.${ext}`)
		console.log(imgPath)
		fileObj.mv(imgPath)
	})
}

module.exports = upload