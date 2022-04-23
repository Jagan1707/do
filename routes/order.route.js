const router = require('express').Router();
const orderSchema = require('../models/order');

router.post('/addOrder',async(req,res)=>{
    try{
        const firstOrder = await orderSchema(req.body)
        const result = await firstOrder.save();
        return res.json({status:'success',message:' order recevied successfull'});
    }catch(err){
        res.json({status:'failure',message:err.message})
    }
});