const express = require('express');
const bodyParser = require('body-parser');

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

app.use(contestRoutes);

app.listen(8003);