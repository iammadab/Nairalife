const { createValidator } = require("lazy-validator")

const addMemberValidator = createValidator("group_id.number, user_id.number")

async function addMember(data){

}

module.exports = addMember