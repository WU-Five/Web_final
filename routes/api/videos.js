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

// @route   GET api/videos
// @desc    GET video Files
// @access  Private
router.get('/:user', (req, res) => {
	Video.find({ user: req.params.user }).then(files => res.json(files));
});

// // @route   GET api/videos/:id
// // @desc    GET video File
// // @access  Private
router.get('/:user/:path', (req, res) => {
	// console.log(req.params);
	const { user, path } = req.params;
	// res.writeHead(200, { 'Content-Type': 'video/webm' });
	const videoPath = video_path + '/' + user + '/' + path;
	const stat = fs.statSync(videoPath);
	const fileSize = stat.size;
	const range = req.headers.range;

	if (range) {
		const parts = range.replace(/bytes=/, '').split('-');
		const start = parseInt(parts[0], 10);
		const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

		const chunksize = end - start + 1;
		const file = fs.createReadStream(videoPath, { start, end });
		const head = {
			'Content-Range': `bytes ${start}-${end}/${fileSize}`,
			'Accept-Ranges': 'bytes',
			'Content-Length': chunksize,
			'Content-Type': 'video/webm',
		};

		res.writeHead(206, head);
		file.pipe(res);
	} else {
		const head = {
			'Content-Length': fileSize,
			'Content-Type': 'video/webm',
		};
		res.writeHead(200, head);
		fs.createReadStream(videoPath).pipe(res);
	}
});

// // @route   POST api/videos
// // @desc    POST video File
// // @access  Private
router.post('/:user', store, (req, res) => {
	const newVideo = new Video({
		path: req.files[0].filename,
		name: req.files[0].originalname,
		user: req.params.user,
	});

	newVideo.save().then(file => res.json(file));
});

// // @route   DELETE api/videos
// // @desc    DELETE video File
// // @access  Private
router.delete('/:user/:path', (req, res) => {
	const delete_path = path.join(video_path, req.params.user, '/', req.params.path);

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
