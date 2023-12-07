const userServices = require('../services/userServices');
const validateUserFeilds = require('../middleware/validateUser');
const {generateApiKey} = require('../utils/utilityFunctions');

exports.getProfile = async (req, res, next) => {
    // passport already authorized user 
    
    return res.status(200).json({
        user: {
            username: req.user.username,
            email: req.user.email,
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

exports.generateApiKey = async (req, res, next) => {

    try {
        const userId = req.user.id;
        const apiKey = generateApiKey();
        const updatedUser = await userServices.addApiKey(req, apiKey);
        return res.status(200).json({
            msg: 'Api key generated',
            apiKey: updatedUser.apiKey
        })
    } catch(error) {
        res.status(500).json({
            error: {
                msg: error.message
            }
        })
    }
   
}
