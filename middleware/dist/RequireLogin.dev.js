"use strict";

var JWT = require('jsonwebtoken');

var _require = require('../config/key'),
    JWT_SCRET = _require.JWT_SCRET;

var mongoose = require('mongoose');

var User = mongoose.model('User');

module.exports = function (req, res, next) {
  //authorization=bearer tokenerdfrtdh
  var authorization = req.headers.config;

  if (!authorization) {
    return res.status(401).json({
      error: "please lged in"
    });
  }

  var token = authorization.replace("bearer ", "");
  JWT.verify(token, JWT_SCRET, function (err, payload) {
    console.log("payload", payload);

    if (err) {
      return res.status(401).json({
        error: "please lged in"
      });
    }

    var _id = payload._id;
    User.findById(_id).then(function (data) {
      console.log(data);
      req.user = data;
      next();
    });
  });
};