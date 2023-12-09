const userServices = require('../services/userServices');
const authServices = require('../services/authServices');
const validateUserFeilds = require('../middleware/validateUser');
const {generateApiKey} = require('../utils/utilityFunctions');

exports.getProfile = async (req, res, next) => {
    // passport already authorized user 
    
    return res.status(200).json({
        user: {
            username: req.user.username,
            email: req.user.email,
        },
        message: 'Success'
    })
    
};

// Add checks for email already in use. 
exports.updateProfile = [
    validateUserFeilds.updateValidationRules,
    validateUserFeilds.handleValidation,
    async (req, res, next) => {
        
        try {
            const emailInUse = await authServices.checkUserExists(req);
            if (emailInUse && (req.user.email !== req.body.email)) {
                return res.status(409).json({
                    error: {
                        message: 'Email already in use'
                    }
                    
                })
            }

            const updatedUser = await userServices.updateUser(req);

            res.status(200).json({
                message: 'User updated successfully',
                user: {
                    username: updatedUser.username,
                    email: updatedUser.email,
                }
            })
        } catch(error) {
            
            res.status(500).json({
                error: {
                    message: error.message
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
            message: 'User deleted',
            user: deletedUser.username
        })
    } catch(error) {
        console.log('error message', error)
        res.status(500).json({
            error: {
                message: error.message
            }
        })
    }
    
};

exports.generateApiKey = async (req, res, next) => {

    try {
        const userId = req.user.id;
        const apiKey = generateApiKey();
        const updatedUser = await userServices.addApiKey(req, apiKey);
        return res.status(200).json({
            message: 'Api key generated',
            apiKey: updatedUser.apiKey
        })
    } catch(error) {
        res.status(500).json({
            error: {
                message: error.message
            }
        })
    }
   
}
