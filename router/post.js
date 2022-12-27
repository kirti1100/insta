const { json } = require('express')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post=mongoose.model('Post')
const requireLogin=require('../middleware/requireLogin')

router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
    .populate('postedby','_id name')
    .populate("comments.postedby","_id name")
    .sort("-createdAt")
    .then(posts=>{
        return res.json({posts})
    })
})

router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedby:req.user._id})
    .populate('postedby','_id name')
    .populate("comments.postedby","_id name")
    .sort("-createdAt")
    .then(myposts=>{
        return res.json({myposts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/userPost',requireLogin,(req,res)=>{
    Post.find({postedby:{$in:req.user.following}})
    .populate('postedby','_id name')
    .populate("comments.postedby","_id name")
    .sort("-createdAt")
    .then(myposts=>{
        return res.json({myposts})
    })
    .catch(err=>{
        console.log(err)
    })
})




router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body,picture}=req.body
    if(!title || !body || !picture){
        return res.status(422).json({error:"please provide all feilds"})
    }
    req.user.password=undefined
    const post=new Post({
        title,
        body,
        picture,
        postedby:req.user
    })
    post.save().then(result=>{
       return  res.json({post:result})
    })
    .catch(err=>{
        console.log("error",err)
    })
})

router.put("/likes",requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    })
    .populate('postedby','_id name')
    .populate("comments.postedby","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json(err)
        }else{
            return res.json(result)
        }

    })
})

router.put("/unLike",requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    })
    .populate('postedby','_id name')
    .populate("comments.postedby","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json(err)
        }else{
            return res.json(result)
        }

    })
})

router.put("/comment",requireLogin,(req,res)=>{
    const comment={
        text:req.body.text,
        postedby:req.user._id
    }

    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate('postedby','_id name')
    .populate("comments.postedby","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json(err)
        }else{
            return res.json(result)
        }

    })
})
router.delete("/delete/:postId",requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedby","_id")
    .populate("comments.postedby","_id name")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedby._id.toString()===req.user._id.toString()){
            post.remove()
            .then(result=>{
                return res.json(result)
            }).catch(err=>{
                console.log(err)
            })
        }
        
    })
})
router.delete("/deleteComment/:commentId",requireLogin,(req,res)=>{
    //Post.findOneAndUpdate({$pull:{comments:req.params.commentId}})
    Post.findOne({_id:req.body.postId})
    .populate("postedby","_id name")
    .populate("comments.postedby","_id name")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        post.comments.map(comment=>{
            console.log("check",comment)
            if(comment._id.toString()===req.params.commentId.toString()){
               comment.remove() 
               
            }
         })
        post.save()
        return res.json(post)

    })
})
module.exports=router