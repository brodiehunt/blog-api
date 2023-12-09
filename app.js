// Dependencies
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('dotenv').config();
const {apiKeyMiddleware} = require('./middleware/validateApiKey');
const app = express();

const whitelist =['http://localhost:5173'];
// middleware  
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: function (origin,callback) {
    // Check each url in whitelist and see if it includes the origin (instead of matching exact string)
    const whitelistIndex = whitelist.findIndex((url) => url.includes(origin))
    callback(null,whitelistIndex > -1)
}
}))
app.use(cookieParser());

// passport config
require('./config/passport');
app.use(passport.initialize());

// routers

const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const authRouter = require('./routes/authRoutes');
// user routes
app.use('/api/user', passport.authenticate('jwt', {session: false}), userRouter);
// public routes (with apikey);
app.use('/api/public/', apiKeyMiddleware, postRouter)
// auth routes
app.use('/api/auth', authRouter);


// export app

module.exports = app;