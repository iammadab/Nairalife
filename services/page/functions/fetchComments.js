const commentDb = require("../../../data/db/comment.db")

async function fetchComments(querySpecifier, options){
	let cursor = commentDb.findWith(querySpecifier)
	if(options.sort)
		cursor = cursor.sort(options.sort)
	return cursor
}

module.exports = fetchComments