"use strict";

var _require = require('express'),
    response = _require.response;

var express = require('express');

var router = express.Router();

var mongoose = require('mongoose');

var Post = mongoose.model('Post');

var requireLogin = require('../middleware/requireLogin');

var User = mongoose.model('User');
router.get("/user/:userId", requireLogin, function (req, res) {
  User.findOne({
    _id: req.params.userId
  }).select("-password").then(function (user) {
    Post.find({
      postedby: req.params.userId
    }).populate("postedby", "_id name").exec(function (err, post) {
      if (err) {
        res.status(422).json({
          error: err
        });
      }

      res.json({
        user: user,
        post: post
      });
    });
  })["catch"](function (err) {
    res.status(404).json({
      message: "user not found"
    });
  });
});
router.put("/follow", requireLogin, function (req, res) {
  console.log("req.user", req.user);
  User.findByIdAndUpdate(req.body.followId, {
    $push: {
      followers: req.user._id
    }
  }, {
    "new": true
  }).exec(function (err, result) {
    if (err) {
      return res.status(422).json(err);
    }

    User.findByIdAndUpdate(req.user._id, {
      $push: {
        following: req.body.followId
      }
    }, {
      "new": true
    }).select("-password").exec(function (err, response) {
      if (err) {
        return res.status(422).json(err);
      } else {
        return res.json({
          user: result,
          logedinUser: response
        });
      }
    });
  });
});
router.put("/unFollow", requireLogin, function (req, res) {
  User.findByIdAndUpdate(req.body.unFollowId, {
    $pull: {
      followers: req.user._id
    }
  }, {
    "new": true
  }).select("-password").exec(function (err, result) {
    if (err) {
      return res.status(422).json(err);
    }

    User.findByIdAndUpdate(req.user._id, {
      $pull: {
        following: req.body.unFollowId
      }
    }, {
      "new": true
    }).exec(function (err, response) {
      if (err) {
        return res.status(422).json(err);
      } else {
        return res.json({
          user: result,
          logedinUser: response
        });
      }
    });
  });
});
router.put('/createprofile', requireLogin, function (req, res) {
  var picture = req.body.picture;
  User.findByIdAndUpdate(req.user._id, {
    $set: {
      picture: picture
    }
  }, {
    "new": true
  }, function (err, response) {
    if (err) {
      return res.status(422).json({
        error: "Not updated"
      });
    }

    return res.json(response);
  });
});
module.exports = router;