const commentDb = require("../../../data/db/comment.db")

async function fetchComments(querySpecifier){
	return commentDb.findWith(querySpecifier, {}, { created_at: -1 })
}

module.exports = fetchComments