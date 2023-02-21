const joi = require('joi')
const validRoles = [ "admin", "superadmin"];

const validation2 = joi.object({
    name:joi.string().trim().required(),
    email:joi.string().email().trim().required(),
    password:joi.string().min(3).max(10).trim().required(),
    role:joi.string().trim().valid(...validRoles).required()
})  
module.exports = validation2