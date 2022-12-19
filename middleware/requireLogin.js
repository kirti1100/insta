
const JWT=require('jsonwebtoken')
const {JWT_SCRET}=require('../config/key')
const mongoose = require('mongoose')
const User=mongoose.model('User')
module.exports= (req,res,next)=>{
    //authorization=bearer tokenerdfrtdh
    const {authorization}=req.headers
    if(!authorization){
        return res.status(401).json({error:"please lged in"})
    }
    const token=authorization.replace("bearer ","")
    JWT.verify(token,JWT_SCRET,(err,payload)=>{
        console.log("payload",payload)
        if(err){
           return res.status(401).json({error:"please lged in"})
        }
        const {_id}=payload
        User.findById(_id).then(data=>{
            
            req.user=data
            next()
        })
        
    })

}