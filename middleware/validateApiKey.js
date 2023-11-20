const User = require('../models/userModel');

const apiKeyMiddleware = async (req, res, next) => {
    try {
        // Fetch apikey from query make sure defined
        const apiKey = req.query.apiKey;
        if (!apiKey) {
            return res.status(401).json({
                error: {
                    msg: "Api key is required"
                }
            })
        }

        // validate key belongs to a user
        const user = await User.findOne({apiKey: apiKey});
        if (!user) {
            return res.status(401).json({
                error: {
                    msg: 'Invalid Api key'
                }
            })
        }

        // If belongs to user, attach user and move to next middleware
        req.user = user;
        next();
    } catch(error) {
        return res.status(500).json({
            error: {
                msg: error.message
            }
        })    
    }
}

module.exports = {
    apiKeyMiddleware
}