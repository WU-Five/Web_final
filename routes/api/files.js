const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const multer  = require('multer')
const File = require("../../models/File");

var file_path = path.join(__dirname, '../../pdf_File/');

var store = function(req, res ,next){
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      upload_path = path.join(file_path, req.params.user, '/');
      fs.exists(upload_path, (exists) => {
        if (exists) {
          cb(null, upload_path);
        } else {
          fs.mkdir(upload_path, err => {
            if(err) throw err;
            cb(err, upload_path)
          });

        }
      });
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  var upload = multer({
    storage: storage,
  }).any();

  upload(req, res, function(err) {
    if(err) {
      console.log(err);
      return res.status(400).send("Error uploading file.");
    }
    next();
  });
}

// @route   GET api/files
// @desc    GET pdf Files
// @access  Private
router.get('/:user', (req, res) => {
  
});

// @route   GET api/files/:id
// @desc    GET pdf File
// @access  Private
router.get('/:user/:id', (req, res) => {
  
});


// @route   POST api/files
// @desc    POST pdf File
// @access  Private
  router.post('/:user', store , (req, res) => {
  const newFile = new File({
    path: req.files[0].filename,
    name: req.files[0].originalname
  });

  newFile.save().then(file => res.json(file));
});

module.exports = router;
