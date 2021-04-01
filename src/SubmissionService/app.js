const express = require('express');
const bodyParser = require('body-parser');

const submissionRoutes = require('./routes/submission');

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
app.use('/submission', submissionRoutes);

/**
 * Default Error Handling Middleware
 */
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Something went wrong on our side. We are fixing this issue. Sorry for inconvenience."
    res.status(statusCode).json({ message });
});

app.listen(8007);