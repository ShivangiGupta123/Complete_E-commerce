const joi = require('joi')
const validRoles = [ "user", "customer"];

const validation1 = joi.object({
    firstname:joi.string().trim().required(),
    lastname:joi.string().trim().required(),
    email:joi.string().email().trim().required(),
    password:joi.string().min(3).max(10).trim().required(),
    password_confirmation:joi.string().min(3).max(10).trim().required(),
    phone:joi.string().min(10).max(10).trim().required(),
    role:joi.string().trim().valid(...validRoles).required()
})  
module.exports = validation1