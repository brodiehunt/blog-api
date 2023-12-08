const User = require('../models/userModel');

exports.checkUserExists = async (req) => {
    const {email} = req.body;
    const user = await User.findOne({email});

    if (user) {
        return user;
    }
    return null;
}

exports.checkValidUser = async (req) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    
    if (user) {
        return user
    }
    return null;
}


exports.createUser = async (req) => {
    const {username, email, password} = req.body;
    const user = new User({username, email, password});
    await user.save();
    return user;
}