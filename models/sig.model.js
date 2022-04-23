const mongoose =require('mongoose');
const crypto = require('crypto');

const userSchema= new mongoose.Schema({
    uuid :{type:String,required : false},
    username :{type:String,required : true,trim:true},
    email :{type:String,required : true},
    mobileNumber :{type:String,required : true},
    password :{type:String,required : true},
    resetLink:{type:String,required:false}
},{
    timestamps:true
})

userSchema.pre('save',function(next){
    this.uuid = "REG-"+crypto.pseudoRandomBytes(6).toString('hex').toUpperCase()
    console.log({"uuid":this.uuid});
    next();
})



module.exports = mongoose.model('user',userSchema);  