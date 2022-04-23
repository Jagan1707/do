const joi = require('joi');


const orderSchema = joi.object({
    orderId : joi.string().required(),
    name : joi.string().pattern(new RegExp(/^[A-za-z]+[0-9]+$/)).max(20).required(),
    email: joi.string().email().lowercase().required(),
    phone: joi.string().pattern(new RegExp(/^[0-9]+$/)).required(),
    address: joi.object().keys({
        doorno:joi.number().required(),
        street:joi.string().required(),
        area:joi.string().required(),
        state:joi.string().required(),
        pincode:joi.string().required()
    }).required()

},
{
    timestamps:true
})




module.exports={
    orderSchema
}