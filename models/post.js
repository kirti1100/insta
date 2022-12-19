const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const postschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        reuired:true
    },
    picture:{
        type:String,
        reuired:true
    },
    postedby:{
        type:ObjectId,
        ref:"User"

    },
    likes:[
        {
            type:ObjectId,
            ref:"User"
        }
    ],
    comments:[
        {
            text:String,
            postedby:{type:ObjectId,ref:"User"}

        }

    ]
})
mongoose.model('Post',postschema)