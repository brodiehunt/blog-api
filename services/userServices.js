const User = require('../models/userModel');
const Post = require('../models/postModel');


exports.updateUser = async (req) => {
    const user = await User.findById(req.user.id);
    user.username = req.body.username;
    user.email = req.body.email;
   
    await user.save();
    
    return user;
    
}

exports.deleteUser = async (req) => {
    const userPostIds = req.user.posts
    const userId = req.user.id
    
    const user = await User.findById(userId);    
    // Delete all posts relating to user
    const deletedPosts = await Post.deleteMany({id: {$in: userPostIds}});
    await user.deleteOne();
    console.log(user)
    return user;
}