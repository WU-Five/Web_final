const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Video = require('../../models/Video');

var video_path = path.join(__dirname, '../../video_File/');

const store = function(req, res, next) {
	const storage = multer.diskStorage({
		destination: function(req, file, cb) {
			const upload_path = path.join(video_path, req.params.user, '/');
			fs.exists(upload_path, exists => {
				if (exists) {
					cb(null, upload_path);
				} else {
					fs.mkdir(upload_path, err => {
						if (err) throw err;
						cb(err, upload_path);
					});
				}
			});
		},
		filename: function(req, file, cb) {
			cb(null, Date.now() + path.extname(file.originalname));
		},
	});

	var upload = multer({ storage: storage }).any();

	upload(req, res, function(err) {
		if (err) {
			console.log(err);
			return res.status(400).send('Error uploading video');
		}
		next();
	});
};

// @route   GET api/files
// @desc    GET pdf Files
// @access  Private
router.get('/:user', (req, res) => {
	Video.find({ user: req.params.user }).then(files => res.json(files));
});

// // @route   GET api/files/:id
// // @desc    GET pdf File
// // @access  Private
router.get('/:user/:id', (req, res) => {});

// // @route   POST api/files
// // @desc    POST pdf File
// // @access  Private
router.post('/:user', store, (req, res) => {
	const newVideo = new Video({
		path: req.files[0].filename,
		name: req.files[0].originalname,
		user: req.params.user,
	});

	newVideo.save().then(file => res.json(file));
});

// // @route   DELETE api/file
// // @desc    DELETE pdf File
// // @access  Private
router.delete('/:user/:path', (req, res) => {
	const delete_path = path.join(file_path, req.params.user, '/', req.params.path);
	fs.unlink(delete_path, err => {
		if (err) {
			console.error(err);
		}
	});

	Video.findOne({ path: req.params.path })
		.then(file => file.remove().then(() => res.json({ success: true })))
		.catch(err => {
			console.log(err);
			res.status(400).json({ success: false });
		});
});

module.exports = router;
