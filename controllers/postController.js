const postServices = require('../services/postServices');

exports.getUserPosts = async (req, res, next) => {
    try {
        const userPosts = await postServices.userPosts(req);

        return res.status(200).json({
            msg: 'Success',
            posts: userPosts
        })
    } catch(error) {
        res.status(500).json({
            error: {
                msg: error.message
            }
        })
    }
};

// Posts have title, content, last updated, user, publish
exports.createPost = async (req, res, next) => {
    console.log('Hit controller function');
    // if required title or content feilds missing, request denied. 
    if (!req.body.title || !req.body.content) {
        return res.status(400).json({
            error: {
                msg: 'Content or title not specified'
            }
        })
    }

    try {
       const newPost = await postServices.createPost(req);
       return res.status(201).json({
        msg: 'Post created successfully',
        post: newPost
       });
    } catch(error) {
        return res.status(500).json({
            error: {
                msg: error.message
            }
        })
    }
};

exports.getSinglePost = async (req, res, next) => {
    try {

        const postId = req.params.postId
        const post = await postServices.singlePost(req);
        if (!post) {
            return res.status(404).json({
                error: {
                    msg: 'Resource not found'
                }
            });
        }
        if (req.user.id !== post.user.toString()) {
            return res.status(403).json({
                error: {
                    msg: 'Not authorized to access resource'
                }
            })
        }
        return res.status(200).json({
            msg: 'success',
            post: post
        })
    } catch(error) {
        return res.status(500).json({
            error: {
                msg: error.message
            }
        })
    }
   
};

// Need to make sure user authenticated is updating their own post
exports.updatePost = async (req, res, next) => {
    // what feilds have been sent? 
    
    try {
        const updatedPost = await postServices.updatePost(req);
        return res.status(200).json({
            msg: 'Post updated successfully',
            post: updatedPost
        })
    } catch(error) {
        return res.status(500).json({
            error: {
                msg: error.message
            }
        })
    }
};

// Need to make sure user authenticated is deleting their own post
exports.deletePost = async (req, res, next) => {
    try {
        const deletedPost = await postServices.deletePost(req);
        res.status(200).json({
            msg: "Post deleted successfully"
        })
    } catch(error) {
        return res.status(500).json({
            error: {
                msg: error.message
            }
        })
    }
};

// PUBLIC CONTROLLER FUNCTIONS

exports.getUserPostsPublic = async (req, res, next) => {
    try {
        const publicPosts = await postServices.userPostsPublic(req);
        return res.status(200).json({
            msg: 'Success',
            posts: publicPosts
        })
    } catch(error) {
        return res.status(500).json({
            error: {
                msg: error.message
            }
        })
    }
}

exports.getSinglePostPublic = async (req, res, next) => {

    try {
        const post = await postServices.singlePost(req);

        if (!post) {
            return res.status(404).json({
                msg: 'resource not found'
            })
        }

        if (req.user.id !== post.id.toString()) {
            return res.status(403).json({
                msg: 'Permission denied'
            })
        }
        if (!post.published) {
            return res.status(403).json({
                msg: 'Permission denied'
            })
        }

        return res.status(200).json({
            msg: 'success',
            post: post
        })
        
    } catch(error) {
        res.status(500).json({
            error: {
                msg: error.message
            }
        })
    }

}

exports.addCommentPublic = async (req, res, next) => {
    try {
        const updatedPost = await postServices.addCommentPublic(req);

        return res.status(200).json({
            msg: 'Comment added',
            post: updatedPost
        })
    } catch(error) {
        return res.status(500).json({
            error: {
                msg: error.message
            }
        })
    }
};