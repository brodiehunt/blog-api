const app = require('./app');
const connectDB = require('./config/database');
const port = process.env.PORT;

connectDB();

app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
})