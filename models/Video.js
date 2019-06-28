const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const VideoSchema = new Schema({
	path: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	user: {
		type: String,
		required: true
	},
	pdf_name: {
		type: String,
		required: true
	},
	page_num:{
		type: Number,
		required: true
	},
	util_name:{
		type: String,
		required: true
	}
});

module.exports = Video = mongoose.model('video', VideoSchema);
