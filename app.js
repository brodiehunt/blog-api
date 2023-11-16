// Dependencies
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

// middleware  
app.use(express.json());
app.use(cors())


// passport config


// routers

const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const authRouter = require('./routes/authRoutes');
// user routes
app.use('/api/user', userRouter);
// public routes (with apikey);
app.use('/api/public/',  postRouter)
// auth routes
app.use('/api/auth', authRouter);


// export app

module.exports = app;