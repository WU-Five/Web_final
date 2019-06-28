const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UtilSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  file: {
    type: String,
    required: true
  },
  // type  0:question 1:answer 2:explain
  comment_type: {
    type: Int16Array,
    required: true
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  isvideo: {
    type: Boolean
  },
  video_path:{
    type: String
  }
});

module.exports = Util = mongoose.model('util', FileSchema);