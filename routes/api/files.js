const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var path = require('path');
const fs = require('fs');
const File = require("../../models/File");

// router.use(bodyParser.raw({ type: 'application/pdf '}))

// @route   POST api/files
// @desc    POST pdf File
// @access  Private
router.post('/', (req, res) => {
  console.log(req.body);
  var file = path.join(__dirname, '../../pdf_File/test.pdf');
  fs.writeFile(file,req.body,'binary',function(err){
    if(err){
      res.status(400).json({ msg: 'Fail' });
    }
    res.status(200).json({ msg: 'Success' });
  });

});

module.exports = router;