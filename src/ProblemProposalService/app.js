const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const proposalRoutes = require('./routes/proposal');

const app = express();

/**
 * To parse JSON
 */
app.use(bodyParser.json());

/**
 * To Allow Cross Origin Resource Sharing (CORS)
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
app.use(proposalRoutes);

/**
 * Default Error Handling Middleware
 */
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Something went wrong on our side. We are fixing this issue. Sorry for inconvenience."
    res.status(statusCode).json({ message });
});

/**
 * To Connect MongoDB database and start the Server
 */
mongoose.connect('mongodb://localhost:27017/codestreak')
    .then(connect => {
        console.log('Database Connected!')
        app.listen(8006);        
    })
    .catch(err => {
        console.log(err);
    })