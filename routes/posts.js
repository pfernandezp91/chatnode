var express = require("express");
var router = express.Router();
var Post = require("../models/Get");

router.get("/", function(req, res) {
	res.send("we are on post");
});

router.post("/", function(req, res) {
	Post.find({}, function(err, PostSchema){
        res.render("/posts", {users: PostSchema})
    })
});

module.exports = router;