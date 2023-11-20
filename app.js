// Dependencies
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('dotenv').config();
const {apiKeyMiddleware} = require('./middleware/validateApiKey');
const app = express();

// middleware  
app.use(express.json());
app.use(cors())
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