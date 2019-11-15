const { createValidator } = require("lazy-validator")

const userLoginValidator = createValidator("phone.number, password.string")

async function loginUser(data){

}

module.exports = loginUser