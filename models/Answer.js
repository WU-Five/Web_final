const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AnswerSchema = new Schema({
  user_q: {
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
  question_name: {
    type: String
  },
  isvideo_q: {
    type: Boolean
  },
  description_q: {
    type: String
  },
  video_path_q:{
    type: String
  }
});

module.exports = Util = mongoose.model('answer', AnswerSchema);