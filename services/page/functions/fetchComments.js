const commentDb = require("../../../data/db/comment.db")

async function fetchComments(querySpecifier){
	return commentDb.findWith(querySpecifier)
}

module.exports = fetchComments