"use strict";

var express = require('express');

var mongoose = require('mongoose');

var multipart = require('multer');

var upload = multipart();
var app = express();

var _require = require('./config/key'),
    MONGOURI = _require.MONGOURI;

var PORT = 4000;
mongoose.connect(MONGOURI);
mongoose.connection.on('connected', function () {
  console.log("mongoose db got connected");
});
mongoose.connection.on('error', function (err) {
  console.log("error", err);
});
app.use(express.json());
app.use(upload.any());

require('./models/User');

require('./models/post');

app.use(require('./router/auth'));
app.use(require('./router/post'));
app.use(require('./router/user'));

var middleware = function middleware(req, res, next) {
  console.log("middleware called!");
  next();
}; //app.use(middleware)
// app.get('/',(req,res)=>{
//     res.send("hello world")
// })
// app.get('/home',middleware,(req,res)=>{
//     res.send("home page")
// })


app.listen(PORT, function () {
  console.log("running thr server on ", PORT);
});