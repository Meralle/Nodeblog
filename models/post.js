var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
	name:{
		type:String,
		required:true
	},
	content:{
		type:String,
		required:true
	},
	order:{
		type:String,
		required:true
	}
});
module.exports = mongoose.model('Post', PostSchema);
