const path = require('path');
const express = require("express");
const morgan = require("morgan");

const app = express();

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};

app.use(express.json({
    limit: '10kb'
}));

// ROUTES

app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: `Can't find ${req.originalUrl} on this server!`
    })
    throw new Error(`Can't find ${req.originalUrl} on this server!`);
});

module.exports = app;