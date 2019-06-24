const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const FileSchema = new Schema({
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
  }
});

module.exports = File = mongoose.model('file', FileSchema);