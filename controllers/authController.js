const authServices = require('../services/authServices');
const validationUtil = require('../middleware/validateUser');
const {generateToken} = require('../utils/utilityFunctions');


exports.login = async (req, res, next) => {

};

exports.register = [
    validationUtil.registerValidationRules,
    validationUtil.handleRegisterValidation,
    async (req, res, next) => {
        try {
            // check email not in use already
            const existingUser = await authServices.checkUserExists(req);
            if (existingUser) {
                return res.status(400).json({
                    errors: [
                        {msg: 'Email already in use'}
                    ]
                })
            }

            // create new user in DB
            const newUser = await authServices.createUser(req);

            // Generate and append jwt to cookie
            const token = generateToken(newUser.id);
            res.cookie('jwt', token, {
                httpOnly: true
              });
            res.status(201).json({
                msg: 'User successfully registered'
            })

        } catch(error) {
            res.status(500).json({
                errors: [
                    {msg: 'internal server error'}
                ] 
            })
        }
    }
];
