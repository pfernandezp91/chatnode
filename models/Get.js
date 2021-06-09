const { ObjectId } = require("bson");
var mongoose = require("mongoose");

var PostSchema = mongoose.Schema({
    _id: ObjectId,
    user: String,
    email: String
}, { collection:'users' });

module.exports = mongoose.model("Users", PostSchema);