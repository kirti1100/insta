"use strict";

var _require = require('express'),
    json = _require.json;

var express = require('express');

var router = express.Router();

var mongoose = require('mongoose');

var Post = mongoose.model('Post');

var requireLogin = require('../middleware/requireLogin');

router.get('/allpost', requireLogin, function (req, res) {
  Post.find().populate('postedby', '_id name').populate("comments.postedby", "_id name").sort("-createdAt").then(function (posts) {
    return res.json({
      posts: posts
    });
  });
});
router.get('/mypost', requireLogin, function (req, res) {
  Post.find({
    postedby: req.user._id
  }).populate('postedby', '_id name').populate("comments.postedby", "_id name").sort("-createdAt").then(function (myposts) {
    return res.json({
      myposts: myposts
    });
  })["catch"](function (err) {
    console.log(err);
  });
});
router.post('/createpost', requireLogin, function (req, res) {
  var _req$body = req.body,
      title = _req$body.title,
      body = _req$body.body,
      picture = _req$body.picture;

  if (!title || !body || !picture) {
    return res.status(422).json({
      error: "please provide all feilds"
    });
  }

  req.user.password = undefined;
  var post = new Post({
    title: title,
    body: body,
    picture: picture,
    postedby: req.user
  });
  post.save().then(function (result) {
    return res.json({
      post: result
    });
  })["catch"](function (err) {
    console.log("error", err);
  });
});
router.put("/likes", requireLogin, function (req, res) {
  Post.findByIdAndUpdate(req.body.postId, {
    $push: {
      likes: req.user._id
    }
  }, {
    "new": true
  }).populate('postedby', '_id name').populate("comments.postedby", "_id name").exec(function (err, result) {
    if (err) {
      return res.status(422).json(err);
    } else {
      return res.json(result);
    }
  });
});
router.put("/unLike", requireLogin, function (req, res) {
  Post.findByIdAndUpdate(req.body.postId, {
    $pull: {
      likes: req.user._id
    }
  }, {
    "new": true
  }).populate('postedby', '_id name').populate("comments.postedby", "_id name").exec(function (err, result) {
    if (err) {
      return res.status(422).json(err);
    } else {
      return res.json(result);
    }
  });
});
router.put("/comment", requireLogin, function (req, res) {
  var comment = {
    text: req.body.text,
    postedby: req.user._id
  };
  Post.findByIdAndUpdate(req.body.postId, {
    $push: {
      comments: comment
    }
  }, {
    "new": true
  }).populate('comments.postedby', '_id name').populate('postedby', '_id name').sort("-createdAt").exec(function (err, result) {
    if (err) {
      return res.status(422).json(err);
    } else {
      return res.json(result);
    }
  });
});
router["delete"]("/delete/:postId", requireLogin, function (req, res) {
  Post.findOne({
    _id: req.params.postId
  }).populate("postedby", "_id").exec(function (err, post) {
    if (err || !post) {
      return res.status(422).json({
        error: err
      });
    }

    if (post.postedby._id.toString() === req.user._id.toString()) {
      post.remove().then(function (result) {
        return res.json(result);
      })["catch"](function (err) {
        console.log(err);
      });
    }
  });
});
router["delete"]("/deleteComment/:commentId", requireLogin, function (req, res) {
  Post.findOneAndUpdate({
    $pull: {
      comments: req.params.commentId
    }
  }).populate("postedby", "_id").exec(function (err, post) {
    if (err || !post) {
      return res.status(422).json({
        error: err
      });
    }

    post.comments.map(function (comment) {
      if (comment._id.toString() === req.params.commentId.toString()) {
        comment.remove();
      }
    });
    post.save();
    return res.json(post);
  });
});
module.exports = router;