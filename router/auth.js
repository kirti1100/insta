const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const brypt = require('bcryptjs')
const JWT=require('jsonwebtoken')
const {JWT_SCRET}=require('../config/key')
const RequireLogin=require('../middleware/requireLogin')
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
                res.status(422).json({
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
                                res.status(200).json({
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
        res.status(422).json({error:"please provide email or password"})
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
                res.json({token,user:{_id,name,email,followers,following, picture}})
                
            }else{
                res.status(422).json({error:"invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })

})
module.exports = router