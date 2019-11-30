async function upload(data){
	console.log(data.body)
	console.log(Object.keys(data.files))
}

module.exports = upload