const express = require('express');
const bodyParser = require('body-parser');

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

app.listen(8006);