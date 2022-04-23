const joi = require('joi');

const user = joi.object({
    name : joi.string().alphanum().min(3).max(20).required(),
    email: joi.string().email().lowercase().required(),
    phone: joi.string().length(10).pattern(new RegExp(/^[0-9]+$/)).required(),
    password:joi.string().pattern(new RegExp(/^[a-zA-Z0-9]+$/)).required()
})


module.exports={
    user
}