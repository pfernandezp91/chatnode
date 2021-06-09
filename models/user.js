var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var userSchema = new Schema({
	user: String,
	email: String
});

var Users = mongoose.model('Users', userSchema);

module.exports = Users;



// /comments
// iduser || user || comment || photo