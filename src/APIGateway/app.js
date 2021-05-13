const express = require('express');
const bodyParser = require('body-parser');

const apiRoutes = require('./routes/api');

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
    if(req.method === 'OPTIONS') {
        res.status(204).end();
        return;
    }
    next();
});

/**
 * To Manage Rest API Routes
 */
app.use('/api', apiRoutes);

/**
 * Default Error Handling Middleware
 */
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Something went wrong on our side. We are fixing this issue. Sorry for inconvenience."
    const errorBody = error.body;
    res.status(statusCode).json(errorBody);
});

app.listen(8000);