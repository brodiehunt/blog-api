const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        maxlength: 20,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    apiKey: {
        type: String
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

UserSchema.plugin(require('mongoose-bcrypt'));
const User = mongoose.model("User", UserSchema);

module.exports = User;