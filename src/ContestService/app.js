const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const contestRoutes = require('./routes/contest');

const app = express();

/**
 * To parse JSON
 */
app.use(bodyParser.json());

/**
 * To allow Cross Origin Resource Sharing (CORS)
 */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

/**
 * To Set Routes
 */
app.use(contestRoutes);

/**
 * Default Error Handling Middleware
 */
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Something went wrong on our side. We are fixing this issue. Sorry for inconvenience.";
    res.status(statusCode).json({ message });
});

/**
 * To connect MongoDB database and start the server
 */
mongoose.connect('mongodb://localhost:27017/codestreak')
    .then(connect => {
        console.log('Database Connected!');
        app.listen(8003);
    })
    .catch(error => {
        console.log(error);
    })
