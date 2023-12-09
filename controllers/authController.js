const authServices = require('../services/authServices');
const validationUtil = require('../middleware/validateUser');
const {generateToken} = require('../utils/utilityFunctions');


exports.login = [
    validationUtil.loginValidationRules,
    validationUtil.handleValidation,
    async (req, res, next) => {
        try {
           
            const user = await authServices.checkUserExists(req);
            const passwordCorrect = user ? await user.verifyPassword(req.body.password) : null;
            if (!user || !passwordCorrect) {
                console.log('incorrect password block')
                return res.status(400).json({
                    error: {
                        message: 'Incorrect email or password'
                    }
                });
            }
           
            const token = generateToken(user.id)
            res.cookie('jwt', token, {
                httpOnly: true
            });
            return res.status(200).json({
                message: 'Successful login',
                data: {
                    username: user.username,
                    email: user.email
                }
            })
            
        } catch(error) {
            res.status(500).json({
                error: {
                    message: 'Internal server error'
                }
            })
        }
    }
];

exports.register = [
    validationUtil.registerValidationRules,
    validationUtil.handleValidation,
    async (req, res, next) => {
        try {
            // check email not in use already
            const existingUser = await authServices.checkUserExists(req);
            if (existingUser) {
                return res.status(409).json({
                    error: {
                        message: 'Email already in use'
                    }
                    
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
                message: 'User successfully registered',
                data: {
                    username: newUser.username,
                    email: newUser.email
                }
            })

        } catch(error) {
            res.status(500).json({
                error: {
                    message: 'internal server error'
                } 
            })
        }
    }
];
