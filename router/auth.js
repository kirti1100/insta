const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const brypt = require('bcryptjs')
const JWT=require('jsonwebtoken')
const {JWT_SCRET,SEND_EMAIL_KEY}=require('../config/key')
const RequireLogin=require('../middleware/requireLogin')

// const nodemailer=require("nodemailer")
// const sendgridtransport=require("nodemailer-sendgrid-transport")
 
// const transport=nodemailer.createTransport(sendgridtransport({
//     auth:{
//         api_key:SEND_EMAIL_KEY
//     }
// }))
// const transport=nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user:"" ,
//         pass: 'fVnukwywJCsPsUV4yy'
//     }
// })

router.get('/protective',RequireLogin,(req,res)=>{
    res.send("hello user")
})
router.post('/signup', (req, res) => {
    const {
        name,
        email,
        password,
        picture
    } = req.body
    if (!name || !email || !password) {
        return res.status(422).json({
            error: "please provide all the feilds"
        })
    }
    User.findOne({
        email: email
    })
        .then((saveduser) => {
            if (saveduser) {
                return res.status(422).json({
                    error: "email already exist"
                })
            } else {
                brypt.hash(password, 12)
                    .then(hashpassword => {
                        const user = new User({
                            name,
                            email,
                            password: hashpassword,
                            picture
                        })
                        user.save()
                            .then(user => {
                                const token=JWT.sign({_id:user._id},JWT_SCRET)
                                // transport.sendMail({
                                //     to:user.email,
                                //     from: "kirtigoyal444@gmail.com",
                                //     subject: "signup successfully",
                                //     text:"hello user",
                                //     html: "<h1>welcome to instagram </h1>"
                                // }).then(res=>{
                                //     console.log(res,"email sent")
                                // }).catch(err=>{
                                //     console.log(err)
                                // })
                                return res.status(200).json({
                                    message: "successfully posted",
                                    token,
                                    user
                                })
                            })
                            .catch(err => {
                                console.log(err)
                            })

                    }).catch(err => {
                        console.log(err)
                    })

            }


        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/signin',(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(422).json({error:"please provide email or password"})
    }
    User.findOne({email:email})
    .then(saveduser=>{
        if(!saveduser){
           return res.status(422).json({error:"invalid email or password"})
        }
        brypt.compare(password,saveduser.password)
        .then(domatch=>{
            if(domatch){
                console.log("saveduser",saveduser)
                const token=JWT.sign({_id:saveduser._id},JWT_SCRET)
                const {_id,name,email, picture,followers,following}=saveduser
                return res.json({token,user:{_id,name,email,followers,following, picture}})
                
            }else{
               return  res.status(422).json({error:"invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })

})
module.exports = router