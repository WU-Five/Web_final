const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const VideoSchema = new Schema({
	path: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	user: {
		type: String,
		required: true,
	},
});

module.exports = Video = mongoose.model('video', VideoSchema);
