const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');


// PUBLIC POSTS ROUTES - REQUIRES API_KEY AUTH

router.get('/posts', postController.getUserPostsPublic);

router.get('/posts/:postId', postController.getSinglePostPublic);

router.post('/posts/:postId/comment', postController.addCommentPublic);

module.exports = router;