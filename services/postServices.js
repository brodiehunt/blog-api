const Post = require('../models/postModel');

exports.userPosts = async (req) => {
    const userId = req.user.id;

    const userPosts = await Post.find({user: userId});

    return userPosts;
}

exports.singlePost = async (req) => {
    const post = await Post.findById(req.params.postId);
    return post;
}

exports.createPost = async (req) => {
    // Format data for post 
    const {title, content, published} = req.body;
    const userId = req.user.id;
    const newPost = new Post({
        title,
        content,
        published,
        user: userId,

    });
    await newPost.save();
    return newPost;
}

exports.updatePost = async (req) => {
    const {postId} = req.params;
    const post = await Post.findById(postId);
    const {title, content, published} = req.body;
    if (title) post.title = title;
    if (content) post.content = content;
    if (published) post.published = published;
    post.last_updated = Date.now();

    await post.save();
    return post;
}

exports.deletePost = async (req) => {
    const {postId} = req.params;
    const deletePost = await Post.findByIdAndDelete(postId);
    return deletePost;
}

exports.userPostsPublic = async (req) => {
    const userId = req.user.id;
    const publicPosts = await Post.find({user: userId, published: true});
    return publicPosts;
}

exports.addCommentPublic = async (req) => {
    const comment = req.body.comment;
    const commentMaker = req.body.username ? req.body.username : 'Anonymous';

    const {postId} = req.params;
    const postToAddComment = await Post.findById(postId);
    postToAddComment.comments.push({
        comment: comment,
        username: commentMaker
    });
    await postToAddComment.save();
    return postToAddComment;


}