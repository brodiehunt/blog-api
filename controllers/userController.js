const userServices = require('../services/userServices');
const validateUserFeilds = require('../middleware/validateUser');

exports.getProfile = async (req, res, next) => {
    // passport already authorized user 
    
    return res.status(200).json({
        user: {
            username: req.user.username,
            email: req.user.email,
            apiKey: req.user.apiKey
        },
        msg: 'Success'
    })
    
};

// Add checks for email already in use. 
exports.updateProfile = [
    validateUserFeilds.updateValidationRules,
    validateUserFeilds.handleValidation,
    async (req, res, next) => {
        
        try {
            const user = await userServices.updateUser(req);
            res.status(200).json({
                msg: 'User updated successfully',
                user: {
                    username: user.username,
                    email: user.email,
                    apiKey: user.apiKey
                }
            })
        } catch(error) {
            
            res.status(500).json({
                error: {
                    msg: error.message
                }
            })
        }
        
    }
];

exports.deleteProfile = async (req, res, next) => {
    try {
        const deletedUser = await userServices.deleteUser(req);
        console.log(deletedUser, 'deletedUser')
        res.status(200).json({
            msg: 'User deleted',
            user: deletedUser.username
        })
    } catch(error) {
        console.log('error message', error)
        res.status(500).json({
            error: {
                msg: error.message
            }
        })
    }
    
};