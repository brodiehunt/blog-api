const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100 
    },
    content: {
        type: String,
        required: true,
        maxlength: 5000

    },
    create_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    last_updated: {
        type: Date,
        default: Date.now,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    comments: [{
        username: {
            type: String,
        },
        comment: {
            type: String,
        }

    }]
})

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;