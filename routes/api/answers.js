const express = require('express');
const router = express.Router();
const Answer = require('../../models/Answer');

// @route   GET api/answers
// @desc    GET answer item
// @access  Public
router.get('/:file/:page', (req, res) => {
    Answer.find({ file: req.params.file , page: req.params.page})
        .then(answers => {
            res.json(answers);
        });
});

// @route   POST api/answers
// @desc    POST answer item
// @access  Private
router.post('/', (req, res) => {
    if(req.body.isvideo){
        const newAnswer = new Answer({
            user_q: req.body.user,
            file: req.body.file,
            page: req.body.page,
            question_name: req.body.question_name,
            isvideo_q: true,
            video_path_q: req.body.video_path
        });
        newAnswer.save()
            .then(answer => res.json(answer));
    }
    else{
        const newAnswer = new Answer({
            user_q: req.body.user,
            file: req.body.file,
            page: req.body.page,
            question_name: req.body.question_name,
            isvideo_q: false,
            description_q: req.body.description
        });
        newAnswer.save()
            .then(answer => res.json(answer));
    }

});

// @route   DELETE api/utils
// @desc    DELETE pdf File
// @access  Private
// router.delete('/', (req, res) => {
	
// });

module.exports = router;