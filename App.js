const express= require('express');
const mongoose=require('mongoose')
const multipart=require('multer')
const upload=multipart()
const app=express();
const cors=require("cors");
const {MONGOURI}=require('./config/key')
const PORT=process.env.PORT || 4000;



mongoose.connect(MONGOURI)
mongoose.connection.on('connected',()=>{
    console.log("mongoose db got connected")
})
mongoose.connection.on('error',(err)=>{
    console.log("error",err)
})
app.use(express.json())
app.use(upload.any())
app.use(cors(
    {
        origin:["http://localhost:3000/","https://insta-clone-apps.onrender.com/"]
    }
));
require('./models/User')
require('./models/post')
app.use(require('./router/auth'))
app.use(require('./router/post'))
app.use(require('./router/user'))
const middleware=(req,res,next)=>{
    console.log("middleware called!")
    next()
}
if(process.env.NODE_ENV ==="production"){
    app.use(express.static('frontend/build'))
    const path=require('path')
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    })

}
//app.use(middleware)
// app.get('/',(req,res)=>{
//     res.send("hello world")
// })
// app.get('/home',middleware,(req,res)=>{
//     res.send("home page")
// })

app.listen(PORT,()=>{
    console.log("running thr server on ",PORT)
})