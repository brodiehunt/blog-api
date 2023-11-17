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

// will validate sanitize and validate form feilds. 
// will make call to user service to update user.
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
                    msg: 'Internal server error'
                }
            })
        }
        
    }
];

exports.deleteProfile = async (req, res, next) => {

};