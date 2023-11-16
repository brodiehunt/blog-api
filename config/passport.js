const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/userModel');


const localOption = {
    usernameField: 'email',
    session: false
};

const jwtOptions = {
    jwtFromRequest: (req) => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['jwt'];
        }
        return token;
    },
    secretOrKey: process.env.JWT_SECRET
};

const localVerifyCallback = async (email, password, done) => {
    try {
        const user = await User.findOne({email: email});
        if (!user) {
            return done(null, false);
        }
        if (!user.verifyPassword(password)) {
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        done(error)
    }
};

const jwtVerifyCallback = async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload.sub);

        // user exists
        if (user) {
            return done(null, user);
        }
        // No user exists
        return done(null, false)
    } catch (error) {
        done(error);
    }
};

passport.use(new LocalStrategy(localOption, localVerifyCallback));
passport.use(new JwtStrategy(jwtOptions, jwtVerifyCallback));

