const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');


// PUBLIC POSTS ROUTES - REQUIRES API_KEY AUTH

router.get('/posts', postController.getUserPosts);

router.get('/posts/:postId', postController.getSinglePost);

router.post('/posts/:postId/comment', postController.addComment);

module.exports = router;