const { response } = require('express')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post=mongoose.model('Post')
const requireLogin=require('../middleware/requireLogin')
const User= mongoose.model('User')

router.get("/user/:userId",requireLogin,(req,res)=>{
    User.findOne({_id:req.params.userId})
    .select("-password")
    .then(user=>{
         Post.find({postedby:req.params.userId})
         .populate("postedby","_id name")
         .exec((err,post)=>{
            if(err){
                res.status(422).json({error:err})
            }
            res.json({user,post})
         })
    }).catch(err=>{
        res.status(404).json({message:"user not found"})
    })
})

router.put("/follow",requireLogin,(req,res)=>{
    console.log("req.user",req.user)
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{                                            
        new:true
    })
    .exec((err,result)=>{
        if(err){
            return res.status(422).json(err)
        }
        User.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.followId}
        },{                                            
            new:true
        }).select("-password"). exec((err,response)=>{
            if(err){
                return res.status(422).json(err)
            }else{
                return res.json({user:result,logedinUser:response})
            }
        })

    })
})


router.put("/unFollow",requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unFollowId,{
        $pull:{followers:req.user._id}
    },{                                            
        new:true
    })
    .select("-password")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json(err)
        }
        User.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.unFollowId}
        },{                                            
            new:true
        }).exec((err,response)=>{
            if(err){
                return res.status(422).json(err)
            }else{
                return res.json({user:result,logedinUser:response})
            }
        })

    })
})
 
router.put('/createprofile',requireLogin,(req,res)=>{
    const {picture}=req.body
    User.findByIdAndUpdate(req.user._id,{$set:{picture:picture}},{new:true},
        (err,response)=>{
            if(err){
                return res.status(422).json({error:"Not updated"})
            }
            return res.json(response)
        })
})
module.exports=router