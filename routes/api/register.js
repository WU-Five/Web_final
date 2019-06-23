const express = require('express');
const router = express.Router();

const User = require('../../models/User');

router.post('/', async (req, res) => {
	const { user, password } = req.body;
	await User.findOne({ user }).then(user => {
		if (user)
			return res.status(400).send(`User is already registered.
                    Please change your name`);
	});
	if (password.length < 6) {
		return res.status(400).send(`Password must be at least 6 charater`);
	} else {
		const newUser = new User({ user: user, password: password });
		newUser.save(err => {
			if (err) console.error(err);
		});
		return res.status(200).send('Registration success');
	}
});

module.exports = router;
