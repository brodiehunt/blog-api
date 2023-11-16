const mongoose = require('mongoose');


async function connectDB() {
    try {
        const mongoDBURI = process.env.DEV_DB;
        await mongoose.connect(mongoDBURI);
        console.log('Connected to the db');
    } catch (err) {
        console.log(err, "error occured");
    }
}

module.exports = connectDB;