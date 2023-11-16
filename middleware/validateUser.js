const { body, validationResult } = require('express-validator');



 
exports.registerValidationRules = [
    body('username', 'Username is required')
        .trim()
        .isLength({min: 3, max: 20})
        .withMessage('Username must be more than 2 and less than 20 characters')
        .escape(),
    body('email', 'Must be a correct email: example@email.com')
        .trim()
        .isEmail()
        .escape(),
    body('password', 'Must include an password')
        .trim()
        .isLength({min: 6, max: 20})
        .withMessage('Password must be more than 5 and less than 20 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number.'),
    body('passwordConfirm', 'Must confirm your password')
        .trim()
        .custom((value, { req }) => value === req.body.password)
    .withMessage('Password confirmation does not match password')
];

exports.handleRegisterValidation = async (req, res, next) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        return next();
    }
    const errorsMap = result.errors.map((error) => {
        let errorObj = {};
        errorObj[error.path] = error.msg;

        return errorObj;
    });

    return res.status(400).json({
        errors: errorsMap
    })
}