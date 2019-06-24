const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser');
const path = require('path');
// const fs = require('fs');
const multer  = require('multer')
const File = require("../../models/File");

var file = path.join(__dirname, '../../pdf_File/');
var storage = multer.diskStorage({
  destination: file,
  filename: function(req, file, cb){
      cb(null, Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({
  storage: storage
});

// router.use(bodyParser.raw({ type: 'application/pdf '}))

// @route   POST api/files
// @desc    POST pdf File
// @access  Private
router.post('/', upload.any(), (req, res) => {
  const newFile = new File({
    path: req.files[0].filename,
    name: req.files[0].originalname
  });

  newFile.save().then(file => res.json(file.name));
})

module.exports = router;