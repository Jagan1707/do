const user = require('../models/sig.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');




const register = (req,res,next)=>{

    bcrypt.hash(req.body.password,10,function(err,hashedpass){
        if(err){
            res.json({'error':err.message});
        }
        const data =new user({
            username : req.body.username,
            email:req.body.email,
            mobileNumber:req.body.mobileNumber,
            password:hashedpass 
        });
        data.save()
        .then(data=>{
            return res.json({status:'success',message:'userDetails successfully added!','result':data})
        }).catch(error=>{
            return res.json({status:'failure',message:error.message});
        })
    })
}



const login = (req,res,next)=>{
    try{
    var username = req.body.username
    var password = req.body.password
   user.findOne({$or:[{email:username},{mobileNumber:username}]}).then(data=>{
       console.log(data);
        if(data){
            bcrypt.compare(password,data.password,function(err,result){
                if(err){
                    console.log('error');
                    res.json(err.message);
                }
                if(result){
                    let token =  jwt.sign({name:data.username},'secretkey',{expiresIn:'2hr'})
                      res.json({
                        message:'login successful!',
                        token
                    })
                }else{
                    res.json({
                            message:'password does notmatched please enter the correct password'
                    })
                }
            })
        }else{
            res.json({
                message:'user not found!'
            })
        }
    })
}catch(err){
    res.json({'error':err.message});
}

}

const logout = async (req,res,next)=> {
    try{
        const date = moment().toDate()
        console.log(date);

        await user.findOneAndUpdate({uuid :req.params.uuid},{new:true}).exec();
        return res.json({message:'logout success','logintstatus':false,'latestVisited':date});
    }catch(err){
        res.json({status:'failure',message:err.message}); 
    }


}

const forgetPassword=(req,res,next)=>{
    try{
   const {email} = req.body;
    user.findOne({email},(err,data)=>{
        if(err || !data){
            return res.json({message:'user does not exists with that email'});
            }
            let token = jwt.sign({name:data.name},'secretkey',{expiresIn:'30m'})
                    res.json({
                        message:'you requested for password reset',
                        token
                    })
             return  user.updateOne({resetLink:token},(err,sucess)=>{
                 if(err){
                    return res.json({'error':'not update resetlink'}); 
                 }else{
                     return res.json({'resetLink':resetLink})
                 }
                
                })       
            
            })

    }catch(error){
        res.json({"error":error.message});
    }
}

const resetPassword = (req,res,next)=>{
    try{
    const {resetLink,newPass}=req.body

    if(resetLink){
        jwt.verify(resetLink,'secretkey',(err,decodedData)=>{
            if(err){
              return res.json({'error':'Incorrect token or it is expired.'});
            }
            if(decodedData){
                user.findOneAndUpdate({newPass: user.password});
                return res.json({status:"success",message:"resetPassword successful!"})
            }
            user.findOne({resetLink},(err,data)=>{
                if(err || !data){
                return res.json({'error':'user with this token does not exist.'})
                }
            })
        })
    }else{
        return res.json({'error':'Authentication error!!!'});
    }
}catch(err){
    res.json({'error':err.message});
}
}
module.exports={
    register,login,logout,forgetPassword,resetPassword
}

