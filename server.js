const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const fs = require('fs');
const app = express();

fs.exists('video_File', e => {
	if (!e) {
		fs.mkdir('./video_File');
	}
});

fs.exists('pdf_File', e => {
	if (!e) {
		fs.mkdir('./pdf_File');
	}
});

// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true,
	}) // Adding new mongo url parser
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log(err));

// Use Routes
app.use('/api/files', require('./routes/api/files'));

app.use('/api/register', require('./routes/api/register'));

app.use('/api/login', require('./routes/api/login'));

app.use('/api/videos', require('./routes/api/videos'));
app.use('/api/users', require('./routes/api/users'));

app.use('/api/utils', require('./routes/api/utils'));
app.use('/api/answers', require('./routes/api/answers'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
