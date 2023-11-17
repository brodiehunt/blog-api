const User = require('../models/userModel');
const Post = require('../models/postModel');


exports.updateUser = async (req) => {
    console.log('user service', req.user.id)
    const user = await User.findById(req.user.id);
    user.username = req.body.username;
    user.email = req.body.email;
    console.log(user)
    await user.save();
    console.log(user)
    return user;
    
}