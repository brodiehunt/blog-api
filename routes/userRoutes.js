const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

// PRIVATE USER PROFILE ROUTES - REQUIRE JWT AUTH

// GET user profile info
router.get('/profile', userController.getProfile);

// UPDATE user profile info
router.put('/profile', userController.updateProfile);

// DELETE PROFILE - (AND ALL RELATED INFO)
router.delete('/profile', userController.deleteProfile);

router.get('/profile/apiKey', userController.generateApiKey);



// PRIVATE USER POST ROUTES - REQUIRE JWT AUTH

// Get user posts via id - authoriized route
router.get('/posts', postController.getUserPosts);

// CREATE a new post
router.post('/posts', postController.createPost);

// GET single post
router.get('/posts/:postId', postController.getSinglePost)

// UPDATE a post
router.put('/posts/:postId', postController.updatePost);

// DELETE a post 
router.delete('/posts/:postId', postController.deletePost);


module.exports = router;

// 655a9f7a6813d2a1159839ad post id
// user id 655a9dcfdb8855c98581a5a0
