const express = require('express');
const router = express.Router();

const User = require('../../models/User');

router.post('/', async (req, res) => {
	const { user, password } = req.body;
	if (!user) return res.status(400).json({ type: 'user', msg: 'User cannot be empty' });
	await User.findOne({ user }).then(user => {
		if (user) return res.status(400).json({ type: 'user', msg: 'User is already registered' });
	});
	if (password.length < 6) {
		return res.status(400).json({ type: 'password', msg: 'Password must be at least 6 charater' });
	} else {
		const newUser = new User({ user: user, password: password });
		newUser.save()
			.then( user => {
				res.json({
					user: {
						id: user.id,
						name: user.user
					}
				});
			});
	}
});

module.exports = router;
