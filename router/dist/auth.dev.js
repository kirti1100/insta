"use strict";

var express = require('express');

var router = express.Router();

var mongoose = require('mongoose');

var User = mongoose.model('User');

var brypt = require('bcryptjs');

var JWT = require('jsonwebtoken');

var _require = require('../config/key'),
    JWT_SCRET = _require.JWT_SCRET;

var RequireLogin = require('../middleware/requireLogin');

router.get('/protective', RequireLogin, function (req, res) {
  res.send("hello user");
});
router.post('/signup', function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      email = _req$body.email,
      password = _req$body.password,
      picture = _req$body.picture;

  if (!name || !email || !password) {
    return res.status(422).json({
      error: "please provide all the feilds"
    });
  }

  User.findOne({
    email: email
  }).then(function (saveduser) {
    if (saveduser) {
      res.status(422).json({
        error: "email already exist"
      });
    } else {
      brypt.hash(password, 12).then(function (hashpassword) {
        var user = new User({
          name: name,
          email: email,
          password: hashpassword,
          picture: picture
        });
        user.save().then(function (user) {
          var token = JWT.sign({
            _id: user._id
          }, JWT_SCRET);
          res.status(200).json({
            message: "successfully posted",
            token: token,
            user: user
          });
        })["catch"](function (err) {
          console.log(err);
        });
      })["catch"](function (err) {
        console.log(err);
      });
    }
  })["catch"](function (err) {
    console.log(err);
  });
});
router.post('/signin', function (req, res) {
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password;

  if (!email || !password) {
    res.status(422).json({
      error: "please provide email or password"
    });
  }

  User.findOne({
    email: email
  }).then(function (saveduser) {
    if (!saveduser) {
      return res.status(422).json({
        error: "invalid email or password"
      });
    }

    brypt.compare(password, saveduser.password).then(function (domatch) {
      if (domatch) {
        console.log("saveduser", saveduser);
        var token = JWT.sign({
          _id: saveduser._id
        }, JWT_SCRET);
        var _id = saveduser._id,
            name = saveduser.name,
            _email = saveduser.email,
            picture = saveduser.picture,
            followers = saveduser.followers,
            following = saveduser.following;
        res.json({
          token: token,
          user: {
            _id: _id,
            name: name,
            email: _email,
            followers: followers,
            following: following,
            picture: picture
          }
        });
      } else {
        res.status(422).json({
          error: "invalid email or password"
        });
      }
    })["catch"](function (err) {
      console.log(err);
    });
  });
});
module.exports = router;