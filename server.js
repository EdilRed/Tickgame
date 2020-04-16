const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
    path: './config.env'
});

const app = require('./app');

const SERVER_PORT = process.env.PORT || 6000;
const MONGODB_URI = process.env.DATABASE;
const MONGODB_OPTIONS = {
    dbName: 'Tickgame',
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
};

// Connect to mongoDB
mongoose
    .connect(MONGODB_URI, MONGODB_OPTIONS)
    .then(() => console.log('DB connection successful!'))
    .catch((err) => {
        throw new Error(err.message);
    });
mongoose.connection.on('error', (err) => {
    console.error('MongoDB error: ', err);
});

app.listen(SERVER_PORT, () => {
    console.log(`App running on port ${SERVER_PORT}...`);
});