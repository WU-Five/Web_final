const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UtilSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  file: {
    type: String,
    required: true
  },
  page: {
    type: Number,
    required: true
  },
  // type  0:question 1:answer 2:explain
  comment_type: {
    type: Number,
    required: true
  },
  title: {
    type: String
  },
  question_name: {
    type: String
  },
  isvideo: {
    type: Boolean
  },
  description: {
    type: String
  },
  video_path:{
    type: String
  }
});

module.exports = Util = mongoose.model('util', UtilSchema);