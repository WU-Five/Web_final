const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const User = require('../../models/User');
const file_path = path.join(__dirname, '../../video_File/');

router.post('/', async (req, res) => {
	var { user, password } = req.body;
	if (!user) return res.status(400).json({ type: 'user', msg: 'User cannot be empty' });

	var regex = /^\w*$/;
	const checkUser = regex.exec(user);

	if (checkUser === null) {
		return res.status(400).json({ type: 'user', msg: 'Invalid username. ' });
	}

	await User.findOne({ user }).then(user => {
		if (user) return res.status(400).json({ type: 'user', msg: 'User is already registered' });
	});

	if (password.length < 6) {
		return res.status(400).json({ type: 'password', msg: 'Password must be at least 6 charater' });
	} else {
		const upload_path = path.join(file_path, user, '/');
		fs.exists(upload_path, exists => {
			if (!exists) {
				fs.mkdir(upload_path, err => {
					if (err) throw err;
				});
			}
		});
		const newUser = new User({ user: user, password: password });
		newUser.save().then(user => {
			res.json({
				user: {
					id: user.id,
					name: user.user,
				},
			});
		});
	}
});

module.exports = router;
