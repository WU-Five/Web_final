const express = require('express');
const router = express.Router();

const User = require('../../models/User');

router.post('/', async (req, res) => {
	const { user, password } = req.body;
	await User.findOne({ user }).then(user => {
		if (!user) return res.status(400).json({ msg: 'User Does not exist' });
		else {
			if (password === user.password) {
				return res.status(200).send('Success');
			} else {
				return res.status(400).json({ msg: 'Password Error' });
			}
		}
	});
});
module.exports = router;
