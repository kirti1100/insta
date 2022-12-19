"use strict";

var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  followers: [{
    type: ObjectId,
    ref: "User"
  }],
  following: [{
    type: ObjectId,
    ref: "User"
  }],
  picture: {
    type: String,
    "default": ""
  }
});
mongoose.model('User', UserSchema);