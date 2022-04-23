const router = require('express').Router();
const userSchema = require('../models/sig.model');
const mail = require('../middleware/email')
const auth = require('../controller/Auth');


router.post('/sigin',auth.register);

router.post('/login',auth.login);

router.post('/logout/:uuid',auth.logout);

router.post('/forgetPass',auth.forgetPassword);

router.post('/resetPass',auth.resetPassword);


router.post('/sendMail',async(req,res)=>{
    try{
         const toMail = req.body.toMail
         const subject = req.body.subject
        // const text = req.body.text
        var mailData={
            from:'peakyblinders1tommy@gmail.com',
            to :toMail,
            subject:subject,
            fileName : 'message.ejs',
            attachments : [
                {
                    filename : 'Resume.pdf',
                    filPath : 'C:\Users\Admin\Downloads\Resume.pdf'
                }
            ],
         }
        let data = await mail.mailSending(mailData);
         return res.status(200).json({status: "success", message: "Mail sent successfully"})
          
    }catch(err){
        res.json({status:'failure',message:err.message})
    }
})


   

module.exports=router