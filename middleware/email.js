const nodemailer = require('nodemailer');
require('dotenv').config();
const ejs = require('ejs');
const {join} = require('path');


const transporter = nodemailer.createTransport({
   service:'gmail',
    auth:{
        user : process.env.EMAIL,
        pass :process.env.PASSWORD 
    },
});


async function mailSending(mailData){
    try{
        console.log(mailData.attachments);
        const data = await ejs.renderFile(join(__dirname,'../temp/',mailData.failName),mailData)
        const mailDetails = {
            from : mailData.from,
            to : mailData.to,
            subject : mailData.subject,
            attachments : mailData.attachments,
            html : data
        }
    transporter.sendMail(mailDetails,(err,data)=>{
        if(err)
        console.log('mail not sended'+err.message);
        else
        console.log('Mail is sended');
    })
}catch(err){
    console.log(err.message);
    process.exit(1);
}

}


module.exports={
    mailSending
}