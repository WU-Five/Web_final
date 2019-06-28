const express = require('express');
const router = express.Router();
const Util = require('../../models/Util');

// @route   GET api/utils
// @desc    GET util item
// @access  Public
router.get('/:file/:page', (req, res) => {
    Util.find({ file: req.params.file , page: req.params.page})
        .then(utils => {
            res.json(utils);
        });
});

// @route   POST api/utils
// @desc    POST util item
// @access  Private
router.post('/', (req, res) => {
    if(req.body.comment_type === 0){
        const newUtil = new Util({
            user_u: req.body.user,
            file: req.body.file,
            page: req.body.page,
            title: req.body.title,
            comment_type: 0
        });
        newUtil.save()
            .then(util => res.json(util));
    }
    else if(req.body.comment_type === 1){
        if(req.body.isvideo){
            const newUtil = new Util({
                user_u: req.body.user,
                file: req.body.file,
                page: req.body.page,
                title: req.body.title,
                question_name: req.body.question_name,
                comment_type: 1,
                isvideo: true,
                video_path: req.body.video_path
            });
            newUtil.save()
                .then(util => res.json(util));
        }
        else{
            const newUtil = new Util({
                user_u: req.body.user,
                file: req.body.file,
                page: req.body.page,
                title: req.body.title,
                question_name: req.body.question_name,
                comment_type: 1,
                isvideo: false,
                description: req.body.description
            });
            newUtil.save()
                .then(util => res.json(util));
        }
    }
    else{
        if(req.body.isvideo){
            const newUtil = new Util({
                user_u: req.body.user,
                file: req.body.file,
                page: req.body.page,
                title: req.body.title,
                comment_type: 2,
                isvideo: true,
                video_path: req.body.video_path
            });
            newUtil.save()
                .then(util => res.json(util));
        }
        else{
            const newUtil = new Util({
                user_u: req.body.user,
                file: req.body.file,
                page: req.body.page,
                title: req.body.title,
                comment_type: 2,
                isvideo: false,
                description: req.body.description
            });
            newUtil.save()
                .then(util => res.json(util));
        }
    }
});

// @route   DELETE api/utils
// @desc    DELETE pdf File
// @access  Private
router.delete('/', (req, res) => {
	
});

module.exports = router;