"use strict";

var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
var postschema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    reuired: true
  },
  picture: {
    type: String,
    reuired: true
  },
  postedby: {
    type: ObjectId,
    ref: "User"
  },
  likes: [{
    type: ObjectId,
    ref: "User"
  }],
  comments: [{
    text: String,
    postedby: {
      type: ObjectId,
      ref: "User"
    }
  }]
});
mongoose.model('Post', postschema);